import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 这个中间件函数会在每个路由请求之前运行
export function middleware(request: NextRequest) {
    // 这里可以添加路由保护、重定向等逻辑
    return NextResponse.next();
}

// 配置哪些路径应该触发此中间件
export const config = {
    // 匹配需要保护的路径，如管理员页面
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
        // 排除调试相关路径
        '/((?!api/debug|_next/static|_next/image|favicon.ico).*)'
    ],
};
