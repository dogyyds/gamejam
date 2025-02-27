import type { NextAuthOptions } from "next-auth";
import type { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth/next";

// 管理员邮箱列表
const adminEmails = (process.env.ADMIN_USERS || "").split(",").map(email => email.trim());

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            // 请求额外权限以便用户可以提交内容
            authorization: {
                params: {
                    scope: "read:user user:email repo",
                },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
    },
    callbacks: {
        // 在会话中添加自定义数据（如管理员状态）
        async session({ session, token }) {
            if (session?.user?.email && adminEmails.includes(session.user.email)) {
                session.user.isAdmin = true;
            }

            // 添加GitHub访问令牌到会话中
            if (token?.accessToken) {
                session.accessToken = token.accessToken as string;
            }

            return session;
        },
        // 在JWT令牌中存储额外数据
        async jwt({ token, account }) {
            // 如果是登录或令牌刷新，存储访问令牌
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
};

// 获取当前会话
export async function getAuthSession() {
    return await getServerSession(authOptions);
}

// 检查用户是否为管理员
export async function isAdmin() {
    const session = await getAuthSession();
    return !!session?.user?.isAdmin;
}

// 扩展DefaultSession类型以包含自定义字段
declare module "next-auth" {
    interface Session {
        user: {
            isAdmin?: boolean;
        } & DefaultSession["user"];
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
