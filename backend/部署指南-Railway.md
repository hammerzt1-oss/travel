# Railway部署指南

## 🚀 快速部署步骤

### Step 1：创建账号（2分钟）

1. 访问 https://railway.app
2. 点击 "Start a New Project"
3. 使用GitHub账号登录
4. 授权Railway访问GitHub仓库

### Step 2：创建项目（3分钟）

1. 点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择项目仓库（travel）
4. 点击 "Deploy Now"

### Step 3：配置服务（5分钟）

1. **设置Root Directory**
   - 进入服务设置
   - 找到 "Root Directory"
   - 设置为：`backend`

2. **确认启动命令**
   - Start Command: `npm start`（自动检测）
   - Build Command: `npm install`（自动检测）

### Step 4：配置环境变量（5分钟）

1. 进入项目 → 点击服务 → "Variables" 标签
2. 添加以下环境变量：

```
OTA_PID=284116645
NODE_ENV=production
```

**注意：**
- PORT会自动配置，无需手动设置
- 修改环境变量后会自动重新部署

### Step 5：等待部署（3-5分钟）

1. 查看部署日志
2. 等待部署完成
3. 获取部署URL（如：`https://xxx.railway.app`）

### Step 6：验证部署（2分钟）

1. 访问健康检查：`https://你的URL/health`
2. 应该返回：
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "travel-backend",
  "version": "1.0.0"
}
```

3. 测试API：`https://你的URL/api/recommendations?type=week`
4. 应该返回推荐列表数据

---

## ✅ 验证清单

- [ ] 部署成功
- [ ] 健康检查通过（/health返回200）
- [ ] API正常响应
- [ ] 环境变量配置正确
- [ ] OTA链接生成正常

---

## 🔧 故障排查

### 问题1：部署失败

**检查：**
- Root Directory是否正确（应该是 `backend`）
- package.json是否存在
- 依赖是否正确安装

### 问题2：服务无法启动

**检查：**
- 环境变量是否正确配置
- 日志中是否有错误信息
- PORT是否正确

### 问题3：健康检查失败

**检查：**
- 服务是否正常运行
- 日志中是否有错误
- 网络连接是否正常

---

## 📝 部署后操作

1. **获取部署URL**
   - 在Railway项目页面找到服务URL
   - 复制URL（如：`https://xxx.railway.app`）

2. **通知前端工程师**
   - 提供后端URL
   - 前端需要配置 `NEXT_PUBLIC_API_URL`

3. **验证功能**
   - 测试所有API端点
   - 验证OTA链接生成
   - 检查日志

---

**预计时间：** 20-30分钟
**状态：** 就绪

