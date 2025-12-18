# 旅游目的地推荐网站 - 后端服务

## 项目简介

面向学生群体的旅游目的地推荐网站后端服务，提供推荐列表、目的地详情、OTA跳转链接生成等功能。

## 核心功能

- ✅ 推荐列表API（支持week/month/popular/student_favorite类型）
- ✅ 目的地详情API
- ✅ OTA跳转链接生成（携程/飞猪）
- ✅ 距离计算（基于经纬度）
- ✅ 城市列表API
- ✅ API限流保护
- ✅ 健康检查接口

## 技术栈

- **Node.js** + **Express**
- **dotenv**（环境变量管理）
- **CORS**（跨域支持）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env` 文件（参考 `ENV_SETUP.md`）：

```bash
PORT=3001
OTA_PID=YOUR_CTRIP_PID
```

### 3. 启动服务

**开发模式（自动重启）：**
```bash
npm run dev
```

**生产模式：**
```bash
npm start
```

服务默认运行在 `http://localhost:3001`

## API接口

### 1. 推荐列表

```
GET /api/recommendations?type=week&origin=北京
```

**参数：**
- `type`: 推荐类型（week/weekend/month/popular/student_favorite）
- `origin`: 出发地（可选）

**响应示例：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "杭州",
        "tag": "学生周末推荐",
        "budget_range": "600-800",
        "primary_reason": "预算600-800内可成行",
        "distance": 150,
        "transport": "高铁直达 · 1.5h",
        "weather": "未来两天晴",
        "suitable_days": "1-2天",
        "trust_signals": {
          "student_count": 120,
          "click_count_7d": 85,
          "is_popular": true,
          "is_student_favorite": true
        },
        "cover_image": "/images/hangzhou.jpg",
        "cta_text": "查看学生最低价"
      }
    ],
    "total": 10
  }
}
```

### 2. 目的地详情

```
GET /api/destinations/:id?origin=北京
```

**参数：**
- `id`: 目的地ID
- `origin`: 出发地（可选，用于生成交通链接）

**响应示例：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "杭州",
    "summary": "适合预算800内、周末放松、不折腾",
    "recommend_reasons": [
      "交通简单（高铁直达，1.5h）",
      "吃住便宜（青旅多，小吃丰富）",
      "不踩雷（学生友好，安全可靠）"
    ],
    "itinerary": [
      "Day1：上午高铁 → 下午西湖 → 晚上河坊街",
      "Day2：灵隐寺 → 下午返程"
    ],
    "budget_range": "600-800",
    "trust_signals": {...},
    "cta_links": {
      "hotel": "https://hotels.ctrip.com/...",
      "transport": "https://trains.ctrip.com/...",
      "package": "https://vacations.ctrip.com/..."
    },
    "weather": {
      "current": "晴",
      "forecast": ["晴", "多云", "晴"]
    }
  }
}
```

### 3. 城市列表

```
GET /api/cities
```

返回常用城市列表，用于出发地选择。

### 4. 健康检查

```
GET /health
```

## 数据文件

目的地数据存储在 `../data/destinations.json`，格式参考现有数据。

## 限流策略

- 推荐列表接口：100次/分钟
- 目的地详情接口：200次/分钟
- 城市列表接口：50次/分钟

超过限制返回 `429` 状态码。

## OTA链接生成

所有OTA链接在后端统一生成，包含返佣参数：

- 从环境变量读取PID（避免泄露）
- 自动添加utm_source参数
- 支持携程、飞猪等多个平台

**重要：** 不要在前端拼接返佣参数，所有敏感信息都在后端处理。

## 开发规范

### 错误处理

所有API统一返回格式：
```json
{
  "code": 200,
  "message": "success",
  "data": {...}
}
```

错误响应：
```json
{
  "code": 400,
  "message": "参数错误",
  "error": "具体错误信息"
}
```

### 日志

- 请求日志：自动记录所有API请求
- 错误日志：使用 `console.error` 记录错误

## 部署

### 环境变量

生产环境需要配置：
- `PORT`: 服务端口
- `OTA_PID`: 携程联盟PID（必须）
- `FLIGGY_PID`: 飞猪联盟PID（可选）

### 推荐平台

- **Railway**: https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com

## 与前端对接

前端需要配置 `NEXT_PUBLIC_API_URL` 环境变量：

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 后续优化

- [ ] 天气API对接（和风天气/OpenWeatherMap）
- [ ] 天气数据缓存（2小时TTL）
- [ ] Redis限流（替代内存限流）
- [ ] 数据库迁移（SQLite → MySQL）
- [ ] 日志系统（ELK Stack）

## 注意事项

1. **OTA PID配置**：必须配置才能生成有效的返佣链接
2. **数据文件路径**：确保 `destinations.json` 文件存在
3. **CORS配置**：已配置允许所有来源，生产环境建议限制
4. **限流策略**：MVP阶段使用内存限流，高并发需要升级

## 联系与支持

如有问题，请查看：
- 环境变量配置：`ENV_SETUP.md`
- 产品方案：`../产品方案设计.md`
- 任务清单：`../后端任务清单.md`

