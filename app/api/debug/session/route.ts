import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

// 一个用于调试会话的端点
export async function GET() {
    const session = await getAuthSession();

    // 为安全起见，不要返回完整的会话数据
    if (!session) {
        return NextResponse.json({ authenticated: false });
    }

    // 返回有限的会话信息，隐藏敏感数据
    return NextResponse.json({
        authenticated: true,
        user: {
            name: session.user?.name,
            email: session.user?.email,
            isAdmin: session.user?.isAdmin,
            // 移除尝试访问不存在的id属性
        },
        expires: session.expires,
        // 仅显示token是否存在，不显示token内容
        hasToken: !!session.accessToken
    });
}
