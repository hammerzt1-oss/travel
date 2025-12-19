'use client'

import { Attraction } from '@/lib/api'

interface Props {
  attraction: Attraction
}

export default function AttractionCard({ attraction }: Props) {
  const handleCTAClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(attraction.cta_link, '_blank')
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 sm:p-5">
        {/* 标题和分类 */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1">
              {attraction.name}
            </h3>
            {attraction.student_ticket && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded whitespace-nowrap">
                学生票
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{attraction.category}</p>
        </div>

        {/* 核心信息 */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-primary-600 font-semibold">💰</span>
            <span>{attraction.price_hint}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-primary-600 font-semibold">⏰</span>
            <span>{attraction.suitable_days}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-primary-600 font-semibold">📍</span>
            <span>{attraction.transport}</span>
          </div>
          {attraction.photo_friendly && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-primary-600 font-semibold">📸</span>
              <span>拍照友好</span>
            </div>
          )}
        </div>

        {/* 推荐理由 */}
        <p className="text-sm text-gray-600 mb-4">{attraction.primary_reason}</p>

        {/* 信任信号 */}
        {attraction.trust_signals.student_count > 0 && (
          <div className="text-xs text-gray-500 mb-4">
            🔥 最近7天 {attraction.trust_signals.student_count} 名学生选择
          </div>
        )}

        {/* CTA按钮 */}
        <button
          onClick={handleCTAClick}
          className="cta-button w-full text-center py-2.5 sm:py-3"
        >
          {attraction.cta_text}
        </button>
      </div>
    </div>
  )
}

