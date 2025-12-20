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

// 计算稀缺程度
function getScarcityLevel(soldCount: number): {
  level: 'high' | 'medium' | 'low'
  text: string
  color: string
} {
  if (soldCount >= 200000) {
    return {
      level: 'high',
      text: '库存告急',
      color: 'text-red-600'
    }
  } else if (soldCount >= 100000) {
    return {
      level: 'medium',
      text: '库存紧张',
      color: 'text-orange-600'
    }
  }
  return {
    level: 'low',
    text: '热销中',
    color: 'text-primary-600'
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

        {/* 已售数量和稀缺提示 */}
        <div className="mb-4 space-y-2">
          {soldCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">
                已售 {formatSoldCount(soldCount)}
              </span>
              <span className={`text-xs sm:text-sm font-semibold ${scarcity.color} ${
                scarcity.level === 'high' && isUrgent ? 'animate-pulse' : ''
              }`}>
                {scarcity.text}
              </span>
            </div>
          )}
          
          {/* 稀缺进度条（视觉化稀缺感） */}
          {soldCount > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  scarcity.level === 'high' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600' 
                    : scarcity.level === 'medium'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                    : 'bg-gradient-to-r from-primary-500 to-primary-600'
                }`}
                style={{
                  width: `${Math.min((soldCount / 300000) * 100, 95)}%`
                }}
              />
            </div>
          )}
        </div>

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


