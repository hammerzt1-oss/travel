/**
 * 目的地数据校验脚本
 * 用于检查 destinations.json 数据完整性
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/destinations.json');

console.log('🔍 开始校验 destinations.json 数据...\n');

try {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  const errors = [];
  const warnings = [];
  
  data.forEach((d, index) => {
    // 1. 检查必需字段
    if (!d.id) {
      errors.push(`❌ 第 ${index + 1} 条数据缺少 id`);
    }
    
    if (!d.city_name) {
      errors.push(`❌ [id=${d.id}] 缺少 city_name 字段（这是生成链接的关键字段）`);
    }
    
    // 2. 检查数据一致性
    if (d.name && d.city_name && d.name !== d.city_name) {
      warnings.push(`⚠️ [id=${d.id}] name="${d.name}" 与 city_name="${d.city_name}" 不一致`);
    }
    
    if (d.city && d.city_name && d.city !== d.city_name) {
      warnings.push(`⚠️ [id=${d.id}] city="${d.city}" 与 city_name="${d.city_name}" 不一致`);
    }
    
    // 3. 检查城市名称是否在允许列表中
    const validCities = [
      '北京', '上海', '广州', '深圳', '杭州', '苏州', '南京', 
      '天津', '武汉', '长沙', '成都', '重庆', '西安', '厦门', 
      '青岛', '三亚', '丽江', '大连', '昆明', '桂林'
    ];
    
    if (d.city_name && !validCities.includes(d.city_name)) {
      warnings.push(`⚠️ [id=${d.id}] city_name="${d.city_name}" 不在已知城市列表中`);
    }
  });
  
  // 输出结果
  console.log(`📊 数据总数: ${data.length}\n`);
  
  if (errors.length > 0) {
    console.log('❌ 发现错误:');
    errors.forEach(err => console.log(`  ${err}`));
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️ 发现警告:');
    warnings.forEach(warn => console.log(`  ${warn}`));
    console.log('');
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ 数据校验通过！所有数据都包含 city_name 字段。\n');
  } else if (errors.length === 0) {
    console.log('✅ 数据校验通过（有警告但不影响运行）\n');
  } else {
    console.log('❌ 数据校验失败，请修复上述错误后再运行。\n');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ 读取数据文件失败:', error.message);
  process.exit(1);
}

