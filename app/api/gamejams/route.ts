import { NextRequest, NextResponse } from "next/server";
import { fetchGameJamData } from "@/lib/github";
import { getGameJamStatus } from "@/data/gamejams";

export async function GET(req: NextRequest) {
    try {
        // 从GitHub获取数据
        const gamejams = await fetchGameJamData();

        // 筛选和排序逻辑
        const statusParam = req.nextUrl.searchParams.get("status");

        if (statusParam) {
            // 如果指定了状态参数，则过滤出符合条件的数据
            const filteredJams = gamejams.filter(
                jam => getGameJamStatus(jam) === statusParam
            );

            return NextResponse.json({ gamejams: filteredJams });
        }

        // 按状态分组
        const ongoing = gamejams.filter(jam => getGameJamStatus(jam) === "ongoing");
        const upcoming = gamejams.filter(jam => getGameJamStatus(jam) === "upcoming");
        const completed = gamejams.filter(jam => getGameJamStatus(jam) === "completed");

        return NextResponse.json({
            gamejams,
            categorized: { ongoing, upcoming, completed }
        });
    } catch (error) {
        console.error("获取GameJam数据失败:", error);

        // 如果出错，回退到mock数据
        return NextResponse.json({ gamejams: [] });
    }
}
