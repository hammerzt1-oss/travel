'use client'

import { useState } from 'react'
import HotelCouponCard from './HotelCouponCard'

export default function HotelCouponWidget() {
  const [isExpanded, setIsExpanded] = useState(false)

  const coupons = [
    {
      price: 69,
      title: "全国惠选酒店通用券",
      description: "覆盖全国多城市 · 性价比之选",
      link: "https://t.ctrip.cn/AlqONib"
    },
    {
      price: 99,
      title: "全国经济酒店通用券",
      description: "适合出差 / 预算旅行",
      link: "https://t.ctrip.cn/AKW7JvR"
    },
    {
      price: 129,
      title: "全国悦享酒店通用券",
      description: "品质升级 · 舒适入住",
      link: "https://t.ctrip.cn/tdl7mS5",
      recommended: true
    },
    {
      price: 159,
      title: "全国舒适酒店通用券",
      description: "舒适体验 · 商务首选",
      link: "https://t.ctrip.cn/jwrPXEY"
    },
    {
      price: 199,
      title: "全国优质酒店通用券",
      description: "高端品质 · 尊享体验",
      link: "https://t.ctrip.cn/Bl4YADl"
    }
  ]

  const minPrice = Math.min(...coupons.map(c => c.price))

  return (
    <div className="mb-4 sm:mb-6">
      {/* 小控件入口 - 第一行 */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-3 sm:p-4 cursor-pointer hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
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
            <span className="text-xs sm:text-sm opacity-90">点击查看详情</span>
            <svg 
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* 详情展开区域 */}
      {isExpanded && (
        <div className="mt-4 sm:mt-6 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {coupons.map((coupon, index) => (
              <HotelCouponCard
                key={index}
                price={coupon.price}
                title={coupon.title}
                description={coupon.description}
                link={coupon.link}
                recommended={coupon.recommended}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

