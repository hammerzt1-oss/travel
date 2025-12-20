/**
 * OTA链接生成测试脚本
 * 
 * 使用方法：
 * 1. 确保已配置 .env 文件（包含 OTA_PID）
 * 2. 启动后端服务：npm run dev
 * 3. 运行测试：node test-ota-links.js
 */

require('dotenv').config();
const http = require('http');

const API_BASE = process.env.API_URL || 'http://localhost:3001';
const TEST_DESTINATION_ID = 1; // 测试目的地ID（杭州）
const TEST_ORIGIN = '北京';

console.log('🧪 OTA链接生成测试\n');
console.log('='.repeat(50));

// 检查环境变量
console.log('\n📋 步骤1：检查环境变量配置');
const otaPid = process.env.OTA_PID || process.env.CTRIP_PID;
if (!otaPid || otaPid === 'YOUR_PID' || otaPid === 'YOUR_CTRIP_PID') {
  console.error('❌ 错误：未配置OTA_PID或使用默认值');
  console.log('\n请按以下步骤配置：');
  console.log('1. 在 backend/.env 文件中添加：OTA_PID=你的携程PID');
  console.log('2. 重启服务');
  console.log('3. 重新运行此测试脚本');
  process.exit(1);
} else {
  console.log(`✅ OTA_PID已配置: ${otaPid.substring(0, 4)}****`);
}

// 测试API
console.log('\n📋 步骤2：测试详情API');
const testUrl = `${API_BASE}/api/destinations/${TEST_DESTINATION_ID}?origin=${encodeURIComponent(TEST_ORIGIN)}`;

console.log(`请求URL: ${testUrl}\n`);

http.get(testUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      
      if (result.code !== 200) {
        console.error('❌ API返回错误：', result.message);
        console.error('错误详情：', result.error);
        process.exit(1);
      }

      console.log('✅ API调用成功\n');
      
      // 检查cta_links
      console.log('📋 步骤3：验证CTA链接');
      const ctaLinks = result.data?.cta_links;
      
      if (!ctaLinks) {
        console.error('❌ 错误：响应中未找到cta_links字段');
        process.exit(1);
      }

      console.log('\n生成的CTA链接：');
      console.log('-'.repeat(50));
      
      // 检查酒店链接
      if (ctaLinks.hotel) {
        console.log('\n🏨 酒店链接：');
        console.log(ctaLinks.hotel);
        const hotelHasPid = ctaLinks.hotel.includes(`pid=${otaPid}`);
        if (hotelHasPid) {
          console.log('✅ 包含正确的PID');
        } else {
          console.error('❌ 错误：链接中未包含正确的PID');
          console.error(`期望PID: ${otaPid}`);
          console.error(`实际链接: ${ctaLinks.hotel}`);
        }
      } else {
        console.error('❌ 错误：未生成酒店链接');
      }

      // 检查交通链接
      if (ctaLinks.transport) {
        console.log('\n🚄 交通链接：');
        console.log(ctaLinks.transport);
        const transportHasPid = ctaLinks.transport.includes(`pid=${otaPid}`);
        if (transportHasPid) {
          console.log('✅ 包含正确的PID');
        } else {
          console.error('❌ 错误：链接中未包含正确的PID');
        }
      } else {
        console.error('❌ 错误：未生成交通链接');
      }

      // 检查套餐链接
      if (ctaLinks.package) {
        console.log('\n🎫 套餐链接：');
        console.log(ctaLinks.package);
        const packageHasPid = ctaLinks.package.includes(`pid=${otaPid}`);
        if (packageHasPid) {
          console.log('✅ 包含正确的PID');
        } else {
          console.error('❌ 错误：链接中未包含正确的PID');
        }
      } else {
        console.error('❌ 错误：未生成套餐链接');
      }

      // 最终验证
      console.log('\n' + '='.repeat(50));
      const allLinksValid = 
        ctaLinks.hotel?.includes(`pid=${otaPid}`) &&
        ctaLinks.transport?.includes(`pid=${otaPid}`) &&
        ctaLinks.package?.includes(`pid=${otaPid}`);

      if (allLinksValid) {
        console.log('\n✅ 所有链接验证通过！');
        console.log('\n📝 下一步：');
        console.log('1. 在浏览器中打开任意链接，验证跳转');
        console.log('2. 检查URL中是否包含你的PID');
        console.log('3. 与前端联调测试');
      } else {
        console.log('\n❌ 部分链接验证失败，请检查配置');
        process.exit(1);
      }

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



