'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { fetchDestinationDetail, type DestinationDetail } from '@/lib/api'
import { getCityGradient, shouldUsePlaceholder } from '@/lib/cityGradients'

export default function DestinationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [destination, setDestination] = useState<DestinationDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ⚠️ 重要：从 URL 的 query 参数中获取 origin，如果没有则使用默认值"北京"
  const origin = searchParams.get('origin') || '北京'

  useEffect(() => {
    if (params.id) {
      fetchDestination()
    }
  }, [params.id, origin])

  const fetchDestination = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // ⚠️ 重要：传递 origin 参数给 API，确保生成的链接使用正确的出发地
      const data = await fetchDestinationDetail(params.id as string, origin)
      setDestination(data)
    } catch (error) {
      console.error('获取目的地详情失败:', error)
      setError('获取目的地详情失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCTAClick = (url: string) => {
    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-gray-600 mb-2 text-lg">
            {error || '目的地不存在'}
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button 
              onClick={fetchDestination}
              className="cta-button"
            >
              重试
            </button>
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <button 
            onClick={() => router.push('/')}
            className="text-sm sm:text-base text-gray-600 hover:text-gray-900 flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            ← 返回
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* 错误提示 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={fetchDestination}
                className="text-red-700 hover:text-red-900 underline text-sm"
              >
                重试
              </button>
            </div>
          </div>
        )}

        {/* 封面图片 */}
        <div className="mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-lg">
          <CoverImage destination={destination} />
        </div>

        {/* 一句话结论 - 首屏重要 */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {destination.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            {destination.summary}
          </p>
        </div>

        {/* 信任信号 */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
            {destination.trust_signals.student_count > 0 && (
              <span>✅ 已被{destination.trust_signals.student_count}名学生选择</span>
            )}
            {destination.trust_signals.is_popular && (
              <span>🔥 最近7天点击最多</span>
            )}
            {destination.trust_signals.is_student_favorite && (
              <span>🎓 学生党常选</span>
            )}
          </div>
        </div>

        {/* 为什么推荐 */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">为什么推荐</h2>
          <ul className="space-y-3">
            {destination.recommend_reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary-600 font-bold flex-shrink-0">{index + 1}.</span>
                <span className="text-sm sm:text-base text-gray-700">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 价格入口（最重要，3个CTA）- 确保在首屏可见 */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">立即预订</h2>
          <div className="space-y-3 sm:space-y-4">
            {/* CTA 1：酒店最低价 */}
            <button
              onClick={() => handleCTAClick(destination.cta_links.hotel)}
              className="cta-button w-full text-left min-h-[60px] sm:min-h-[70px]"
            >
              <div>
                <div className="font-bold text-base sm:text-lg mb-1">🏨 查看学生最低价（携程）</div>
                <div className="text-xs sm:text-sm opacity-90">预算{destination.budget_range}内可成行</div>
              </div>
            </button>

            {/* CTA 2：高铁/机票 */}
            <button
              onClick={() => handleCTAClick(destination.cta_links.transport)}
              className="cta-button w-full text-left min-h-[60px] sm:min-h-[70px]"
            >
              <div>
                <div className="font-bold text-base sm:text-lg mb-1">🚄 现在去订（高铁/机票）</div>
                <div className="text-xs sm:text-sm opacity-90">学生专享价</div>
              </div>
            </button>

            {/* CTA 3：套餐推荐 */}
            <button
              onClick={() => handleCTAClick(destination.cta_links.package)}
              className="cta-button w-full text-left min-h-[60px] sm:min-h-[70px]"
            >
              <div>
                <div className="font-bold text-base sm:text-lg mb-1">🎫 查看优惠套餐</div>
                <div className="text-xs sm:text-sm opacity-90">学生专享价</div>
              </div>
            </button>
          </div>
        </div>

        {/* 参考行程 */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">参考行程</h2>
          <div className="space-y-2">
            {destination.itinerary.map((item, index) => (
              <p key={index} className="text-sm sm:text-base text-gray-700">{item}</p>
            ))}
          </div>
        </div>

        {/* 其他信息 */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">天气信息</h2>
          <div className="text-sm sm:text-base text-gray-700 space-y-1">
            <p>当前：{destination.weather.current}</p>
            <p>未来3天：{destination.weather.forecast.join(' / ')}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

// 封面图片组件
function CoverImage({ destination }: { destination: DestinationDetail }) {
  const [imageError, setImageError] = useState(false)
  const gradient = getCityGradient(destination.name)
  const usePlaceholder = shouldUsePlaceholder((destination as any).cover_image) || imageError

  if (usePlaceholder) {
    return (
      <div className={`w-full h-64 sm:h-80 bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center`}>
        <span className="text-white text-4xl sm:text-5xl font-bold drop-shadow-lg">
          {destination.name}
        </span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-64 sm:h-80">
      <Image
        src={(destination as any).cover_image || ''}
        alt={destination.name}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-6 left-6">
        <h1 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">
          {destination.name}
        </h1>
      </div>
    </div>
  )
}

