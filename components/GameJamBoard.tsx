"use client";

import { useState, useEffect } from "react";
import { GameJam } from "@/types/gamejam";
import GameJamCard from "./GameJamCard";
import GameJamModal from "./GameJamModal";
import BackgroundPattern from "./BackgroundPattern";
import LoadingAnimation from "./LoadingAnimation";

export default function GameJamBoard() {
  const [selectedGameJam, setSelectedGameJam] = useState<GameJam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    ongoing: GameJam[];
    upcoming: GameJam[];
    completed: GameJam[];
  }>({
    ongoing: [],
    upcoming: [],
    completed: [],
  });

  useEffect(() => {
    async function fetchGameJams() {
      try {
        setLoading(true);
        // 从API获取GameJam数据
        const response = await fetch("/api/gamejams");

        if (!response.ok) {
          throw new Error("无法加载数据，请稍后再试");
        }

        const result = await response.json();

        if (result.categorized) {
          setData({
            ongoing: result.categorized.ongoing || [],
            upcoming: result.categorized.upcoming || [],
            completed: result.categorized.completed || [],
          });
        } else {
          setError("数据格式不正确");
        }
      } catch (err: any) {
        setError(err.message || "加载比赛数据时出现错误");
        console.error("加载GameJam数据失败:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGameJams();
  }, []);

  const handleCardClick = (gamejam: GameJam) => {
    setSelectedGameJam(gamejam);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 my-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            <button
              className="mt-2 text-sm text-red-700 dark:text-red-200 underline"
              onClick={() => window.location.reload()}
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 渲染GameJam卡片的函数
  const renderGameJams = (
    gamejams: GameJam[],
    title: string,
    emptyMessage: string,
    emoji: string
  ) => (
    <div className="mb-12 relative">
      {/* 分类标题 */}
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-2">{emoji}</span>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <div className="ml-3 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400">
          {gamejams.length}个
        </div>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700 ml-4"></div>
      </div>

      {/* GameJam卡片列表 */}
      {gamejams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gamejams.map((gamejam, index) => (
            <div
              key={gamejam.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-slideUp"
            >
              <GameJamCard
                gamejam={gamejam}
                onClick={() => handleCardClick(gamejam)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-500 dark:text-gray-400 p-4 rounded-md text-center">
          {emptyMessage}
        </div>
      )}
    </div>
  );

  return (
    <>
      <BackgroundPattern />

      <div className="relative z-10">
        {renderGameJams(
          data.ongoing,
          "正在进行的比赛",
          "目前没有正在进行的比赛",
          "🔥"
        )}
        {renderGameJams(
          data.upcoming,
          "即将到来的比赛",
          "暂无即将到来的比赛",
          "🚀"
        )}
        {renderGameJams(
          data.completed,
          "已结束的比赛",
          "没有已结束的比赛记录",
          "🏁"
        )}

        {/* 提交新GameJam引导 */}
        <div className="mt-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                没有找到您要的GameJam?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                帮助更多开发者发现优秀的游戏开发比赛，立即提交新的比赛信息。
              </p>
            </div>
            <a
              href="/submit"
              className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-sm flex items-center"
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
              提交新GameJam
            </a>
          </div>
        </div>
      </div>

      <GameJamModal
        gamejam={selectedGameJam}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
