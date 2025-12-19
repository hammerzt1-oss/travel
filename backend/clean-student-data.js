const fs = require('fs');
const path = require('path');

// 清理 destinations.json
const destinationsPath = path.join(__dirname, '../data/destinations.json');
const destinations = JSON.parse(fs.readFileSync(destinationsPath, 'utf8'));

destinations.forEach(d => {
  // 删除 student_tags 字段
  delete d.student_tags;
  
  // 清理 trust_signals 中的学生相关字段
  if (d.trust_signals) {
    delete d.trust_signals.student_count;
    delete d.trust_signals.is_student_favorite;
  }
  
  // 清理 recommend_reasons 中的学生相关文案
  if (d.recommend_reasons) {
    d.recommend_reasons = d.recommend_reasons.map(reason => 
      reason.replace(/学生友好/g, '安全可靠')
           .replace(/学生票多/g, '门票丰富')
           .replace(/学生/g, '')
    );
  }
});

fs.writeFileSync(destinationsPath, JSON.stringify(destinations, null, 2), 'utf8');
console.log('✅ 已清理 destinations.json 中的所有学生相关字段');

// 清理 attractions.json
const attractionsPath = path.join(__dirname, '../data/attractions.json');
if (fs.existsSync(attractionsPath)) {
  const attractions = JSON.parse(fs.readFileSync(attractionsPath, 'utf8'));
  
  attractions.forEach(a => {
    // 删除学生相关字段
    delete a.student_friendly;
    delete a.student_ticket;
    delete a.is_student_favorite;
    
    // 清理 trust_signals
    if (a.trust_signals) {
      delete a.trust_signals.student_count;
    }
    
    // 清理文案
    if (a.price_hint) {
      a.price_hint = a.price_hint.replace(/学生票|学生/g, '官方').replace(/学生优惠/g, '官方优惠');
    }
    if (a.primary_reason) {
      a.primary_reason = a.primary_reason.replace(/学生票|学生/g, '官方').replace(/学生优惠/g, '官方优惠').replace(/学生必去/g, '热门景点');
    }
  });
  
  fs.writeFileSync(attractionsPath, JSON.stringify(attractions, null, 2), 'utf8');
  console.log('✅ 已清理 attractions.json 中的所有学生相关字段');
}

console.log('🎉 数据清理完成！');

