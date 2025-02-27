"use client";

import { useState } from "react";

export default function AdminTools() {
  const [syncStatus, setSyncStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    error?: string;
  }>({ loading: false });

  const handleSyncData = async () => {
    try {
      setSyncStatus({ loading: true });

      const response = await fetch("/api/admin/sync", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "同步失败");
      }

      setSyncStatus({
        loading: false,
        success: true,
        message: data.message || "同步成功",
      });

      // 5秒后清除消息
      setTimeout(() => {
        setSyncStatus((prev) => ({
          ...prev,
          success: undefined,
          message: undefined,
        }));
      }, 5000);
    } catch (error: any) {
      console.error("同步数据失败:", error);
      setSyncStatus({
        loading: false,
        success: false,
        error: error.message || "操作失败，请重试",
      });
    }
  };

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        管理工具
      </h2>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSyncData}
          disabled={syncStatus.loading}
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {syncStatus.loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              同步中...
            </>
          ) : (
            <>
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              同步GitHub数据
            </>
          )}
        </button>

        {/* 添加其他管理工具按钮 */}
      </div>

      {syncStatus.success === true && syncStatus.message && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4">
          <p className="text-green-700 dark:text-green-200">
            {syncStatus.message}
          </p>
        </div>
      )}

      {syncStatus.success === false && syncStatus.error && (
        <div className="mt-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
          <p className="text-red-700 dark:text-red-200">{syncStatus.error}</p>
        </div>
      )}
    </div>
  );
}
