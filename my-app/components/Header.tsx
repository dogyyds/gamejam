"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">🎮</span>
                GameJam 看板
              </span>
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>

          {/* 桌面导航菜单 */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100
                      dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              首页
            </Link>
            <Link
              href="/submit"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100
                      dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              提交GameJam
            </Link>

            {session?.user?.isAdmin && (
              <Link
                href="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200
                        dark:bg-amber-900/60 dark:text-amber-200 dark:hover:bg-amber-900 transition-colors"
              >
                管理员
              </Link>
            )}

            {session ? (
              <div className="relative ml-3 group">
                <button className="flex items-center text-sm focus:outline-none">
                  <span className="sr-only">打开用户菜单</span>
                  {session.user.image ? (
                    <Image
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                      src={session.user.image}
                      alt=""
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {session.user.name?.[0] || "U"}
                    </div>
                  )}
                </button>

                <div
                  className="hidden group-hover:block absolute right-0 mt-2 w-48 rounded-md shadow-lg 
                            py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">
                    {session.user.name && (
                      <p className="font-medium">{session.user.name}</p>
                    )}
                    {session.user.email && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                  <Link
                    href="/auth/signout"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    退出登录
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700
                        dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600 transition-colors"
              >
                登录
              </Link>
            )}

            {/* 个人主页链接 - 移到登录按钮右边并只保留图标 */}
            <a
              href="https://dogxi.me"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Dogxi的个人主页"
            >
              <div className="w-5 h-5 text-gray-600 dark:text-gray-400">
                <img src="/dog.svg" alt="Dogxi" className="w-full h-full" />
              </div>
            </a>
          </div>
        </div>

        {/* 移动端菜单 */}
        {menuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100
                      dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/submit"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100
                      dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                提交GameJam
              </Link>

              {session?.user?.isAdmin && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-amber-100 text-amber-800 hover:bg-amber-200
                          dark:bg-amber-900/60 dark:text-amber-200 dark:hover:bg-amber-900"
                  onClick={() => setMenuOpen(false)}
                >
                  管理员
                </Link>
              )}
              {session ? (
                <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center px-3">
                    {session.user.image ? (
                      <div className="flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                          src={session.user.image}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {session.user.name?.[0] || "U"}
                      </div>
                    )}
                    <div className="ml-3">
                      {session.user.name && (
                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                          {session.user.name}
                        </div>
                      )}
                      {session.user.email && (
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {session.user.email}
                        </div>
                      )}
                    </div>
                    {/* 在手机版中添加个人主页图标 */}
                    <a
                      href="https://dogxi.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <div className="w-5 h-5 text-gray-600 dark:text-gray-400">
                        <img
                          src="/dog.svg"
                          alt="DogXi"
                          className="w-full h-full"
                        />
                      </div>
                    </a>
                  </div>
                  <div className="mt-3 px-2">
                    <Link
                      href="/auth/signout"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100
                            dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      退出登录
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Link
                    href="/auth/signin"
                    className="block mt-2 px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700
                          dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    登录
                  </Link>
                  {/* 手机版未登录状态下的个人主页图标 */}
                  <a
                    href="https://dogxi.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <div className="w-5 h-5 text-gray-600 dark:text-gray-400">
                      <img
                        src="/dog.svg"
                        alt="DogXi"
                        className="w-full h-full"
                      />
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
