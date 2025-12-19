# 前端项目说明

## 项目状态

✅ **已完成：**
- 项目基础架构（Next.js 14 + TypeScript + Tailwind CSS）
- 推荐优先的首页布局（首屏就有推荐）
- 高转化推荐卡片组件（CTA醒目、信任信号优化）
- 详情页（使用假数据跑通）
- 移动端响应式设计
- API工具函数（准备对接后端）

## 技术栈

- **框架**：Next.js 14 + TypeScript
- **样式**：Tailwind CSS
- **部署**：Vercel（推荐）

## 项目结构

```
frontend/
├── app/
│   ├── page.tsx              # 首页（推荐列表）
│   ├── destinations/
│   │   └── [id]/
│   │       └── page.tsx     # 详情页
│   ├── layout.tsx            # 根布局
│   └── globals.css           # 全局样式
├── components/
│   └── RecommendationCard.tsx # 推荐卡片组件
├── data/
│   ├── mockRecommendations.json      # 假数据（推荐列表）
│   └── mockDestinationDetails.json  # 假数据（详情页）
├── lib/
│   └── api.ts                # API工具函数
└── package.json
```

## 核心功能

### 1. 首页（推荐优先）

- ✅ 打开网站直接看到推荐（无需操作）
- ✅ 首屏就有推荐卡片
- ✅ 三个推荐分类：本周推荐、本月推荐、学生常选
- ✅ 移动端响应式布局

### 2. 推荐卡片组件

- ✅ CTA按钮醒目（渐变背景、阴影、hover效果）
- ✅ 信任信号只显示1-2个（避免信息噪音）
- ✅ 移动端点击区域足够大（≥44px）
- ✅ CTA永远在可视区（使用flex布局）

### 3. 详情页

- ✅ 一句话结论（首屏重要）
- ✅ 信任信号展示
- ✅ 推荐理由（3条）
- ✅ 3个CTA按钮（酒店、交通、套餐）
- ✅ 参考行程
- ✅ 天气信息

## 开发指南

### 启动开发服务器

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:3000

### 当前使用假数据

首页和详情页目前使用假数据（`data/mockRecommendations.json` 和 `data/mockDestinationDetails.json`），用于快速验证布局和CTA。

### 对接后端API

1. 设置环境变量 `NEXT_PUBLIC_API_URL`（默认：http://localhost:3001）
2. 在 `app/page.tsx` 中取消注释API调用代码
3. 在 `app/destinations/[id]/page.tsx` 中取消注释API调用代码
4. 使用 `lib/api.ts` 中的工具函数

## 设计要点

### CTA按钮设计

- **文案必须"像钱"**：
  - ✅ "查看学生最低价"
  - ✅ "现在去订（携程）"
  - ✅ "预算XXX内可成行"
  - ❌ 不用："查看详情"、"查看方案"

### 信任信号规则

- 每张卡最多显示1-2个信任信号
- 主推卡：显示"🔥 最近7天点击最多"
- 普通卡：显示"✅ 已被XXX名学生选择"

### 移动端优化

- 点击区域至少44x44px
- 响应式布局（移动端优先）
- 首屏内容优先展示

## 下一步工作

1. **对接后端API**：
   - 替换假数据为真实API调用
   - 处理加载状态和错误状态

2. **优化交互**：
   - 添加筛选功能（可折叠）
   - 优化加载动画
   - 添加错误提示

3. **性能优化**：
   - 图片懒加载
   - 代码分割
   - SEO优化

4. **测试**：
   - 功能测试
   - 移动端测试
   - 跨浏览器测试

## 与后端对接

### API接口规范

**推荐列表API：**
```
GET /api/recommendations?type=week|month|popular&origin=出发地
```

**详情API：**
```
GET /api/destinations/:id?origin=出发地
```

详细接口规范见：`../后端任务清单.md`

## 注意事项

- ⚠️ **OTA链接必须由后端生成**（包含返佣参数）
- ⚠️ **前端只使用后端返回的完整链接**
- ⚠️ **不要在前端拼接返佣参数**


