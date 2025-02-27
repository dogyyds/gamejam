import GameJamBoard from "@/components/GameJamBoard";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GameJam 看板 | 游戏开发比赛、游戏制作大赛、独立游戏开发",
  description:
    "GameJam 看板是一站式浏览、提交和参与全球游戏开发比赛的平台。发现最新GameJam活动、游戏制作大赛、独立游戏开发竞赛，展示您的游戏创意，结识同行开发者。",
  keywords: [
    "GameJam",
    "游戏开发",
    "游戏比赛",
    "游戏制作大赛",
    "游戏创作",
    "独立游戏",
    "游戏开发者",
    "游戏设计",
    "游戏创意",
    "编程比赛",
    "开发者社区",
  ],
  openGraph: {
    title: "GameJam 看板 | 发现精彩游戏开发比赛与创作活动",
    description:
      "浏览全球各地最新的GameJam活动、游戏制作大赛，展示您的创意，结识游戏开发者，参与独立游戏创作。",
    url: "https://gamejam.dogxi.me",
    siteName: "GameJam 看板 - 游戏开发比赛资源平台",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "GameJam 看板 - 游戏开发比赛预览图",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameJam 看板 | 游戏开发比赛、创作活动",
    description: "发现和参与全球GameJam游戏开发比赛，展示游戏创意，结识开发者",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://gamejam.dogxi.me",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />

      <main
        id="ongoing"
        className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      >
        <GameJamBoard />
      </main>
    </div>
  );
}
