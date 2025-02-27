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
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
