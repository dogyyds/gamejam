"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Submission = {
  issueNumber: number;
  issueUrl: string;
  title: string;
  createdAt: string;
  creator?: string;
  submissionData: any;
};

export default function AdminReviewPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<{
    issueNumber: number;
    action: "approve" | "reject";
  } | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/review");

      if (!response.ok) {
        throw new Error("获取提交信息失败");
      }

      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (err: any) {
      console.error("获取提交失败:", err);
      setError(err.message || "无法加载提交信息");
    } finally {
      setLoading(false);
    }
  }

  const handleApprove = async (issueNumber: number) => {
    await handleReview(issueNumber, true);
  };

  const handleReject = async (issueNumber: number) => {
    await handleReview(issueNumber, false);
  };

  const handleReview = async (issueNumber: number, approve: boolean) => {
    try {
      setCurrentAction({
        issueNumber,
        action: approve ? "approve" : "reject",
      });

      const response = await fetch("/api/admin/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueNumber, approve }),
      });

      if (!response.ok) {
        throw new Error(`操作失败: ${approve ? "批准" : "拒绝"}`);
      }

      // 成功后移除该提交
      setSubmissions((prev) =>
        prev.filter((s) => s.issueNumber !== issueNumber)
      );
    } catch (err: any) {
      console.error("审核操作失败:", err);
      alert(`审核操作失败: ${err.message}`);
    } finally {
      setCurrentAction(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("zh-CN");
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          审核提交的GameJam
        </h2>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          审核提交的GameJam
        </h2>
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          审核提交的GameJam
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-md text-center">
          <p className="text-gray-500 dark:text-gray-400">
            目前没有待审核的GameJam提交
          </p>
          <button
            onClick={fetchSubmissions}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            刷新
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
        审核提交的GameJam
        <span className="ml-2 text-sm px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
          {submissions.length}个待审核
        </span>
      </h2>

      <div className="space-y-6">
        {submissions.map((submission) => (
          <div
            key={submission.issueNumber}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <Tabs defaultValue="details">
              <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {submission.title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    #{submission.issueNumber} 由 {submission.creator || "匿名"}{" "}
                    提交于 {formatDate(submission.createdAt)}
                  </div>
                </div>
                <TabsList>
                  <TabsTrigger value="details">详情</TabsTrigger>
                  <TabsTrigger value="data">数据</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="details" className="p-4">
                {submission.submissionData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="aspect-video relative overflow-hidden rounded-md">
                        {submission.submissionData.imageUrl ? (
                          <img
                            src={submission.submissionData.imageUrl}
                            alt={submission.submissionData.title}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/640x360?text=图片加载失败";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            <span className="text-gray-400">无图片</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            标题:
                          </span>
                          <p>{submission.submissionData.title}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            描述:
                          </span>
                          <p>{submission.submissionData.description}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            主办方:
                          </span>
                          <p>{submission.submissionData.organizer}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            时间:
                          </span>
                          <p>
                            {new Date(
                              submission.submissionData.startDate
                            ).toLocaleDateString()}{" "}
                            至{" "}
                            {new Date(
                              submission.submissionData.endDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        {submission.submissionData.theme && (
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              主题:
                            </span>
                            <p>{submission.submissionData.theme}</p>
                          </div>
                        )}
                        {submission.submissionData.website && (
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              网站:
                            </span>
                            <a
                              href={submission.submissionData.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {submission.submissionData.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-yellow-600 dark:text-yellow-400">
                    无法解析提交数据
                  </div>
                )}
              </TabsContent>

              <TabsContent value="data" className="p-4">
                <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto text-xs text-gray-800 dark:text-gray-200 max-h-96">
                  {JSON.stringify(submission.submissionData, null, 2)}
                </pre>
              </TabsContent>

              <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 flex justify-end space-x-3">
                <a
                  href={submission.issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm"
                >
                  查看GitHub Issue
                </a>
                <button
                  onClick={() => handleReject(submission.issueNumber)}
                  disabled={!!currentAction}
                  className="px-4 py-2 border border-red-300 text-red-700 dark:border-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentAction?.issueNumber === submission.issueNumber &&
                  currentAction?.action === "reject"
                    ? "处理中..."
                    : "拒绝"}
                </button>
                <button
                  onClick={() => handleApprove(submission.issueNumber)}
                  disabled={!!currentAction}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentAction?.issueNumber === submission.issueNumber &&
                  currentAction?.action === "approve"
                    ? "处理中..."
                    : "批准"}
                </button>
              </div>
            </Tabs>
          </div>
        ))}
      </div>
    </div>
  );
}
