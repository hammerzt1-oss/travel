/**
 * 信任信号更新测试脚本
 * 
 * 使用方法：
 * 1. 确保后端服务已启动：npm run dev
 * 2. 运行测试：node test-trust-signals.js
 */

const http = require('http');

const API_BASE = process.env.API_URL || 'http://localhost:3001';

console.log('🧪 信任信号更新测试\n');
console.log('='.repeat(50));

// 测试1：检查当前数据
console.log('\n📋 步骤1：检查当前信任信号数据');
const checkUrl = `${API_BASE}/api/recommendations?type=week`;

http.get(checkUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      
      if (result.code !== 200) {
        console.error('❌ API返回错误：', result.message);
        process.exit(1);
      }

      console.log('✅ API调用成功');
      
      // 显示前3个目的地的信任信号
      const recommendations = result.data?.list || [];
      if (recommendations.length > 0) {
        console.log('\n当前信任信号数据（前3个）：');
        recommendations.slice(0, 3).forEach(rec => {
          console.log(`\n📍 ${rec.name}:`);
          console.log(`  - 点击量: ${rec.trust_signals.click_count_7d}`);
          console.log(`  - 已选人数: ${rec.trust_signals.student_count}`);
          console.log(`  - 是否热门: ${rec.trust_signals.is_popular}`);
        });
      }

      // 测试2：手动触发更新
      console.log('\n' + '='.repeat(50));
      console.log('\n📋 步骤2：手动触发信任信号更新');
      
      const updateUrl = `${API_BASE}/api/admin/update-trust-signals`;
      const updateOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const updateReq = http.request(updateUrl, updateOptions, (updateRes) => {
        let updateData = '';

        updateRes.on('data', (chunk) => {
          updateData += chunk;
        });

        updateRes.on('end', () => {
          try {
            const updateResult = JSON.parse(updateData);
            
            if (updateResult.code !== 200) {
              console.error('❌ 更新失败：', updateResult.message);
              process.exit(1);
            }

            console.log('✅ 信任信号更新成功');
            console.log(`   - 更新数量: ${updateResult.data.updated}`);
            console.log(`   - 更新时间: ${updateResult.data.timestamp}`);

            // 测试3：验证更新后的数据
            console.log('\n' + '='.repeat(50));
            console.log('\n📋 步骤3：验证更新后的数据');
            console.log('等待2秒后检查更新结果...\n');

            setTimeout(() => {
              http.get(checkUrl, (verifyRes) => {
                let verifyData = '';

                verifyRes.on('data', (chunk) => {
                  verifyData += chunk;
                });

                verifyRes.on('end', () => {
                  try {
                    const verifyResult = JSON.parse(verifyData);
                    const verifyRecommendations = verifyResult.data?.list || [];
                    
                    if (verifyRecommendations.length > 0) {
                      console.log('更新后的信任信号数据（前3个）：');
                      verifyRecommendations.slice(0, 3).forEach(rec => {
                        console.log(`\n📍 ${rec.name}:`);
                        console.log(`  - 点击量: ${rec.trust_signals.click_count_7d}`);
                        console.log(`  - 已选人数: ${rec.trust_signals.student_count}`);
                        console.log(`  - 是否热门: ${rec.trust_signals.is_popular}`);
                      });
                    }

                    // 对比数据
                    console.log('\n' + '='.repeat(50));
                    console.log('\n📊 数据对比：');
                    
                    recommendations.slice(0, 3).forEach((oldRec, index) => {
                      const newRec = verifyRecommendations[index];
                      if (newRec && newRec.name === oldRec.name) {
                        const clickDiff = newRec.trust_signals.click_count_7d - oldRec.trust_signals.click_count_7d;
                        const studentDiff = newRec.trust_signals.student_count - oldRec.trust_signals.student_count;
                        
                        console.log(`\n📍 ${oldRec.name}:`);
                        console.log(`  - 点击量: ${oldRec.trust_signals.click_count_7d} → ${newRec.trust_signals.click_count_7d} (${clickDiff > 0 ? '+' : ''}${clickDiff})`);
                        console.log(`  - 已选人数: ${oldRec.trust_signals.student_count} → ${newRec.trust_signals.student_count} (${studentDiff > 0 ? '+' : ''}${studentDiff})`);
                        
                        if (clickDiff > 0 || studentDiff > 0) {
                          console.log('  ✅ 数据已更新');
                        } else {
                          console.log('  ⚠️  数据未变化（可能已是最新）');
                        }
                      }
                    });

                    console.log('\n' + '='.repeat(50));
                    console.log('\n✅ 测试完成！');
                    console.log('\n📝 下一步：');
                    console.log('1. 检查 data/destinations.json 文件确认数据已更新');
                    console.log('2. 等待5分钟（开发环境）查看定时任务是否自动执行');
                    console.log('3. 查看服务日志确认定时任务正常运行');

                  } catch (error) {
                    console.error('❌ 验证数据解析失败：', error.message);
                  }
                });
              }).on('error', (error) => {
                console.error('❌ 验证请求失败：', error.message);
              });
            }, 2000);

          } catch (error) {
            console.error('❌ 更新结果解析失败：', error.message);
            console.error('原始响应：', updateData);
          }
        });
      });

      updateReq.on('error', (error) => {
        console.error('❌ 更新请求失败：', error.message);
        console.error('\n请确保：');
        console.error('1. 后端服务已启动（npm run dev）');
        console.error('2. 服务运行在 http://localhost:3001');
      });

      updateReq.end();

    } catch (error) {
      console.error('❌ 解析响应失败：', error.message);
      console.error('原始响应：', data);
      process.exit(1);
    }
  });

}).on('error', (error) => {
  console.error('❌ 请求失败：', error.message);
  console.error('\n请确保：');
  console.error('1. 后端服务已启动（npm run dev）');
  console.error('2. 服务运行在 http://localhost:3001');
  process.exit(1);
});


