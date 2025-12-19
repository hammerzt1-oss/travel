/**
 * 城市封面占位图渐变背景配置
 * 为每个城市分配不同的渐变颜色，确保视觉区分度
 */

export interface CityGradient {
  from: string
  to: string
  name: string
}

// 城市渐变背景映射
const cityGradients: Record<string, CityGradient> = {
  '杭州': { from: 'from-blue-500', to: 'to-cyan-500', name: '杭州' },
  '苏州': { from: 'from-green-500', to: 'to-emerald-500', name: '苏州' },
  '南京': { from: 'from-purple-500', to: 'to-pink-500', name: '南京' },
  '北京': { from: 'from-red-500', to: 'to-orange-500', name: '北京' },
  '上海': { from: 'from-indigo-500', to: 'to-purple-500', name: '上海' },
  '成都': { from: 'from-yellow-500', to: 'to-orange-500', name: '成都' },
  '重庆': { from: 'from-rose-500', to: 'to-pink-500', name: '重庆' },
  '西安': { from: 'from-amber-500', to: 'to-yellow-500', name: '西安' },
  '厦门': { from: 'from-teal-500', to: 'to-cyan-500', name: '厦门' },
  '青岛': { from: 'from-blue-400', to: 'to-blue-600', name: '青岛' },
  '武汉': { from: 'from-violet-500', to: 'to-purple-500', name: '武汉' },
  '长沙': { from: 'from-orange-500', to: 'to-red-500', name: '长沙' },
  '广州': { from: 'from-green-400', to: 'to-green-600', name: '广州' },
  '深圳': { from: 'from-cyan-500', to: 'to-blue-500', name: '深圳' },
  '天津': { from: 'from-pink-500', to: 'to-rose-500', name: '天津' },
  '大连': { from: 'from-sky-500', to: 'to-blue-500', name: '大连' },
  '昆明': { from: 'from-emerald-500', to: 'to-teal-500', name: '昆明' },
  '桂林': { from: 'from-lime-500', to: 'to-green-500', name: '桂林' },
  '丽江': { from: 'from-fuchsia-500', to: 'to-pink-500', name: '丽江' },
  '三亚': { from: 'from-cyan-400', to: 'to-blue-500', name: '三亚' },
}

/**
 * 获取城市的渐变背景配置
 * @param cityName 城市名称
 * @returns 渐变背景配置
 */
export function getCityGradient(cityName: string): CityGradient {
  return cityGradients[cityName] || {
    from: 'from-gray-500',
    to: 'to-gray-600',
    name: cityName
  }
}

/**
 * 检查图片是否存在
 * @param imagePath 图片路径
 * @returns 是否使用占位图
 */
export function shouldUsePlaceholder(imagePath: string | null | undefined): boolean {
  if (!imagePath) return true
  // 如果图片路径是占位图路径，或者图片加载失败，使用占位图
  return imagePath.includes('placeholder') || imagePath === ''
}


