import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '学生旅游推荐 - 假日去哪玩',
  description: '为学生推荐周末和假期旅游目的地，预算友好，不踩雷',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

