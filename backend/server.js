require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// 简单的内存限流（MVP阶段，后续可升级为Redis）
const rateLimitMap = new Map();

// 限流中间件（简化版）
const rateLimit = (maxRequests = 100, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const limit = rateLimitMap.get(ip);
    
    // 重置窗口
    if (now > limit.resetTime) {
      limit.count = 1;
      limit.resetTime = now + windowMs;
      return next();
    }
    
    // 检查是否超过限制
    if (limit.count >= maxRequests) {
      return res.status(429).json({
        code: 429,
        message: '请求过于频繁，请稍后再试',
        retry_after: Math.ceil((limit.resetTime - now) / 1000)
      });
    }
    
    limit.count++;
    next();
  };
};

// 应用限流（不同接口不同限制）
app.use('/api/recommendations', rateLimit(100, 60000)); // 100次/分钟
app.use('/api/destinations', rateLimit(200, 60000)); // 200次/分钟
app.use('/api/cities', rateLimit(50, 60000)); // 50次/分钟

// 读取目的地数据
const getDestinations = () => {
  const dataPath = path.join(__dirname, '../data/destinations.json');
  const data = fs.readFileSync(dataPath, 'utf8');
  const destinations = JSON.parse(data);
  
  // 🔥 关键修复：禁止 fallback，显式校验 city_name
  // 如果数据源缺少 city_name，直接报错，避免跳错城市
  return destinations.map((d) => {
    // 🔥 严格校验：city_name 必须存在
    if (!d.city_name) {
      throw new Error(`❌ destination ${d.id} 缺少 city_name 字段。请检查数据源 destinations.json`);
    }
    
    // 🔥 数据一致性检查：如果 name 和 city_name 不一致，记录警告
    if (d.name && d.name !== d.city_name) {
      console.warn(`⚠️ 数据不一致 [id=${d.id}]: name="${d.name}", city_name="${d.city_name}"`);
    }
    
    // 🔥 如果 city 和 city_name 不一致，记录警告
    if (d.city && d.city !== d.city_name) {
      console.warn(`⚠️ 数据不一致 [id=${d.id}]: city="${d.city}", city_name="${d.city_name}"`);
    }
    
    return d;
  });
};

// 读取景点数据
const getAttractions = () => {
  const dataPath = path.join(__dirname, '../data/attractions.json');
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
};

