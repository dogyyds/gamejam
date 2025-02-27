import { NextResponse } from "next/server";
import { fetchGameJamData } from "@/lib/github";
import { isAdmin } from "@/lib/auth";

export async function POST() {
    try {
        // 检查管理员权限
        if (!await isAdmin()) {
            return NextResponse.json(
                { error: "需要管理员权限" },
                { status: 403 }
            );
        }

        // 强制刷新GitHub数据
        const gamejams = await fetchGameJamData();

        // 返回同步结果
        return NextResponse.json({
            success: true,
            count: gamejams.length,
            message: `成功同步${gamejams.length}个GameJam数据`
        });
    } catch (error) {
        console.error("同步GitHub数据失败:", error);
        return NextResponse.json(
            { error: "同步失败，请检查控制台日志" },
            { status: 500 }
        );
    }
}
