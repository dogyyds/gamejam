import { NextRequest, NextResponse } from "next/server";
import { submitGameJamRequest } from "@/lib/github";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// 验证表单数据的函数
function validateFormData(data: any) {
    const errors: Record<string, string> = {};

    if (!data.title || data.title.trim().length < 3) {
        errors.title = "标题至少需要3个字符";
    }

    if (!data.description || data.description.trim().length < 10) {
        errors.description = "描述至少需要10个字符";
    }

    if (!data.startDate) {
        errors.startDate = "开始日期必填";
    }

    if (!data.endDate) {
        errors.endDate = "结束日期必填";
    } else if (new Date(data.endDate) <= new Date(data.startDate)) {
        errors.endDate = "结束日期必须晚于开始日期";
    }

    if (!data.organizer || data.organizer.trim().length < 2) {
        errors.organizer = "主办方名称必填";
    }

    if (!data.imageUrl || !data.imageUrl.match(/^https?:\/\/.+/i)) {
        errors.imageUrl = "请提供有效的图片URL";
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "请先登录" },
                { status: 401 }
            );
        }

        const data = await req.json();

        // 验证表单数据
        const validationErrors = validateFormData(data);
        if (validationErrors) {
            return NextResponse.json(
                { errors: validationErrors },
                { status: 400 }
            );
        }

        // 提交到GitHub Issue
        const result = await submitGameJamRequest(
            data,
            session.accessToken // 使用用户的token提交
        );

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "提交失败" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "GameJam提交成功，等待审核",
            issueUrl: result.issueUrl
        });
    } catch (error) {
        console.error("GameJam提交失败:", error);
        return NextResponse.json(
            { error: "提交处理失败" },
            { status: 500 }
        );
    }
}
