"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 错误内容组件，使用 useSearchParams
function ErrorContent() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] =
    useState<string>("登录过程中发生错误");

  useEffect(() => {
    const error = searchParams.get("error");

    // 根据错误类型设置不同的错误消息
    if (error) {
      switch (error) {
        case "AccessDenied":
          setErrorMessage("访问被拒绝，您没有权限访问此内容");
          break;
        case "Configuration":
          setErrorMessage("认证配置错误，请联系管理员");
          break;
        case "OAuthCallback":
          setErrorMessage("GitHub认证回调失败，请重试");
          break;
        case "OAuthSignin":
          setErrorMessage("无法开始GitHub认证流程");
          break;
        case "OAuthCreateAccount":
          setErrorMessage("无法使用GitHub创建账户");
          break;
        case "AccountNotLinked":
          setErrorMessage("此邮箱已使用其他方式登录，请使用原有登录方式");
          break;
        case "Verification":
          setErrorMessage("验证链接无效或已过期");
          break;
        default:
          setErrorMessage(`登录错误: ${error}`);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="bg-red-100 dark:bg-red-900 rounded-full p-3">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            认证错误
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {errorMessage}
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md 
                      font-medium text-white hover:bg-blue-700 focus:outline-none"
            >
              返回首页
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="/auth/signin"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              重新尝试登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 主组件使用Suspense包裹ErrorContent
export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
