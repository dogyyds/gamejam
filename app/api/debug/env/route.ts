import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    // 安全地检查环境变量是否存在，而不暴露具体内容
    const envStatus = {
        NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        GITHUB_CLIENT_ID: !!process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: !!process.env.GITHUB_CLIENT_SECRET,
        GITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
        GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER,
        GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME,
        ADMIN_USERS: process.env.ADMIN_USERS?.split(',').map(email => email.trim()),
        isAuthenticated: !!session,
        isAdmin: !!session?.user?.isAdmin,
        userEmail: session?.user?.email || null,
    };

    return NextResponse.json(envStatus);
}
