import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="smallGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      {/* 浮动装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute bottom-10 left-1/4 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* 内容 */}
      <div className="relative max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            发现最佳<span className="text-yellow-300">游戏开发比赛</span>
            <br></br>与<span className="text-yellow-300">GameJam</span>活动
          </h1>
          <p className="mt-4 max-w-md mx-auto md:mx-0 text-base text-blue-100 sm:text-lg">
            浏览全球各地最新的
            <strong className="text-white">GameJam活动</strong>、
            <strong className="text-white">游戏制作大赛</strong>
            ，展示您的创意，结识同行
            <strong className="text-white">游戏开发者</strong>
          </p>

          {/* 关键词标签 - 既美观又有助于SEO */}
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            <span className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-blue-100">
              游戏开发
            </span>
            <span className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-blue-100">
              独立游戏
            </span>
            <span className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-blue-100">
              游戏制作
            </span>
            <span className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-blue-100">
              创意编程
            </span>
            <span className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-blue-100">
              开发者社区
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              href="#ongoing"
              scroll={true}
              className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-800 bg-white hover:bg-gray-100 shadow-sm transition-all hover:shadow-md hover:scale-105"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
              浏览比赛
            </Link>
            <Link
              href="/submit"
              className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 shadow-sm transition-all hover:shadow-md hover:scale-105"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              提交GameJam
            </Link>
          </div>
        </div>

        {/* 右侧装饰图形 */}
        <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white/10 backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* 装饰波浪 */}
      <div className="relative h-12 sm:h-24">
        <svg
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 128"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,74.7C672,96,768,128,864,122.7C960,117,1056,75,1152,64C1248,53,1344,75,1392,85.3L1440,96L1440,128L1392,128C1344,128,1248,128,1152,128C1056,128,960,128,864,128C768,128,672,128,576,128C480,128,384,128,288,128C192,128,96,128,48,128L0,128Z"
            className="dark:fill-gray-900"
          ></path>
        </svg>
      </div>
    </div>
  );
}
