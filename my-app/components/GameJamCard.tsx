import { GameJam } from "@/types/gamejam";
import { getGameJamStatus } from "@/data/gamejams";
import { useState } from "react";

interface GameJamCardProps {
  gamejam: GameJam;
  onClick: () => void;
  highlight?: boolean;
}

export default function GameJamCard({
  gamejam,
  onClick,
  highlight = false,
}: GameJamCardProps) {
  const [imgError, setImgError] = useState(false);
  const status = getGameJamStatus(gamejam);

  // 根据状态设置不同的样式
  const statusStyles = {
    upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    ongoing:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };

  const statusText = {
    upcoming: "即将开始",
    ongoing: "正在进行",
    completed: "已结束",
  };

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 是否高亮卡片（正在进行中的活动或传入highlight=true）
  const isHighlighted = highlight || status === "ongoing";

  // 获取参赛限制标签颜色和文本
  const getLimitStyles = () => {
    switch (gamejam.participantLimit) {
      case "studentsOnly":
        return {
          bg: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          text: "仅限学生",
        };
      case "ageRestricted":
        return {
          bg: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          text: "年龄限制",
        };
      case "other":
        return {
          bg: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
          text: "特殊限制",
        };
      default:
        return { bg: "", text: "" };
    }
  };

  const limitInfo = getLimitStyles();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden 
                 card-hover-effect ${
                   isHighlighted ? "glow-border" : "shadow-md"
                 } 
                 animate-fadeIn cursor-pointer relative`}
      onClick={onClick}
    >
      <div className="relative h-36">
        {imgError ? (
          // 如果图片加载失败，显示占位图
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <span className="text-4xl">🎮</span>
          </div>
        ) : (
          <div className="w-full h-full overflow-hidden">
            <img
              src={gamejam.imageUrl}
              alt={gamejam.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        )}

        {/* 装饰效果 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

        {/* 参赛限制标签 - 左上角显示限制类型 */}
        {gamejam.participantLimit !== "noLimit" && (
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium
                     ${limitInfo.bg}
                     shadow-sm transform transition-all duration-300 hover:scale-105`}
            title={gamejam.participantLimitDetails || limitInfo.text}
          >
            {limitInfo.text}
          </div>
        )}

        {/* 状态标签 */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium
                     ${statusStyles[status as keyof typeof statusStyles]}
                     shadow-sm transform transition-all duration-300 hover:scale-105`}
        >
          {statusText[status as keyof typeof statusText]}
        </div>

        {/* 底部显示日期 */}
        <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          {formatDate(gamejam.startDate)
            .replace("年", "/")
            .replace("月", "/")
            .replace("日", "")}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-1 flex-grow">
            {gamejam.title}
          </h3>
          {status === "ongoing" && (
            <span className="relative flex h-3 w-3 ml-1 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          )}
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
          {gamejam.description}
        </p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="truncate max-w-[120px]">{gamejam.organizer}</span>
          </div>
          {gamejam.theme && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
              {gamejam.theme}
            </span>
          )}
        </div>
      </div>

      {/* 鼠标悬停时显示的查看详情提示 */}
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <span className="text-white font-medium px-4 py-2 rounded-lg bg-blue-600/80 backdrop-blur-sm">
          查看详情
        </span>
      </div>
    </div>
  );
}
