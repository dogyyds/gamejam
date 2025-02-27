import React from "react";

// 创建一个更好看的加载动画组件，替代之前的骨架屏
export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* 主动画 */}
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 dark:border-blue-400 rounded-full animate-spin border-t-transparent"></div>

        {/* 中心装饰 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">
          🎮
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          正在加载
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          请稍候，正在获取GameJam数据...
        </p>

        {/* 进度点动画 */}
        <div className="flex space-x-2 mt-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 opacity-0"
              style={{
                animation: `pulseOpacity 1.5s infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseOpacity {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
