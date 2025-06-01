import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { WebsiteStructuredData } from "@/components/StructuredData";

// 使用 Inter 字体
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gamejam.dogxi.me"),
  title: {
    default: "GameJam 看板 | 游戏开发比赛、游戏制作大赛",
    template: "%s | GameJam看板",
  },
  description:
    "浏览正在进行、即将到来和已经结束的游戏开发比赛，发现独立游戏创作机会",
  keywords: [
    "GameJam",
    "游戏开发",
    "游戏比赛",
    "游戏制作大赛",
    "独立游戏",
    "游戏开发者",
    "游戏设计",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://gamejam.dogxi.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <meta name="author" content="Dogxi" />
        <link rel="canonical" href="https://gamejam.dogxi.me" />
        <WebsiteStructuredData />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Providers>
          {/* 添加通知黄条 */}
          <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 px-4 py-3 text-center font-medium shadow-sm sticky top-0 z-20">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 mr-2 flex-shrink-0"
              >
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <span>非常抱歉，本网站已停止继续更新，为了给大家一个更好的平台，决定增加更丰富功能重构，本网站仅存档纪念</span>
            </div>
          </div>
          
          <div className="flex flex-col min-h-screen">
            {/* 主体内容 */}
            <main className="flex-grow">{children}</main>
            {/* 添加页脚 */}
            <Footer />
            {/* 回到顶部按钮 */}
            <ScrollToTopButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}