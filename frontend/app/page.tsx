'use client'

import { useState, useEffect } from 'react'
import RecommendationCard from '@/components/RecommendationCard'
import { fetchRecommendations, type Recommendation } from '@/lib/api'

export default function Home() {
  const [weekRecommendations, setWeekRecommendations] = useState<Recommendation[]>([])
  const [monthRecommendations, setMonthRecommendations] = useState<Recommendation[]>([])
  const [popularRecommendations, setPopularRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllRecommendations()
  }, [])

  const fetchAllRecommendations = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // 并行请求三个推荐列表
      const [weekData, monthData, popularData] = await Promise.all([
        fetchRecommendations('week'),
        fetchRecommendations('month'),
        fetchRecommendations('popular')
      ])
      
      setWeekRecommendations(weekData)
      setMonthRecommendations(monthData)
      setPopularRecommendations(popularData)
    } catch (error) {
      console.error('获取推荐失败:', error)
      setError('获取推荐失败，请稍后重试')
      // 发生错误时，保持空数组，显示空状态
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航栏 - 简化设计，不抢占视觉 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-600">
              🎒 学生旅游推荐
            </h1>
            <button className="text-sm sm:text-base text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
              筛选
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 - 确保首屏就有推荐 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* 错误提示 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={fetchAllRecommendations}
                className="text-red-700 hover:text-red-900 underline text-sm"
              >
                重试
              </button>
            </div>
          </div>
        )}

        {/* 本周推荐 - 首屏最重要 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            【本周推荐】
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="recommendation-card h-80 sm:h-96 animate-pulse bg-gray-200 rounded-xl" />
              ))}
            </div>
          ) : weekRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {weekRecommendations.map(rec => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>暂无本周推荐</p>
              {!loading && (
                <button
                  onClick={fetchAllRecommendations}
                  className="mt-4 text-primary-600 hover:text-primary-700 underline text-sm"
                >
                  刷新
                </button>
              )}
            </div>
          )}
        </section>

        {/* 本月推荐 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            【本月推荐】
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="recommendation-card h-80 sm:h-96 animate-pulse bg-gray-200 rounded-xl" />
              ))}
            </div>
          ) : monthRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {monthRecommendations.map(rec => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>暂无本月推荐</p>
            </div>
          )}
        </section>

        {/* 学生常选 */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            【学生常选】
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="recommendation-card h-80 sm:h-96 animate-pulse bg-gray-200 rounded-xl" />
              ))}
            </div>
          ) : popularRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {popularRecommendations.map(rec => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>暂无学生常选推荐</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