// 推荐列表API（核心）
app.get('/api/recommendations', (req, res) => {
  try {
    const { origin, type = 'week' } = req.query;
    // 调试日志：检查接收到的 origin 参数
    console.log('[推荐列表API] 接收到的参数 - origin:', origin, 'type:', type);
    const destinations = getDestinations();
    
    // 根据推荐类型筛选
    let filtered = destinations;
    
    if (type === 'week' || type === 'weekend') {
      // 本周推荐：适合周末的
      filtered = destinations.filter(d => d.weekend_suitable);
    } else if (type === 'month') {
      // 本月推荐：适合本月出行的（可以是周末或假期）
      filtered = destinations;
    } else if (type === 'popular') {
      // 热门推荐：按点击量排序
      filtered = destinations
        .filter(d => d.trust_signals.is_popular)
        .sort((a, b) => b.trust_signals.click_count_7d - a.trust_signals.click_count_7d);
    } else if (type === 'student_favorite' || type === 'popular') {
      // 热门推荐：按点击量排序
      filtered = destinations
        .filter(d => d.trust_signals.is_popular)
        .sort((a, b) => (b.trust_signals.click_count_7d || 0) - (a.trust_signals.click_count_7d || 0));
    }
    
    // 格式化返回数据
    const recommendations = filtered.slice(0, 10).map(dest => {
      // 计算距离（如果有出发地）
      let distance = null;
      if (origin) {
        distance = calculateDistanceFromCity(origin, dest);
      }
      
      // 生成推荐标签
      let tag = '推荐';
      if (type === 'week' || type === 'weekend') {
        tag = '周末推荐';
      } else if (type === 'month') {
        tag = '本月推荐';
      } else if (type === 'popular' || type === 'student_favorite') {
        tag = '热门推荐';
      }
      
      // 生成OTA跳转链接（后端统一生成，所有参数在后端）
      // ⚠️ 重要：使用传入的 origin 参数，如果没有则默认使用"北京"
      const defaultOrigin = origin || '北京';
      // 调试日志：确认使用的出发地
      if (dest.id === 2) { // 只对苏州记录日志，避免日志过多
        console.log('[推荐列表API] 生成链接 - 目的地:', dest.name, '出发地:', defaultOrigin, '原始origin参数:', origin);
      }
      const cta_links = generateOTALinks(dest, defaultOrigin);
      
      return {
      id: dest.id,
      name: dest.name,
        tag: tag,
      budget_range: dest.budget_range,
        primary_reason: `预算${dest.budget_range}内可成行`, // 直接用于CTA上方文案
        distance: distance,
      transport: dest.transport.high_speed_rail 
        ? `高铁直达 · ${dest.transport.rail_time}` 
          : dest.transport.airport 
          ? '飞机直达'
        : '交通便利',
      weather: '未来两天晴', // 简化，后续对接天气API
      suitable_days: dest.weekend_suitable ? '1-2天' : '3-4天',
      trust_signals: {
        view_count_7d: dest.trust_signals.click_count_7d || 0,
        click_count_7d: dest.trust_signals.click_count_7d || 0,
        is_popular: dest.trust_signals.is_popular || false
      },
      cover_image: dest.cover_image,
        cta_text: '寻找酒店', // 成人票，官方直订
        cta_links: cta_links  // 添加OTA链接
      };
    });
    
    res.json({
      code: 200,
      message: 'success',
      data: {
        list: recommendations,
        total: recommendations.length
      }
    });
  } catch (error) {
    console.error('推荐列表API错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});

// 目的地详情API
app.get('/api/destinations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { origin } = req.query;
    
    // ⚠️ 重要：详情页请求必须包含 origin 参数，否则无法生成正确的链接
    // 🔥 这是"钱"的参数，不能使用默认值，必须显式传递
    if (!origin) {
      console.warn('[详情页API] ⚠️ 缺少 origin 参数，请求ID:', id);
      return res.status(400).json({
        code: 400,
        message: '缺少 origin 参数，请从首页选择出发地后进入详情页',
        error: '详情页请求必须包含出发地参数'
      });
    }
    const destinations = getDestinations();
    const destination = destinations.find(d => d.id === parseInt(id));
    
    if (!destination) {
      return res.status(404).json({
        code: 404,
        message: '目的地不存在'
      });
    }
    
    // 生成OTA跳转链接（后端统一生成，所有参数在后端）
    // ⚠️ 重要：如果没有传入origin，默认使用"北京"作为出发地
    const defaultOrigin = origin || '北京';
    const cta_links = generateOTALinks(destination, defaultOrigin);
    
    res.json({
      code: 200,
      message: 'success',
      data: {
        id: destination.id,
        name: destination.name,
        summary: destination.summary,
        recommend_reasons: destination.recommend_reasons.map(reason => 
          reason.replace(/学生友好/g, '安全可靠')
               .replace(/学生票多/g, '门票丰富')
               .replace(/学生/g, '')
        ),
        itinerary: destination.itinerary,
        budget_range: destination.budget_range,
        trust_signals: destination.trust_signals,
        cta_links: cta_links,
        weather: {
          current: '晴',
          forecast: ['晴', '多云', '晴']
        }
      }
    });
  } catch (error) {
    console.error('目的地详情API错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});

// 城市坐标映射（常用城市）
const cityCoordinates = {
  '北京': { lat: 39.9042, lng: 116.4074 },
  '上海': { lat: 31.2304, lng: 121.4737 },
  '广州': { lat: 23.1291, lng: 113.2644 },
  '深圳': { lat: 22.5431, lng: 114.0579 },
  '杭州': { lat: 30.2741, lng: 120.1551 },
  '南京': { lat: 32.0603, lng: 118.7969 },
  '苏州': { lat: 31.2989, lng: 120.5853 },
  '成都': { lat: 30.6624, lng: 104.0633 },
  '重庆': { lat: 29.5630, lng: 106.5516 },
  '西安': { lat: 34.3416, lng: 108.9398 },
  '武汉': { lat: 30.5928, lng: 114.3055 },
  '长沙': { lat: 28.2278, lng: 112.9388 },
  '厦门': { lat: 24.4798, lng: 118.0819 },
  '青岛': { lat: 36.0671, lng: 120.3826 },
  '天津': { lat: 39.3434, lng: 117.3616 },
  '大连': { lat: 38.9140, lng: 121.6147 },
  '昆明': { lat: 25.0389, lng: 102.7183 },
  '桂林': { lat: 25.2342, lng: 110.1992 },
  '丽江': { lat: 26.8550, lng: 100.2277 },
  '三亚': { lat: 18.2528, lng: 109.5119 }
};

// 使用Haversine公式计算两点间距离（单位：公里）
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// 从城市名计算距离
function calculateDistanceFromCity(originCity, destination) {
  const originCoords = cityCoordinates[originCity];
  if (!originCoords) {
    // 如果找不到出发地坐标，返回null
    return null;
  }
  
  return calculateDistance(
    originCoords.lat,
    originCoords.lng,
    destination.latitude,
    destination.longitude
  );
}

// 城市信息统一数据结构
// ⚠️ 重要：酒店city_id和度假产品vacation_destination_id不一样！
// 统一管理所有城市信息，避免数据不一致
const cityInfoMap = {
  '北京': {
    name: '北京',
    pinyin: 'beijing',
    hotel_city_id: '1',           // 酒店城市代码
    vacation_destination_id: '1',  // 度假产品目的地ID
    verified: true
  },
  '上海': {
    name: '上海',
    pinyin: 'shanghai',
    hotel_city_id: '2',
    vacation_destination_id: '2',
    verified: true
  },
  '天津': {
    name: '天津',
    pinyin: 'tianjin',
    hotel_city_id: '3',
    vacation_destination_id: '3',
    verified: true
  },
  '重庆': {
    name: '重庆',
    pinyin: 'chongqing',
    hotel_city_id: '4',
    vacation_destination_id: '4',
    verified: true
  },
  '青岛': {
    name: '青岛',
    pinyin: 'qingdao',
    hotel_city_id: '7',
    vacation_destination_id: '5',  // 注意：和酒店ID不一样
    verified: true
  },
  '西安': {
    name: '西安',
    pinyin: 'xian',
    hotel_city_id: '10',
    vacation_destination_id: null,  // 未提供
    verified: false
  },
  '南京': {
    name: '南京',
    pinyin: 'nanjing',
    hotel_city_id: '12',
    vacation_destination_id: '9',  // 注意：和酒店ID不一样
    verified: true
  },
  '苏州': {
    name: '苏州',
    pinyin: 'suzhou',
    hotel_city_id: '14',
    vacation_destination_id: '11', // 注意：和酒店ID不一样
    verified: true
  },
  '杭州': {
    name: '杭州',
    pinyin: 'hangzhou',
    hotel_city_id: '17',
    vacation_destination_id: '14', // 注意：和酒店ID不一样
    verified: true
  },
  '厦门': {
    name: '厦门',
    pinyin: 'xiamen',
    hotel_city_id: '25',
    vacation_destination_id: '21', // 注意：和酒店ID不一样
    verified: true
  },
  '深圳': {
    name: '深圳',
    pinyin: 'shenzhen',
    hotel_city_id: '30',
    vacation_destination_id: '26', // 注意：和酒店ID不一样
    verified: true
  },
  '广州': {
    name: '广州',
    pinyin: 'guangzhou',
    hotel_city_id: '32',
    vacation_destination_id: '32',
    verified: true
  },
  '丽江': {
    name: '丽江',
    pinyin: 'lijiang',
    hotel_city_id: '37',
    vacation_destination_id: '32', // 注意：和广州一样，需要验证
    verified: false
  },
  '三亚': {
    name: '三亚',
    pinyin: 'sanya',
    hotel_city_id: '43',
    vacation_destination_id: '61', // 注意：和酒店ID不一样
    verified: true
  },
  '成都': {
    name: '成都',
    pinyin: 'chengdu',
    hotel_city_id: '28',
    vacation_destination_id: '104', // 注意：和酒店ID不一样
    verified: true
  },
  '武汉': {
    name: '武汉',
    pinyin: 'wuhan',
    hotel_city_id: '477',
    vacation_destination_id: '145', // 注意：和酒店ID不一样
    verified: true
  },
  '长沙': {
    name: '长沙',
    pinyin: 'changsha',
    hotel_city_id: '148',
    vacation_destination_id: '148',
    verified: true
  },
  '大连': {
    name: '大连',
    pinyin: 'dalian',
    hotel_city_id: '19',
    vacation_destination_id: null,  // 未提供
    verified: false
  },
  '昆明': {
    name: '昆明',
    pinyin: 'kunming',
    hotel_city_id: '22',
    vacation_destination_id: null,  // 未提供
    verified: false
  },
  '桂林': {
    name: '桂林',
    pinyin: 'guilin',
    hotel_city_id: '33',
    vacation_destination_id: null,  // 未提供
    verified: false
  }
};

// 兼容旧代码：城市代码映射（酒店用）
const cityCodeMap = {};
// 兼容旧代码：城市拼音映射
const cityNameMap = {};
// 兼容旧代码：度假产品目的地ID映射
const vacationDestinationIdMap = {};

// 从统一数据结构生成兼容映射（保持向后兼容）
// 构建兼容旧代码的映射表
Object.keys(cityInfoMap).forEach(cityKey => {
  const info = cityInfoMap[cityKey];
  cityCodeMap[cityKey] = info.hotel_city_id;
  cityNameMap[cityKey] = info.pinyin;
  if (info.vacation_destination_id) {
    vacationDestinationIdMap[cityKey] = info.vacation_destination_id;
  }
});

// OTA链接生成函数（统一管理）
function generateOTALinks(destination, origin = '北京') {
  // 从环境变量读取PID和联盟参数，避免泄露
  const OTA_PID = process.env.OTA_PID || process.env.CTRIP_PID || '284116645';
  const ALLIANCE_ID = process.env.ALLIANCE_ID || '7463534';
  const OUID = process.env.OUID || 'kfptpcljzh';
  const utm_source = 'travel_recommend';
  
  // ⚠️ 重要：确保origin有值，默认为"北京"
  // 🔥 关键：使用传入的 origin 参数，不要固定为"北京"
  const actualOrigin = origin || '北京';
  
  // 调试日志：确认接收到的参数
  console.log('[OTA链接生成] 接收到的参数 - origin:', origin, 'actualOrigin:', actualOrigin);
  
  // ⚠️ 关键修复：只使用 city_name，禁止 fallback
  // 如果 city_name 不存在，直接报错，避免跳错城市
  if (!destination.city_name) {
    throw new Error(`❌ destination ${destination.id || 'unknown'} 缺少 city_name，无法生成链接。请检查数据源。`);
  }
  
  const targetCityName = destination.city_name;
  
  // 调试日志：确认目标城市和出发地
  console.log('[OTA链接生成] 目标城市:', targetCityName, '出发地:', actualOrigin);
  
  // 从统一数据结构获取城市信息
  const cityInfo = cityInfoMap[targetCityName];
  const originInfo = cityInfoMap[actualOrigin];
  
  // 酒店城市代码（city_id）
  const cityCode = cityInfo ? cityInfo.hotel_city_id : (cityCodeMap[targetCityName] || targetCityName);
  const originCode = originInfo ? originInfo.hotel_city_id : (cityCodeMap[actualOrigin] || '1'); // 默认北京代码1
  
  // 城市名称（URL编码）
  const cityName = encodeURIComponent(targetCityName);
  const originName = encodeURIComponent(actualOrigin);
  
  // 调试日志：确认编码后的城市名称
  console.log('[OTA链接生成] 编码后 - 出发地:', originName, '目的地:', cityName);
  console.log('[OTA链接生成] 最终链接 - aStation参数:', cityName);
  
  // 城市拼音
  const cityPinyin = cityInfo ? cityInfo.pinyin : (cityNameMap[targetCityName] || targetCityName.toLowerCase());
  
  // 度假产品目的地ID（注意：和酒店city_id不一样！）
  const vacationDestinationId = cityInfo && cityInfo.vacation_destination_id 
    ? cityInfo.vacation_destination_id 
    : (vacationDestinationIdMap[targetCityName] || cityCode);
  
  // 获取度假产品路径（格式：d-{城市拼音}-{vacation_destination_id}）
  const vacationPath = `d-${cityPinyin}-${vacationDestinationId}`;
  
  // 携程联盟链接格式
  // ⚠️ 重要：酒店链接必须使用城市代码（数字），不能使用拼音
  // 套餐链接也需要使用城市代码
  // 如果所有城市都显示同一个城市，说明城市代码映射不正确
  
  // 调试日志：输出最终生成的链接参数
  console.log('[OTA链接生成] 火车票链接 - dStation:', originName, 'aStation:', cityName);
  console.log('[OTA链接生成] 火车票链接 - 出发地:', actualOrigin, '目的地:', targetCityName);
  
  const links = {
    // 酒店链接：使用正确的城市代码（已从ChatGPT获取，2025-12-18）
    // ⚠️ 注意：参数顺序可能影响链接正确性，city参数应该在最前面
    // 格式：city=城市代码&AllianceID&sid&ouid
    hotel: `https://hotels.ctrip.com/hotels/list?city=${cityCode}&AllianceID=${ALLIANCE_ID}&sid=${OTA_PID}&ouid=${OUID}`,
    // 火车票链接：使用携程标准格式，显式携带 ticketType=0
    // ⚠️ 重要：dStation 使用用户选择的出发地（actualOrigin），不是固定的"北京"
    // dStation/aStation 使用 URL 编码的中文城市名
    transport: `https://trains.ctrip.com/webapp/train/list?ticketType=0&dStation=${originName}&aStation=${cityName}&AllianceID=${ALLIANCE_ID}&sid=${OTA_PID}&ouid=${OUID}`,
    // 度假产品/套餐链接：使用正确的格式
    // ⚠️ 重要：根据用户提供的正确链接，格式应该是 sc1.html?sv=城市&st=城市&from=do&startcity=1
    // ⚠️ 注意：sv和st都是城市名称（URL编码），from=do表示出发地类型
    // ⚠️ 注意：联盟参数应该放在最后，或者根据携程要求调整位置
    // 格式：/list/whole/sc1.html?sv=城市&st=城市&from=do&startcity=1&AllianceID&sid&ouid
    package: `https://vacations.ctrip.com/list/whole/sc1.html?sv=${cityName}&st=${cityName}&from=do&startcity=${originCode}&AllianceID=${ALLIANCE_ID}&sid=${OTA_PID}&ouid=${OUID}`
  };
  
  // 如果配置了飞猪PID，可以添加飞猪链接
  if (process.env.FLIGGY_PID) {
    links.fliggy_hotel = `https://www.fliggy.com/hotel/?city=${cityName}&pid=${process.env.FLIGGY_PID}`;
  }
  
  return links;
}

// 景点OTA链接生成函数
function generateAttractionOtaUrl(attractionId) {
  const ALLIANCE_ID = process.env.ALLIANCE_ID || '7463534';
  const OTA_PID = process.env.OTA_PID || process.env.CTRIP_PID || '284116645';
  const OUID = process.env.OUID || 'kfptpcljzh';
  
  // 携程景点门票链接格式：https://piao.ctrip.com/ticket/dest/t{attraction_id}.html
  // ⚠️ 重要：学生票由携程页面自动展示，不需要在URL中指定
  return `https://piao.ctrip.com/ticket/dest/t${attractionId}.html?AllianceID=${ALLIANCE_ID}&sid=${OTA_PID}&ouid=${OUID}`;
}

// 获取城市列表API（用于出发地选择）
app.get('/api/cities', (req, res) => {
  try {
    const cities = Object.keys(cityCoordinates).map((name, index) => ({
      id: index + 1,
      name: name,
      province: getProvinceByCity(name)
    }));
    
    res.json({
      code: 200,
      message: 'success',
      data: cities
    });
  } catch (error) {
    console.error('城市列表API错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});

// 辅助函数：根据城市名获取省份（简化版）
function getProvinceByCity(cityName) {
  const cityProvinceMap = {
    '北京': '北京',
    '上海': '上海',
    '广州': '广东',
    '深圳': '广东',
    '杭州': '浙江',
    '南京': '江苏',
    '苏州': '江苏',
    '成都': '四川',
    '重庆': '重庆',
    '西安': '陕西',
    '武汉': '湖北',
    '长沙': '湖南',
    '厦门': '福建',
    '青岛': '山东',
    '天津': '天津',
    '大连': '辽宁',
    '昆明': '云南',
    '桂林': '广西',
    '丽江': '云南',
    '三亚': '海南'
  };
  return cityProvinceMap[cityName] || '未知';
}

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'travel-backend',
    version: '1.0.0'
  });
});

// 景点列表API - 必须在404处理之前
app.get('/api/attractions', (req, res) => {
  try {
    const { city_name, city, type = 'popular' } = req.query;
    const attractions = getAttractions();
    
    // 根据城市筛选
    let filtered = attractions;
    if (city_name) {
      filtered = attractions.filter(a => a.city_name === city_name);
    } else if (city) {
      filtered = attractions.filter(a => a.city === city || a.city_name === city);
    }
    
    // 热门筛选：只返回热门景点（成人票）
    // ⚠️ 重要：本产品仅展示成人可购、可返佣的产品
    if (type === 'popular' || type === 'student') {
      filtered = filtered.filter(a => a.trust_signals?.is_popular || (a.trust_signals?.click_count_7d || 0) > 500);
    }
    
    // 按浏览量排序（成人票）
    filtered.sort((a, b) => {
      const aCount = a.trust_signals?.click_count_7d || 0;
      const bCount = b.trust_signals?.click_count_7d || 0;
      return bCount - aCount;
    });
    
    // 每个城市最多返回5个
    const cityGroups = {};
    filtered.forEach(attraction => {
      const cityKey = attraction.city_name || attraction.city;
      if (!cityGroups[cityKey]) {
        cityGroups[cityKey] = [];
      }
      if (cityGroups[cityKey].length < 5) {
        cityGroups[cityKey].push(attraction);
      }
    });
    
    // 扁平化结果
    const result = Object.values(cityGroups).flat();
    
    // 格式化返回数据
    const formatted = result.map(attraction => ({
      id: attraction.id,
      city: attraction.city_name || attraction.city,
      name: attraction.name,
      category: attraction.category,
      ticket_available: true, // 所有景点都支持成人票
      price_hint: attraction.price_hint.replace(/学生票|学生/g, '官方').replace(/学生优惠/g, '官方优惠').replace(/免费/g, '官方价格'),
      primary_reason: attraction.primary_reason.replace(/学生票|学生/g, '官方').replace(/学生优惠/g, '官方优惠').replace(/学生必去/g, '热门景点'),
      suitable_days: attraction.suitable_days,
      transport: attraction.transport,
      photo_friendly: attraction.photo_friendly,
      trust_signals: {
        view_count_7d: attraction.trust_signals?.click_count_7d || 0,
        click_count_7d: attraction.trust_signals?.click_count_7d || 0
      },
      cta_text: '寻找酒店', // 成人票，官方直订
      cta_link: generateAttractionOtaUrl(attraction.id)
    }));
    
    res.json({
      code: 200,
      message: 'success',
      data: {
        list: formatted,
        total: formatted.length
      }
    });
  } catch (error) {
    console.error('景点列表API错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});

// 手动触发更新接口（用于测试和管理）
app.post('/api/admin/update-trust-signals', (req, res) => {
  try {
    const result = updateTrustSignals();
    if (result.success) {
      res.json({
        code: 200,
        message: '信任信号更新成功',
        data: {
          updated: result.updated,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(500).json({
        code: 500,
        message: '信任信号更新失败',
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    path: req.path
  });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    error: err.message
  });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`🚀 后端服务运行在 http://localhost:${PORT}`);
  console.log(`📡 API地址: http://localhost:${PORT}/api/recommendations`);
  console.log(`💚 健康检查: http://localhost:${PORT}/health`);
  console.log(`📋 城市列表: http://localhost:${PORT}/api/cities`);
  console.log(`🎫 景点列表: http://localhost:${PORT}/api/attractions`);
  console.log(`🔧 信任信号更新: POST http://localhost:${PORT}/api/admin/update-trust-signals`);
  
  // 检查环境变量
  if (!process.env.OTA_PID && !process.env.CTRIP_PID) {
    console.warn('⚠️  警告: 未配置OTA_PID，OTA链接将使用默认值');
  }
  
  // 显示定时任务状态
  if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
    console.log('📅 定时任务: 每天凌晨2点更新信任信号（生产环境）');
  } else {
    console.log('📅 定时任务: 每5分钟更新信任信号（开发环境）');
  }
});

