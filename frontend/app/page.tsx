'use client'

import { useState, useEffect } from 'react'
import RecommendationCard from '@/components/RecommendationCard'
import { fetchRecommendations, type Recommendation } from '@/lib/api'
import { provincesAndCities, getAllProvinces, getCitiesByProvince } from '@/lib/cities'

export default function Home() {
  const [weekRecommendations, setWeekRecommendations] = useState<Recommendation[]>([])
  const [monthRecommendations, setMonthRecommendations] = useState<Recommendation[]>([])
  const [popularRecommendations, setPopularRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [origin, setOrigin] = useState<string>('北京') // 默认出发地
  const [showOriginSelector, setShowOriginSelector] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState<string>('北京') // 选中的省份
  const [showCityList, setShowCityList] = useState(false) // 是否显示城市列表

  useEffect(() => {
    fetchAllRecommendations()
  }, [origin])

  const fetchAllRecommendations = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // 并行请求三个推荐列表，传递出发地参数
      const [weekData, monthData, popularData] = await Promise.all([
        fetchRecommendations('week', origin),
        fetchRecommendations('month', origin),
        fetchRecommendations('popular', origin)
      ])
      
      // 添加调试日志
      console.log('获取到的数据:', { weekData, monthData, popularData })
      console.log('本周推荐数量:', weekData?.length)
      
      setWeekRecommendations(weekData || [])
      setMonthRecommendations(monthData || [])
      setPopularRecommendations(popularData || [])
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
            <div className="flex items-center gap-3">
              {/* 出发地选择器 - 两级选择（先选省后选市） */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowOriginSelector(!showOriginSelector)
                    setShowCityList(false)
                    // 根据当前城市找到对应的省份
                    const currentProvince = provincesAndCities.find(p => 
                      p.cities.some(c => c.name === origin)
                    )
                    if (currentProvince) {
                      setSelectedProvince(currentProvince.name)
                    }
                  }}
                  className="text-sm sm:text-base text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors border border-gray-200 flex items-center gap-2"
                >
                  <span>📍 出发地：{origin}</span>
                  <span className="text-xs">▼</span>
                </button>
                {/* 两级下拉菜单 */}
                {showOriginSelector && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => {
                        setShowOriginSelector(false)
                        setShowCityList(false)
                      }}
                    />
                    <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-30 flex">
                      {/* 省份列表 */}
                      <div className="w-32 border-r border-gray-200 max-h-96 overflow-y-auto">
                        <div className="p-2 bg-gray-50 border-b border-gray-200 sticky top-0">
                          <div className="text-xs font-semibold text-gray-600">选择省份</div>
                        </div>
                        {provincesAndCities.map((province) => (
                          <button
                            key={province.name}
                            onClick={() => {
                              setSelectedProvince(province.name)
                              setShowCityList(true)
                              // 如果省份只有一个城市，直接选择
                              if (province.cities.length === 1) {
                                setOrigin(province.cities[0].name)
                                setShowOriginSelector(false)
                                setShowCityList(false)
                              }
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                              selectedProvince === province.name ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                            }`}
                          >
                            {province.name}
                          </button>
                        ))}
                      </div>
                      {/* 城市列表 */}
                      {showCityList && (
                        <div className="w-40 max-h-96 overflow-y-auto">
                          <div className="p-2 bg-gray-50 border-b border-gray-200 sticky top-0">
                            <div className="text-xs font-semibold text-gray-600">{selectedProvince}</div>
                          </div>
                          {getCitiesByProvince(selectedProvince).map((city) => (
                            <button
                              key={city.name}
                              onClick={() => {
                                setOrigin(city.name)
                                setShowOriginSelector(false)
                                setShowCityList(false)
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                                origin === city.name ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                              }`}
                            >
                              {city.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <button className="text-sm sm:text-base text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
                筛选
              </button>
            </div>
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
                <RecommendationCard key={rec.id} recommendation={rec} origin={origin} />
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
                <RecommendationCard key={rec.id} recommendation={rec} origin={origin} />
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

