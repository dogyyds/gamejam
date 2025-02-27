import { Metadata } from "next";
import Header from "@/components/Header";
import SubmitGameJamForm from "@/components/SubmitGameJamForm";
import BackgroundPattern from "@/components/BackgroundPattern";

export const metadata: Metadata = {
  title: "提交GameJam | 游戏开发比赛信息",
  description:
    "提交新的GameJam比赛信息，分享游戏开发活动，帮助更多开发者发现有趣的游戏制作大赛和创作机会",
  keywords: [
    "提交GameJam",
    "游戏比赛提交",
    "游戏开发活动",
    "发布游戏比赛",
    "游戏制作大赛",
    "独立游戏开发",
  ],
};

export default function SubmitPage() {
  return (
    <>
      {/* 背景图案 */}
      <BackgroundPattern />

      <div className="min-h-screen">
        <Header />

        {/* 标题部分 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-white">
                提交GameJam信息
              </h1>
              <p className="mt-2 text-lg text-blue-100">
                帮助开发者发现更多有趣的游戏开发比赛
              </p>
            </div>
          </div>
          {/* 装饰波浪 */}
          <div className="relative h-8">
            <svg
              className="absolute bottom-0 w-full h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 48"
              preserveAspectRatio="none"
            >
              <path
                fill="#f9fafb"
                fillOpacity="1"
                d="M0,32L48,26.7C96,21,192,11,288,16C384,21,480,43,576,42.7C672,43,768,21,864,21.3C960,21,1056,43,1152,42.7C1248,43,1344,21,1392,10.7L1440,0L1440,48L1392,48C1344,48,1248,48,1152,48C1056,48,960,48,864,48C768,48,672,48,576,48C480,48,384,48,288,48C192,48,96,48,48,48L0,48Z"
                className="dark:fill-gray-900"
              ></path>
            </svg>
          </div>
        </div>

        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            提交新的GameJam
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            请填写以下表单提交新的GameJam比赛信息，提交后需要经过审核才会显示在首页。
            请确保提供准确的信息，特别是日期、主办方和官方网站等关键信息。
          </p>
          <SubmitGameJamForm />
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
              提交须知
            </h3>
            <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>提交的比赛信息将公开显示在GameJam看板上</li>
              <li>图片URL必须是可公开访问的地址</li>
              <li>
                若有疑问或需修改已提交的信息，请联系
                <a href="https://dogxi.me">Dogxi</a>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
