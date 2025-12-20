'use client'

import { useRouter } from 'next/navigation'

export default function HotelCouponWidget() {
  const router = useRouter()
  const minPrice = 69

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 跳转到酒店优惠券详情页
    router.push('/hotel-coupons')
  }

  return (
    <div className="mb-4 sm:mb-6">
      {/* 小控件入口 - 第一行，点击跳转到详情页 */}
      <div 
        onClick={handleClick}
        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-3 sm:p-4 cursor-pointer hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl">🏨</span>
            <div>
              <div className="text-sm sm:text-base font-semibold">酒店优惠券（全国通用）</div>
              <div className="text-xs sm:text-sm opacity-90">最低 ¥{minPrice} 起</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm opacity-90">立即查看</span>
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

