import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

// NextAuth.js API 路由处理程序
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
