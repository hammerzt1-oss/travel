'use client'

import HotelCouponCard from '@/components/HotelCouponCard'

export default function HotelCouponsPage() {
  const coupons = [
    {
      price: 69,
      title: "全国惠选酒店通用券",
      description: "覆盖全国多城市 · 性价比之选",
      link: "https://t.ctrip.cn/AlqONib",
      soldCount: 66849
    },
    {
      price: 99,
      title: "全国经济酒店通用券",
      description: "适合出差 / 预算旅行",
      link: "https://t.ctrip.cn/AKW7JvR",
      soldCount: 568756
    },
    {
      price: 129,
      title: "全国悦享酒店通用券",
      description: "品质升级 · 舒适入住",
      link: "https://t.ctrip.cn/tdl7mS5",
      recommended: true,
      soldCount: 107470
    },
    {
      price: 159,
      title: "全国舒适酒店通用券",
      description: "舒适体验 · 商务首选",
      link: "https://t.ctrip.cn/jwrPXEY",
      soldCount: 171279
    },
    {
      price: 199,
      title: "全国优质酒店通用券",
      description: "高端品质 · 尊享体验",
      link: "https://t.ctrip.cn/Bl4YADl",
      soldCount: 262260
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* 页面标题 */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            🏨 酒店优惠券（全国通用）
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            选择适合您的酒店优惠券，全国多城市可用
          </p>
        </div>

        {/* 优惠券卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {coupons.map((coupon, index) => (
            <HotelCouponCard
              key={index}
              price={coupon.price}
              title={coupon.title}
              description={coupon.description}
              link={coupon.link}
              soldCount={coupon.soldCount}
              recommended={coupon.recommended}
            />
          ))}
        </div>

        {/* 使用说明 */}
        <div className="mt-8 sm:mt-12 bg-white rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">使用说明</h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>优惠券全国通用，覆盖多城市酒店</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>点击"立即抢购"跳转到携程官方页面</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>优惠券有效期和使用规则以携程页面为准</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">•</span>
              <span>建议提前预订，确保优惠券可用</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

