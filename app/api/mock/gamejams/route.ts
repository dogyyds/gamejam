import { NextRequest, NextResponse } from "next/server";
import { mockGameJams } from "@/data/mock-data";
import { getGameJamStatus } from "@/data/gamejams";

export async function GET(request: NextRequest) {
    try {
        // 根据状态分类
        const ongoing = mockGameJams.filter(jam => getGameJamStatus(jam) === "ongoing");
        const upcoming = mockGameJams.filter(jam => getGameJamStatus(jam) === "upcoming");
        const completed = mockGameJams.filter(jam => getGameJamStatus(jam) === "completed");

        return NextResponse.json({
            gamejams: mockGameJams,
            categorized: { ongoing, upcoming, completed }
        });
    } catch (error) {
        console.error("获取GameJam数据失败:", error);
        return NextResponse.json(
            { error: "获取数据失败" },
            { status: 500 }
        );
    }
}
