# 旅游目的地推荐网站

面向学生群体的周末/假期旅游目的地推荐 + OTA导流平台

## 项目目标

**3天内必须能点出去**（首页 + 推荐卡片 + OTA跳转链接）

## 项目结构

```
travel/
├── frontend/          # 前端项目（Next.js/Vue）
├── backend/          # 后端项目（Node.js/Python）
├── data/             # 数据文件（JSON/SQLite）
├── docs/             # 文档
│   ├── 产品方案设计.md
│   └── 任务分配.md
└── README.md
```

## 技术栈

### 前端
- Next.js 14 + TypeScript（推荐，SEO友好）
- 或 Vue 3 + Vite + TypeScript（快速开发）
- Tailwind CSS（样式）
- 部署：Vercel/Netlify（免费）

### 后端
- Node.js + Express + SQLite（推荐）
- 或 Python + FastAPI + JSON
- 部署：Railway/Render（免费）

## 核心功能

1. **推荐优先首页**：打开直接看到推荐，无需操作
2. **高转化推荐卡片**：CTA醒目，文案"像钱"
3. **OTA跳转链接**：携程/飞猪/去哪儿返佣
4. **信任信号模块**：学生真实使用信号

## 开发计划

### 第1天
- 前端架构 + 后端架构
- 首页开发 + 推荐API
- 数据准备

### 第2天
- 推荐卡片组件 + 详情页
- 详情API + OTA链接对接
- 文案撰写

### 第3天
- 联调测试
- 部署上线
- 观察数据

## 验收标准

- ✅ 打开网站直接看到推荐
- ✅ 首屏就有推荐卡片
- ✅ CTA按钮醒目，能正常跳转OTA
- ✅ 移动端体验良好

## 开始开发

详细任务分配见：[任务分配.md](./任务分配.md)

