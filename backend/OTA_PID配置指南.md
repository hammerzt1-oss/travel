# OTA PID 配置指南（必须完成）

## 🎯 任务目标

配置携程联盟PID，使后端能够生成有效的返佣链接。

## ⏱️ 预计时间

- **如果已有账号**：10-15分钟
- **需要注册账号**：30-40分钟

---

## 📋 步骤1：注册携程联盟账号

### 1.1 访问携程联盟官网

打开浏览器，访问：**https://u.ctrip.com/**

### 1.2 注册账号

1. 点击"注册"或"立即加入"
2. 填写注册信息：
   - 手机号/邮箱
   - 设置密码
   - 验证码
3. 完成注册并登录

### 1.3 获取PID（推广ID）

登录后，在联盟后台找到：
- **PID** 或 **推广ID** 或 **Partner ID**
- 通常格式为：数字或字母数字组合（如：`123456` 或 `ABC123`）

**常见位置：**
- 个人中心 → 账户信息
- 推广工具 → 链接生成
- 我的账户 → PID设置

**如果找不到PID：**
- 查看帮助文档
- 联系客服：400-XXX-XXXX
- 或查看邮件通知

---

## 📋 步骤2：配置环境变量

### 2.1 创建 .env 文件

在 `backend` 目录下创建 `.env` 文件：

```bash
# Windows PowerShell
cd backend
New-Item -Path .env -ItemType File

# 或使用文本编辑器直接创建
```

### 2.2 添加配置

打开 `.env` 文件，添加以下内容：

```bash
# 服务端口（可选，默认3001）
PORT=3001

# 携程联盟PID（必须配置）
OTA_PID=你的携程PID

# 示例：
# OTA_PID=123456
# OTA_PID=ABC123DEF456
```

**重要提示：**
- 将 `你的携程PID` 替换为实际获取的PID
- PID是敏感信息，不要提交到Git仓库
- 确保 `.env` 文件已添加到 `.gitignore`

### 2.3 验证 .gitignore

检查 `backend/.gitignore` 或项目根目录的 `.gitignore` 是否包含：

```
.env
.env.local
.env.*.local
```

如果没有，请添加。

---

## 📋 步骤3：测试链接生成

### 3.1 启动后端服务

```bash
cd backend
npm install  # 如果还没安装依赖
npm run dev
```

### 3.2 检查启动日志

启动时应该看到：
```
🚀 后端服务运行在 http://localhost:3001
📡 API地址: http://localhost:3001/api/recommendations
💚 健康检查: http://localhost:3001/health
📋 城市列表: http://localhost:3001/api/cities
```

**如果看到警告：**
```
⚠️  警告: 未配置OTA_PID，OTA链接将使用默认值
```

说明环境变量未正确加载，检查：
1. `.env` 文件是否存在
2. PID是否正确配置
3. 服务是否重启（修改.env后需要重启）

### 3.3 测试详情API

**方法1：使用浏览器**

访问：
```
http://localhost:3001/api/destinations/1?origin=北京
```

**方法2：使用curl**

```bash
curl http://localhost:3001/api/destinations/1?origin=北京
```

**方法3：使用测试脚本**

运行测试脚本（见下方）：

```bash
node test-ota-links.js
```

### 3.4 验证返回结果

检查返回的 `cta_links` 字段：

```json
{
  "code": 200,
  "data": {
    "cta_links": {
      "hotel": "https://hotels.ctrip.com/hotels/list?city=杭州&utm_source=travel_student&pid=你的PID",
      "transport": "https://trains.ctrip.com/...&pid=你的PID",
      "package": "https://vacations.ctrip.com/...&pid=你的PID"
    }
  }
}
```

**验证要点：**
- ✅ `pid=` 后面应该是你配置的PID（不是 `YOUR_PID`）
- ✅ 链接格式正确
- ✅ 包含 `utm_source=travel_student`

---

## 📋 步骤4：验证链接有效性（可选）

### 4.1 测试链接跳转

1. 复制 `cta_links.hotel` 中的链接
2. 在浏览器中打开
3. 检查是否正常跳转到携程酒店页面
4. 检查URL中是否包含你的PID

### 4.2 检查返佣设置

在携程联盟后台：
1. 查看"推广链接"或"链接管理"
2. 确认PID已激活
3. 查看返佣比例和规则

---

## 🔧 故障排查

### 问题1：服务启动时显示警告

**原因：** 环境变量未正确加载

**解决方案：**
1. 检查 `.env` 文件是否存在
2. 检查文件路径是否正确（应在 `backend/.env`）
3. 检查PID格式是否正确（无空格、无引号）
4. 重启服务

### 问题2：链接中PID仍然是 `YOUR_PID`

**原因：** 环境变量未读取到

**解决方案：**
1. 确认 `.env` 文件格式正确：
   ```bash
   OTA_PID=123456  # 正确
   OTA_PID="123456"  # 错误（不要加引号）
   ```
2. 确认服务已重启
3. 检查 `server.js` 中是否使用了 `require('dotenv').config()`

### 问题3：找不到PID

**原因：** 账号未激活或需要审核

**解决方案：**
1. 检查账号是否已激活
2. 查看邮件通知
3. 联系携程联盟客服
4. 或使用测试PID先开发（后续替换）

### 问题4：链接无法跳转

**原因：** PID格式错误或未激活

**解决方案：**
1. 检查PID是否正确
2. 在携程联盟后台测试链接生成
3. 确认PID已激活

---

## ✅ 验收标准

配置完成后，应满足：

- [ ] `.env` 文件已创建并配置PID
- [ ] 服务启动时无警告信息
- [ ] 详情API返回的 `cta_links` 包含正确的PID
- [ ] 链接格式正确（包含 `pid=` 参数）
- [ ] 链接可以正常跳转到携程页面

---

## 📝 配置示例

### 完整的 .env 文件示例

```bash
# 服务配置
PORT=3001

# 携程联盟PID（必须配置）
OTA_PID=123456789

# 飞猪联盟PID（可选）
# FLIGGY_PID=YOUR_FLIGGY_PID
```

### 测试结果示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "杭州",
    "cta_links": {
      "hotel": "https://hotels.ctrip.com/hotels/list?city=杭州&utm_source=travel_student&pid=123456789",
      "transport": "https://trains.ctrip.com/trainbooking/TrainList.aspx?from=北京&to=杭州&utm_source=travel_student&pid=123456789",
      "package": "https://vacations.ctrip.com/list?dest=杭州&utm_source=travel_student&pid=123456789"
    }
  }
}
```

---

## 🚀 下一步

配置完成后：
1. ✅ 与前端联调测试
2. ✅ 验证链接跳转
3. ✅ 准备部署到生产环境

---

## 📞 需要帮助？

- 携程联盟官网：https://u.ctrip.com/
- 客服电话：查看联盟后台
- 技术文档：`backend/README.md`
- 环境配置：`backend/ENV_SETUP.md`

