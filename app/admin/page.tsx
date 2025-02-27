import { Metadata } from "next";
import Header from "@/components/Header";
import AdminReviewPanel from "@/components/AdminReviewPanel";
import AdminTools from "@/components/AdminTools";
import { getAuthSession, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "管理员面板 | GameJam看板",
  description: "审核和管理GameJam提交",
};

export default async function AdminPage() {
  // 服务器端权限检查
  const session = await getAuthSession();
  const hasAccess = await isAdmin();

  if (!session || !hasAccess) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            管理员面板
          </h1>
          <span className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-3 py-1 rounded-full text-sm font-medium">
            管理员
          </span>
        </div>

        {/* 添加管理员工具 */}
        <AdminTools />

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              待审核提交
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              --
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              已发布GameJam
            </h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              --
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              已拒绝提交
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              --
            </p>
          </div>
        </div>

        <AdminReviewPanel />
      </main>
    </div>
  );
}
