# 后端环境变量配置说明

## 必需配置

### 1. OTA返佣PID（必须配置）

在项目根目录创建 `.env` 文件，添加以下配置：

```bash
# 携程联盟PID（必须配置）
OTA_PID=YOUR_CTRIP_PID
# 或使用 CTRIP_PID
# CTRIP_PID=YOUR_CTRIP_PID
```

**如何获取携程PID：**
1. 访问携程联盟官网：https://u.ctrip.com/
2. 注册成为联盟会员
3. 获取你的PID（推广ID）

**注意：**
- PID是敏感信息，不要提交到Git仓库
- 确保 `.env` 文件已添加到 `.gitignore`

### 2. 服务端口（可选）

```bash
PORT=3001
```

默认端口为 3001，如果端口被占用，可以修改此配置。

## 可选配置

### 飞猪联盟PID

```bash
FLIGGY_PID=YOUR_FLIGGY_PID
```

如果配置了飞猪PID，详情页会额外提供飞猪链接。

### 天气API配置（后续对接）

```bash
WEATHER_API_KEY=YOUR_WEATHER_API_KEY
WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

## 配置示例

完整的 `.env` 文件示例：

```bash
# 服务配置
PORT=3001

# OTA返佣PID（必须）
OTA_PID=YOUR_CTRIP_PID

# 飞猪联盟PID（可选）
FLIGGY_PID=YOUR_FLIGGY_PID

# 天气API（可选，后续对接）
# WEATHER_API_KEY=YOUR_WEATHER_API_KEY
```

## 验证配置

启动服务后，访问健康检查接口验证配置：

```bash
curl http://localhost:3001/health
```

如果返回正常，说明配置成功。




