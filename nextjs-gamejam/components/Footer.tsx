import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 友情链接部分 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
              关于
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              GameJam看板
              是一个国内收集和展示全球游戏开发比赛的平台，帮助大家可以更快的找到各种有趣的比赛！
              欢迎大家提交国内有趣的比赛！国外比赛见 友情链接qwq
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
              友情链接
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://itch.io/jams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm"
                >
                  itch.io Game Jams
                </a>
              </li>
              <li>
                <a
                  href="https://ldjam.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm"
                >
                  Ludum Dare
                </a>
              </li>
              <li>
                <a
                  href="https://globalgamejam.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm"
                >
                  Global Game Jam
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
              更多资源
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/submit"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm"
                >
                  提交GameJam
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/dogyyds/gamejam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm"
                >
                  GitHub 仓库
                </a>
              </li>
              <li>
                <a
                  href="https://dogxi.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm"
                >
                  关于作者
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 简化版权信息 - 只保留一处 */}
        <div className="pt-6 flex justify-center md:justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              © {currentYear} GameJam 看板
            </span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              发现并参与最佳游戏开发比赛
            </span>
          </div>

          <div className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
            -- 2025.2.27 ❤️ by{" "}
            <a
              href="https://dogxi.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-800 dark:hover:text-gray-300"
            >
              Dogxi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
