import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '旅游推荐 - 假日去哪玩',
  description: '精选周末和假期旅游目的地，官方直订，即买即用',
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

