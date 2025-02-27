import React from "react";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 左上角装饰图案 */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl animate-float-slow" />

      {/* 右上角装饰图案 */}
      <div className="absolute -top-12 -right-12 w-72 h-72 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl animate-float" />

      {/* 底部中央装饰图案 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-400/5 dark:via-indigo-400/5 dark:to-purple-400/5 rounded-[100%] blur-3xl animate-float-delay" />

      {/* 格子背景 */}
      <div className="absolute inset-0 bg-[url('/grid-light.svg')] dark:bg-[url('/grid-dark.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </div>
  );
}
