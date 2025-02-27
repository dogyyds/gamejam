"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GameJamFormData } from "@/types/gamejam";

export default function SubmitGameJamForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<GameJamFormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    organizer: "",
    imageUrl: "",
    theme: "",
    information: "",
    website: "",
    participantLimit: "noLimit", // 默认无限制
    participantLimitDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
    issueUrl?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "标题不能为空";
    }

    if (!formData.description.trim()) {
      newErrors.description = "描述不能为空";
    }

    if (!formData.startDate) {
      newErrors.startDate = "开始日期不能为空";
    }

    if (!formData.endDate) {
      newErrors.endDate = "结束日期不能为空";
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "结束日期必须晚于开始日期";
    }

    if (!formData.organizer.trim()) {
      newErrors.organizer = "主办方不能为空";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "封面图片URL不能为空";
    } else if (!/^https?:\/\/\S+$/.test(formData.imageUrl)) {
      newErrors.imageUrl = "请输入有效的图片URL（以http或https开头）";
    }

    // 验证参赛人员限制详情
    if (
      formData.participantLimit === "other" &&
      !formData.participantLimitDetails?.trim()
    ) {
      newErrors.participantLimitDetails = "请描述具体的参赛限制";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交表单处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push("/auth/signin?callbackUrl=/submit");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitResult({});

    try {
      const response = await fetch("/api/gamejams/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setSubmitResult({
            success: false,
            message: result.error || "提交失败，请稍后再试",
          });
        }
        return;
      }

      setSubmitResult({
        success: true,
        message: result.message,
        issueUrl: result.issueUrl,
      });

      // 成功后清空表单
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        organizer: "",
        imageUrl: "",
        theme: "",
        information: "", // 替换原来的 rules 和 prizes
        website: "",
        participantLimit: "noLimit", // 默认无限制
        participantLimitDetails: "",
      });

      // 3秒后跳转到首页
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("提交表单时出错:", error);
      setSubmitResult({
        success: false,
        message: "提交时发生错误，请稍后再试",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 输入处理函数
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 如果用户未登录，显示登录提示
  if (!session) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              您需要先登录 Github 才能提交新的GameJam。
              <button
                onClick={() => router.push("/auth/signin?callbackUrl=/submit")}
                className="font-medium underline ml-1 hover:text-yellow-600 dark:hover:text-yellow-100"
              >
                点击登录
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 animate-fadeIn">
      {submitResult.success ? (
        <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700 dark:text-green-200">
                {submitResult.message}
              </p>
              {submitResult.issueUrl && (
                <p className="text-sm text-green-700 dark:text-green-200 mt-2">
                  <a
                    href={submitResult.issueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline hover:text-green-600 dark:hover:text-green-100"
                  >
                    查看您的提交 →
                  </a>
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => setSubmitResult({})}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
          >
            添加另一个GameJam
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            提交新的GameJam
          </h2>

          {submitResult.success === false && (
            <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-200">
                    {submitResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 基本信息部分 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                比赛标题 *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="例如: 48小时像素艺术挑战"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="organizer"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                主办方 *
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                  errors.organizer ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="例如: 游戏开发者协会"
              />
              {errors.organizer && (
                <p className="text-red-500 text-xs mt-1">{errors.organizer}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              比赛描述 *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="简短描述这个比赛的目标和内容..."
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* 日期部分 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                开始日期 *
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                结束日期 *
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* 图片和主题 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                封面图片URL *
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                  errors.imageUrl ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                提供一个公开可访问的图片URL，推荐比例16:9，请使用长期图床
              </p>
            </div>

            <div>
              <label
                htmlFor="theme"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                比赛主题
              </label>
              <input
                type="text"
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="例如: Bubble 或 待公布 或 不限主题"
              />
            </div>
          </div>

          {/* 官网 */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              官方网站
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="https://example.com/gamejam | 没有可填写Q群等 "
            />
          </div>

          {/* 详细信息 (替换原来的规则和奖励) */}
          <div>
            <label
              htmlFor="information"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              比赛信息详情
            </label>
            <textarea
              id="information"
              name="information"
              value={formData.information}
              onChange={handleInputChange}
              rows={10}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="请输入比赛的详细信息，介绍，比赛规则，奖项设置等。支持Markdown格式..."
            ></textarea>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              支持Markdown格式，可以使用# 标题，- 列表项等格式化文本
            </p>
          </div>

          {/* 参赛人员限制 */}
          <div>
            <label
              htmlFor="participantLimit"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              参赛人员限制
            </label>
            <select
              id="participantLimit"
              name="participantLimit"
              value={formData.participantLimit}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            >
              <option value="noLimit">全年龄无限制</option>
              <option value="studentsOnly">仅限学生</option>
              <option value="ageRestricted">有年龄限制</option>
              <option value="other">其他限制</option>
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              选择参赛者的限制类型
            </p>
          </div>

          {formData.participantLimit !== "noLimit" && (
            <div>
              <label
                htmlFor="participantLimitDetails"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                参赛限制详情
              </label>
              <textarea
                id="participantLimitDetails"
                name="participantLimitDetails"
                value={formData.participantLimitDetails}
                onChange={handleInputChange}
                rows={3}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                  errors.participantLimitDetails
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  formData.participantLimit === "studentsOnly"
                    ? "例如：仅限大学生、需要提供学生证明等"
                    : formData.participantLimit === "ageRestricted"
                    ? "例如：参赛者年龄需在18岁以上"
                    : "请描述具体的参赛限制..."
                }
              ></textarea>
              {errors.participantLimitDetails && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.participantLimitDetails}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 
                       transition-colors duration-300 transform hover:scale-105 active:scale-95
                       disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
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
                  提交中...
                </span>
              ) : (
                "提交新GameJam"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
