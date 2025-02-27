"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countDown, setCountDown] = useState(3);

  useEffect(() => {
    const handleSignOut = async () => {
      setIsSigningOut(true);
      try {
        await signOut({ redirect: false });

        // 成功退出后倒计时返回首页
        const timer = setInterval(() => {
          setCountDown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              window.location.href = "/";
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (err: any) {
        console.error("登出失败:", err);
        setError(err.message || "登出过程中发生错误");
        setIsSigningOut(false);
      }
    };

    handleSignOut();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {isSigningOut && !error ? "已成功登出" : "登出账户"}
          </h1>

          {error ? (
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md mb-6">
              <p className="text-red-600 dark:text-red-200">{error}</p>
            </div>
          ) : isSigningOut ? (
            <>
              <div className="mb-6 text-gray-600 dark:text-gray-300">
                您已成功退出登录，{countDown} 秒后将自动返回首页。
              </div>
              <div className="animate-pulse w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </>
          ) : (
            <div className="animate-spin w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full mx-auto mb-6"></div>
          )}

          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              立即返回首页
            </Link>

            <Link
              href="/auth/signin"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              重新登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
