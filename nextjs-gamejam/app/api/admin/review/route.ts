import { NextRequest, NextResponse } from "next/server";
import { reviewGameJamSubmission, getPendingGameJamSubmissions } from "@/lib/github";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/auth";

// 获取待审核的提交
export async function GET(req: NextRequest) {
    try {
        // 检查管理员权限
        if (!await isAdmin()) {
            return NextResponse.json(
                { error: "需要管理员权限" },
                { status: 403 }
            );
        }

        const pendingSubmissions = await getPendingGameJamSubmissions();

        return NextResponse.json({ submissions: pendingSubmissions });
    } catch (error) {
        console.error("获取待审核提交失败:", error);
        return NextResponse.json(
            { error: "获取数据失败" },
            { status: 500 }
        );
    }
}

// 处理审核操作
export async function POST(req: NextRequest) {
    try {
        // 检查管理员权限
        if (!await isAdmin()) {
            return NextResponse.json(
                { error: "需要管理员权限" },
                { status: 403 }
            );
        }

        const data = await req.json();

        // 验证必要参数
        if (!data.issueNumber || data.approve === undefined) {
            return NextResponse.json(
                { error: "缺少必要参数" },
                { status: 400 }
            );
        }

        // 执行审核
        const result = await reviewGameJamSubmission(
            data.issueNumber,
            data.approve === true
        );

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "审核操作失败" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: data.approve ? "已批准并发布" : "已拒绝提交"
        });
    } catch (error) {
        console.error("审核操作失败:", error);
        return NextResponse.json(
            { error: "处理审核失败" },
            { status: 500 }
        );
    }
}
