/**
 * 测试用例：验证城市名称正确性
 * 确保点击苏州卡片，生成的是"北京 → 苏州"链接
 */

const path = require('path');
const fs = require('fs');

// 模拟 generateOTALinks 函数的核心逻辑
function testCityName(destination) {
  const targetCityName = destination.city_name;
  
  if (!targetCityName) {
    throw new Error(`❌ destination ${destination.id} 缺少 city_name`);
  }
  
  const originName = encodeURIComponent('北京');
  const cityName = encodeURIComponent(targetCityName);
  
  const transportLink = `https://trains.ctrip.com/webapp/train/list?ticketType=0&dStation=${originName}&aStation=${cityName}`;
  
  return {
    targetCityName,
    transportLink,
    decoded: {
      dStation: decodeURIComponent(originName),
      aStation: decodeURIComponent(cityName)
    }
  };
}

// 读取数据
const dataPath = path.join(__dirname, '../data/destinations.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🧪 测试城市名称正确性\n');

// 测试关键城市
const testCities = [
  { id: 2, expected: '苏州' },
  { id: 1, expected: '杭州' },
  { id: 3, expected: '南京' },
  { id: 11, expected: '武汉' }
];

let allPassed = true;

testCities.forEach(({ id, expected }) => {
  const dest = data.find(d => d.id === id);
  
  if (!dest) {
    console.log(`❌ [id=${id}] 数据不存在`);
    allPassed = false;
    return;
  }
  
  try {
    const result = testCityName(dest);
    
    if (result.targetCityName === expected) {
      console.log(`✅ [id=${id}] ${expected}`);
      console.log(`   链接: ${result.transportLink}`);
      console.log(`   解码: 北京 → ${result.decoded.aStation}`);
    } else {
      console.log(`❌ [id=${id}] 期望: ${expected}, 实际: ${result.targetCityName}`);
      console.log(`   链接: ${result.transportLink}`);
      console.log(`   解码: 北京 → ${result.decoded.aStation}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ [id=${id}] ${error.message}`);
    allPassed = false;
  }
  
  console.log('');
});

if (allPassed) {
  console.log('✅ 所有测试通过！城市名称正确。\n');
} else {
  console.log('❌ 测试失败，请检查数据。\n');
  process.exit(1);
}


