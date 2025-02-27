"use client"; // 添加客户端指令

import Link from "next/link";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />

      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-500">
            404
          </h1>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            页面未找到
          </h2>

          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            抱歉，我们找不到您请求的页面。可能页面已被移除、名称已更改或暂时不可用。
          </p>

          <div className="mt-8 flex justify-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              返回首页
            </Link>

            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900 focus:outline-none"
            >
              返回上一页
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            您可能在寻找:
          </h3>

          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GameJam 首页
              </Link>
            </li>
            <li>
              <Link
                href="/submit"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                提交新的 GameJam
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
