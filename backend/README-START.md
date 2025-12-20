# 后端服务器启动指南

## 问题：npm 配置错误

如果遇到以下错误：
```
Error: Cannot find module 'E:\ss\node_modules\npm\bin\npm-prefix.js'
```

这是因为 npm 配置指向了错误的路径。

## 解决方案

### 方案1：直接使用 node 运行（推荐，最简单）

```powershell
cd backend
node server.js
```

### 方案2：使用启动脚本

```powershell
cd backend
.\start-server.ps1
```

或使用批处理文件：
```cmd
cd backend
start-server.bat
```

### 方案3：修复 npm 配置

```powershell
cd backend
.\fix-npm.ps1
```

然后就可以正常使用：
```powershell
npm run dev
```

### 方案4：使用 nodemon 直接运行（开发模式）

```powershell
cd backend
node node_modules\nodemon\bin\nodemon.js server.js
```

## 验证服务器是否运行

服务器默认运行在 `http://localhost:3001`

检查端口：
```powershell
netstat -ano | findstr :3001
```

测试 API：
```powershell
# 使用 curl（如果已安装）
curl http://localhost:3001/api/recommendations?type=week

# 或使用浏览器访问
# http://localhost:3001/api/recommendations?type=week
```

## 当前状态

✅ 服务器已经在运行（端口 3001）
✅ 所有"学生"相关字段已清理
✅ 缓存控制已添加


