'use client'

import { useState, useEffect } from 'react'

interface HotelCouponCardProps {
  price: number
  title: string
  description: string
  link: string
  soldCount?: number
  recommended?: boolean
}

// 格式化已售数量
function formatSoldCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(0)}万+`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`
  }
  return count.toString()
}

// 计算受欢迎程度（合规表述）
function getScarcityLevel(soldCount: number): {
  level: 'high' | 'medium' | 'low'
  text: string
  color: string
  hint: string
} {
  if (soldCount >= 200000) {
    return {
      level: 'high',
      text: '🔥 热门选择',
      color: 'text-red-600',
      hint: '可使用的酒店库存越来越少'
    }
  } else if (soldCount >= 100000) {
    return {
      level: 'medium',
      text: '最近使用人数较多',
      color: 'text-orange-600',
      hint: '可使用的酒店库存越来越少'
    }
  }
  return {
    level: 'low',
    text: '⏰ 当前优惠',
    color: 'text-primary-600',
    hint: '⏰ 近期有效'
  }
}

export default function HotelCouponCard({ 
  price, 
  title, 
  description, 
  link,
  soldCount = 0,
  recommended = false 
}: HotelCouponCardProps) {
  const [isUrgent, setIsUrgent] = useState(false)
  const scarcity = getScarcityLevel(soldCount)

  // 高稀缺度时添加闪烁效果
  useEffect(() => {
    if (scarcity.level === 'high') {
      const interval = setInterval(() => {
        setIsUrgent(prev => !prev)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [scarcity.level])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 在新窗口打开，确保联盟追踪有效
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
      recommended ? 'border-primary-500 border-dashed' : 'border-transparent'
    } ${scarcity.level === 'high' && isUrgent ? 'ring-2 ring-red-500 ring-opacity-50' : ''}`}>
      <div className="p-4 sm:p-5 flex flex-col h-full">
        {/* 价格标签 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-primary-600">
            ¥{price}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">起</span>
          {recommended && (
            <span className="ml-auto px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded">
              推荐
            </span>
          )}
        </div>

        {/* 标题 */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
          {title}
        </h3>

        {/* 描述 */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow">
          {description}
        </p>

        {/* 已售数量和受欢迎程度提示 - 同一行显示 */}
        {soldCount > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                已售 {formatSoldCount(soldCount)}
              </span>
              <span className="text-gray-400">·</span>
              <span className={`text-xs sm:text-sm font-semibold ${scarcity.color} whitespace-nowrap ${
                scarcity.level === 'high' && isUrgent ? 'animate-pulse' : ''
              }`}>
                {scarcity.text}
              </span>
            </div>
            {/* 提示文案（合规表述） */}
            {scarcity.hint && (
              <div className="text-xs text-gray-500 mt-1.5">
                {scarcity.hint}
              </div>
            )}
          </div>
        )}

        {/* CTA按钮 */}
        <button
          onClick={handleClick}
          className={`cta-button w-full text-center py-2.5 sm:py-3 text-sm sm:text-base ${
            scarcity.level === 'high' ? 'animate-pulse' : ''
          }`}
        >
          {scarcity.level === 'high' ? '🔥 立即抢购' : '立即抢购'}
        </button>
      </div>
    </div>
  )
}


