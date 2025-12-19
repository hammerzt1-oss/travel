'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getCityGradient, shouldUsePlaceholder } from '@/lib/cityGradients'
import Image from 'next/image'

interface Recommendation {
  id: number
  name: string
  tag: string
  budget_range: string
  primary_reason: string // 新增：直接用于CTA上方文案
  distance: number | null
  transport: string
  weather: string
  suitable_days: string
  trust_signals: {
    view_count_7d: number
    click_count_7d: number
    is_popular: boolean
  }
  cover_image: string
  cta_text: string
  cta_links?: {
    hotel: string
    transport: string
    package: string
  }
}

interface Props {
  recommendation: Recommendation
  origin?: string // 出发地，用于更新CTA链接
}

export default function RecommendationCard({ recommendation, origin = '北京' }: Props) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)
  const gradient = getCityGradient(recommendation.name)
  const usePlaceholder = shouldUsePlaceholder(recommendation.cover_image) || imageError

  const handleClick = () => {
    // ⚠️ 重要：跳转详情页时必须传递 origin 参数，否则详情页会使用默认值"北京"
    router.push(`/destinations/${recommendation.id}?origin=${encodeURIComponent(origin)}`)
  }

  const handleCTAClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // 使用后端返回的真实OTA链接（包含正确的城市代码和联盟参数）
    const hotelLink = recommendation.cta_links?.hotel || `https://hotels.ctrip.com/hotels/list?city=${recommendation.name}`
    window.open(hotelLink, '_blank')
  }

  return (
    <div 
      className="recommendation-card flex flex-col h-full"
      onClick={handleClick}
    >
      {/* 封面图：支持真实图片或占位图 */}
      <div className="h-40 sm:h-48 relative flex items-center justify-center flex-shrink-0 overflow-hidden">
        {usePlaceholder ? (
          // 占位图：使用城市专属渐变背景
          <div className={`w-full h-full bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center`}>
            <span className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">
              {recommendation.name}
            </span>
          </div>
        ) : (
          // 真实图片：如果加载失败，回退到占位图
          <>
            <Image
              src={recommendation.cover_image}
              alt={recommendation.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority={false}
            />
            {/* 图片上的城市名称遮罩（可选，增加可读性） */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white text-2xl sm:text-3xl font-bold drop-shadow-lg">
              {recommendation.name}
            </span>
          </>
        )}
      </div>

      {/* 卡片内容 - 使用flex布局确保CTA在底部 */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* 推荐标签 */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs sm:text-sm font-semibold text-primary-600">
            🎒 {recommendation.tag}
          </span>
        </div>

        {/* 目的地名称 */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
          📍 {recommendation.name}
        </h3>

        {/* 关键信息 - 紧凑布局 */}
        <div className="space-y-1.5 mb-3 text-xs sm:text-sm text-gray-600 flex-grow">
          <div className="flex items-center gap-2">
            <span>💰 人均：{recommendation.budget_range}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🚄 {recommendation.transport}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>☀️ {recommendation.weather}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📅 适合{recommendation.suitable_days}</span>
          </div>
          {/* primary_reason：直接用于CTA上方文案 */}
          {recommendation.primary_reason && (
            <div className="text-primary-600 font-semibold mt-2 text-sm">
              {recommendation.primary_reason}
            </div>
          )}
        </div>

        {/* 信任信号（每张卡最多显示1-2个，避免信息噪音） */}
        <div className="mb-3 text-xs text-gray-500">
          {recommendation.trust_signals.is_popular ? (
            // 主推卡：显示点击最多
            <span>🔥 最近7天点击最多</span>
          ) : recommendation.trust_signals.click_count_7d > 0 ? (
            // 普通卡：显示点击量
            <span>🔥 最近7天 {recommendation.trust_signals.click_count_7d} 次浏览</span>
          ) : null}
        </div>

        {/* CTA按钮（最重要）- 确保在可视区，移动端点击区域足够大） */}
        <button 
          className="cta-button w-full mt-auto min-h-[44px] sm:min-h-[48px] text-sm sm:text-base font-bold"
          onClick={handleCTAClick}
        >
          👉 {recommendation.cta_text}
        </button>
      </div>
    </div>
  )
}

