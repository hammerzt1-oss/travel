/**
 * API工具函数
 * 用于与后端API交互
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface Recommendation {
  id: number
  name: string
  tag: string
  budget_range: string
  primary_reason: string
  distance: number | null
  transport: string
  weather: string
  suitable_days: string
  trust_signals: {
    student_count: number
    click_count_7d: number
    is_popular: boolean
    is_student_favorite?: boolean
  }
  cover_image: string
  cta_text: string
  cta_links?: {
    hotel: string
    transport: string
    package: string
  }
}

export interface DestinationDetail {
  id: number
  name: string
  summary: string
  recommend_reasons: string[]
  itinerary: string[]
  budget_range: string
  cover_image?: string // 封面图片路径（可选）
  trust_signals: {
    student_count: number
    click_count_7d: number
    is_popular: boolean
    is_student_favorite?: boolean
  }
  cta_links: {
    hotel: string
    transport: string
    package: string
  }
  weather: {
    current: string
    forecast: string[]
  }
}

export interface Attraction {
  id: number
  city: string
  name: string
  category: string
  student_ticket: boolean
  price_hint: string
  primary_reason: string
  suitable_days: string
  transport: string
  photo_friendly: boolean
  trust_signals: {
    student_count: number
    is_student_favorite?: boolean
    click_count_7d?: number
  }
  cta_text: string
  cta_link: string
}

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

/**
 * 获取推荐列表
 */
export async function fetchRecommendations(
  type: 'week' | 'month' | 'popular' = 'week',
  origin?: string
): Promise<Recommendation[]> {
  try {
    const params = new URLSearchParams({ type })
    if (origin) {
      params.append('origin', origin)
    }

    const res = await fetch(`${API_URL}/api/recommendations?${params.toString()}`)
    const data: ApiResponse<{ list: Recommendation[] }> = await res.json()

    if (data.code === 200 && data.data?.list) {
      return data.data.list
    }

    throw new Error(data.message || '获取推荐失败')
  } catch (error) {
    console.error('获取推荐列表失败:', error)
    throw error
  }
}

/**
 * 获取目的地详情
 */
export async function fetchDestinationDetail(
  id: string | number,
  origin?: string
): Promise<DestinationDetail> {
  try {
    const params = new URLSearchParams()
    if (origin) {
      params.append('origin', origin)
    }

    const queryString = params.toString()
    const url = `${API_URL}/api/destinations/${id}${queryString ? `?${queryString}` : ''}`

    const res = await fetch(url)
    const data: ApiResponse<DestinationDetail> = await res.json()

    if (data.code === 200 && data.data) {
      return data.data
    }

    throw new Error(data.message || '获取目的地详情失败')
  } catch (error) {
    console.error('获取目的地详情失败:', error)
    throw error
  }
}

