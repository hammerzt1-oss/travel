'use client'

interface HotelCouponCardProps {
  price: number
  title: string
  description: string
  link: string
  recommended?: boolean
}

export default function HotelCouponCard({ 
  price, 
  title, 
  description, 
  link,
  recommended = false 
}: HotelCouponCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 在新窗口打开，确保联盟追踪有效
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
      recommended ? 'border-primary-500 border-dashed' : 'border-transparent'
    }`}>
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
        <p className="text-xs sm:text-sm text-gray-600 mb-4 flex-grow">
          {description}
        </p>

        {/* CTA按钮 */}
        <button
          onClick={handleClick}
          className="cta-button w-full text-center py-2.5 sm:py-3 text-sm sm:text-base"
        >
          立即抢购
        </button>
      </div>
    </div>
  )
}


