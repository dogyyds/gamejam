import React from "react";
import { GameJam } from "@/types/gamejam";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getGameJamStatus } from "@/data/gamejams";

interface GameJamModalProps {
  gamejam: GameJam | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameJamModal({
  gamejam,
  isOpen,
  onClose,
}: GameJamModalProps) {
  if (!gamejam) {
    return null;
  }

  const status = getGameJamStatus(gamejam);

  // 计算GameJam时间
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 计算GameJam持续时间
  const getDuration = () => {
    const start = new Date(gamejam.startDate);
    const end = new Date(gamejam.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    let durationText = "";
    if (diffDays > 0) {
      durationText += `${diffDays} 天 `;
    }
    if (diffHours > 0 || diffDays === 0) {
      durationText += `${diffHours} 小时`;
    }
    return durationText;
  };

  // 获取状态标签颜色
  const getStatusClasses = () => {
    if (status === "upcoming") {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    } else if (status === "ongoing") {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    } else {
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // 获取状态文本
  const getStatusText = () => {
    if (status === "upcoming") {
      return "即将开始";
    } else if (status === "ongoing") {
      return "正在进行";
    } else {
      return "已结束";
    }
  };

  // 获取参赛限制文本
  const getParticipantLimitText = () => {
    if (gamejam.participantLimit === "studentsOnly") {
      return "仅限学生";
    } else if (gamejam.participantLimit === "ageRestricted") {
      return "年龄限制";
    } else if (gamejam.participantLimit === "other") {
      return "特殊限制";
    } else {
      return "全年龄无限制";
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                {/* 头部图片 */}
                <div className="relative h-48 sm:h-64">
                  <img
                    src={gamejam.imageUrl}
                    alt={gamejam.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/800x400?text=No+Image";
                    }}
                  />
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* 关闭按钮 */}
                  <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>

                  {/* 底部标题 */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center mb-1">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClasses()}`}
                      >
                        {getStatusText()}
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                      {gamejam.title}
                    </h1>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="p-4 sm:p-6">
                  {/* 主要信息 */}
                  <div className="mb-6">
                    <p className="text-gray-800 dark:text-gray-200 mb-4 text-base">
                      {gamejam.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          开始时间:
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {formatDate(gamejam.startDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          结束时间:
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {formatDate(gamejam.endDate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          持续时间:
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {getDuration()}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          主办方:
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {gamejam.organizer}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 额外信息 */}
                  <div className="space-y-4 mb-6">
                    {gamejam.theme && (
                      <div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          主题:
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {gamejam.theme}
                        </div>
                      </div>
                    )}

                    {gamejam.website && (
                      <div>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          官方网站:
                        </div>
                        <a
                          href={gamejam.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-medium break-words"
                        >
                          {gamejam.website}
                        </a>
                      </div>
                    )}

                    <div>
                      <div className="text-gray-700 dark:text-gray-300 font-medium">
                        参赛限制:
                      </div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {getParticipantLimitText()}
                      </div>
                    </div>

                    {/* 恢复这部分代码并修复，现在 participantLimitDetails 属性已添加到 GameJam 类型中 */}
                    {gamejam.participantLimit !== "noLimit" &&
                      gamejam.participantLimitDetails && (
                        <>
                          <div className="text-gray-700 dark:text-gray-300 font-medium">
                            限制详情:
                          </div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {gamejam.participantLimitDetails}
                          </div>
                        </>
                      )}
                  </div>

                  {/* 如果有详细信息，显示更多详情部分 */}
                  {gamejam.information && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                        详细信息
                      </h3>
                      <div className="prose dark:prose-invert max-w-none">
                        {/* 增强文本颜色和字体大小 */}
                        <pre
                          className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-850 p-5 rounded-md 
                                    text-gray-900 dark:text-white text-base font-normal leading-relaxed 
                                    overflow-auto max-h-80 border border-gray-100 dark:border-gray-700"
                          style={{ fontFamily: "inherit" }}
                        >
                          {gamejam.information}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* 底部按钮 */}
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={onClose}
                    >
                      关闭
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
