/**
 * 数据完整性验证脚本
 * 检查20个城市数据的完整性、推荐文案质量、信任信号数据
 */

const fs = require('fs');
const path = require('path');

// 读取数据文件
const dataPath = path.join(__dirname, 'data', 'destinations.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('='.repeat(60));
console.log('数据完整性验证报告');
console.log('='.repeat(60));
console.log('');

// ==================== 1. 城市数量检查 ====================
console.log('【1. 城市数量检查】');
console.log(`   总数: ${data.length}`);
console.log(`   要求: 20个`);
console.log(`   状态: ${data.length === 20 ? '✅ 通过' : '❌ 不通过'}`);
console.log('');

// ==================== 2. 必需字段检查 ====================
console.log('【2. 必需字段检查】');
const requiredFields = [
  'id', 'name', 'province', 'city', 'region', 
  'latitude', 'longitude', 'description', 
  'budget_range', 'avg_cost_level', 'best_season', 
  'weekend_suitable', 'popularity_level', 'cover_image', 
  'student_tags', 'transport', 'summary', 
  'recommend_reasons', 'itinerary', 'trust_signals'
];

let missingFields = [];
let emptyFields = [];

data.forEach((city) => {
  requiredFields.forEach(field => {
    if (!(field in city)) {
      missingFields.push({ city: city.name, field });
    } else if (city[field] === null || city[field] === undefined || city[field] === '') {
      emptyFields.push({ city: city.name, field });
    }
  });
});

if (missingFields.length === 0 && emptyFields.length === 0) {
  console.log('   ✅ 所有城市必需字段完整且非空');
} else {
  if (missingFields.length > 0) {
    console.log('   ❌ 缺失字段:');
    missingFields.forEach(item => {
      console.log(`      - ${item.city}: ${item.field}`);
    });
  }
  if (emptyFields.length > 0) {
    console.log('   ⚠️  空字段:');
    emptyFields.forEach(item => {
      console.log(`      - ${item.city}: ${item.field}`);
    });
  }
}
console.log('');

// ==================== 3. 推荐文案质量检查 ====================
console.log('【3. 推荐文案质量检查】');
let contentIssues = [];

data.forEach((city) => {
  // 检查summary（一句话结论）
  if (!city.summary || city.summary.length < 10) {
    contentIssues.push({ city: city.name, type: 'summary', issue: '一句话结论过短或缺失' });
  }
  
  // 检查recommend_reasons（推荐理由）
  if (!city.recommend_reasons || !Array.isArray(city.recommend_reasons)) {
    contentIssues.push({ city: city.name, type: 'recommend_reasons', issue: '推荐理由缺失或格式错误' });
  } else if (city.recommend_reasons.length < 3) {
    contentIssues.push({ city: city.name, type: 'recommend_reasons', issue: `推荐理由不足3条（当前${city.recommend_reasons.length}条）` });
  } else {
    // 检查每条推荐理由的长度
    city.recommend_reasons.forEach((reason, index) => {
      if (!reason || reason.length < 5) {
        contentIssues.push({ city: city.name, type: 'recommend_reasons', issue: `第${index + 1}条推荐理由过短` });
      }
    });
  }
  
  // 检查itinerary（行程）
  if (!city.itinerary || !Array.isArray(city.itinerary)) {
    contentIssues.push({ city: city.name, type: 'itinerary', issue: '行程缺失或格式错误' });
  } else if (city.itinerary.length < 2) {
    contentIssues.push({ city: city.name, type: 'itinerary', issue: `行程不足2天（当前${city.itinerary.length}天）` });
  }
});

if (contentIssues.length === 0) {
  console.log('   ✅ 所有城市推荐文案质量达标');
} else {
  console.log('   ⚠️  文案问题:');
  contentIssues.forEach(item => {
    console.log(`      - ${item.city} (${item.type}): ${item.issue}`);
  });
}
console.log('');

// ==================== 4. 信任信号数据检查 ====================
console.log('【4. 信任信号数据检查】');
let trustSignalIssues = [];

data.forEach((city) => {
  if (!city.trust_signals) {
    trustSignalIssues.push({ city: city.name, issue: '信任信号数据缺失' });
    return;
  }
  
  const ts = city.trust_signals;
  
  // 检查student_count
  if (typeof ts.student_count !== 'number' || ts.student_count < 0) {
    trustSignalIssues.push({ city: city.name, issue: 'student_count无效' });
  }
  
  // 检查click_count_7d
  if (typeof ts.click_count_7d !== 'number' || ts.click_count_7d < 0) {
    trustSignalIssues.push({ city: city.name, issue: 'click_count_7d无效' });
  }
  
  // 检查is_popular
  if (typeof ts.is_popular !== 'boolean') {
    trustSignalIssues.push({ city: city.name, issue: 'is_popular类型错误' });
  }
  
  // 检查is_student_favorite（可选）
  if (ts.is_student_favorite !== undefined && typeof ts.is_student_favorite !== 'boolean') {
    trustSignalIssues.push({ city: city.name, issue: 'is_student_favorite类型错误' });
  }
});

if (trustSignalIssues.length === 0) {
  console.log('   ✅ 所有城市信任信号数据正确');
} else {
  console.log('   ❌ 信任信号问题:');
  trustSignalIssues.forEach(item => {
    console.log(`      - ${item.city}: ${item.issue}`);
  });
}
console.log('');

// ==================== 5. 数据分布统计 ====================
console.log('【5. 数据分布统计】');
const weekendCount = data.filter(c => c.weekend_suitable === true).length;
const popularCount = data.filter(c => c.trust_signals?.is_popular === true).length;
const favoriteCount = data.filter(c => c.trust_signals?.is_student_favorite === true).length;

console.log(`   周末适合: ${weekendCount}个城市`);
console.log(`   热门推荐: ${popularCount}个城市`);
console.log(`   学生常选: ${favoriteCount}个城市`);

// 预算区间统计
const budgetRanges = {};
data.forEach(city => {
  const range = city.budget_range;
  budgetRanges[range] = (budgetRanges[range] || 0) + 1;
});
console.log(`   预算区间分布:`, budgetRanges);
console.log('');

// ==================== 6. 城市列表 ====================
console.log('【6. 城市列表】');
const cityNames = data.map(c => c.name).join('、');
console.log(`   ${cityNames}`);
console.log('');

// ==================== 7. 验证结果总结 ====================
console.log('='.repeat(60));
console.log('验证结果总结');
console.log('='.repeat(60));

const allIssues = missingFields.length + emptyFields.length + contentIssues.length + trustSignalIssues.length;

if (allIssues === 0 && data.length === 20) {
  console.log('✅ 数据完整性验证通过！');
  console.log('✅ 所有20个城市数据完整');
  console.log('✅ 推荐文案质量达标');
  console.log('✅ 信任信号数据正确');
  console.log('');
  console.log('📊 数据已就绪，可以开始对接！');
} else {
  console.log('⚠️  发现以下问题需要修复:');
  if (data.length !== 20) {
    console.log(`   - 城市数量不正确（当前${data.length}个，需要20个）`);
  }
  if (missingFields.length > 0) {
    console.log(`   - ${missingFields.length}个缺失字段`);
  }
  if (emptyFields.length > 0) {
    console.log(`   - ${emptyFields.length}个空字段`);
  }
  if (contentIssues.length > 0) {
    console.log(`   - ${contentIssues.length}个文案问题`);
  }
  if (trustSignalIssues.length > 0) {
    console.log(`   - ${trustSignalIssues.length}个信任信号问题`);
  }
}

console.log('');

