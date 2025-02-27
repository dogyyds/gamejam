import { GameJam, GameJamStatus } from "@/types/gamejam";

/**
 * 获取GameJam的状态（即将开始、正在进行、已结束）
 */
export function getGameJamStatus(gamejam: GameJam): GameJamStatus {
    const now = new Date();
    const startDate = new Date(gamejam.startDate);
    const endDate = new Date(gamejam.endDate);

    if (now < startDate) {
        return "upcoming";
    } else if (now > endDate) {
        return "completed";
    } else {
        return "ongoing";
    }
}

/**
 * 计算GameJam的时间状态（即将开始还有X天、进行中还剩X天、已结束X天）
 */
export function getTimeStatus(gamejam: GameJam): string {
    const now = new Date();
    const startDate = new Date(gamejam.startDate);
    const endDate = new Date(gamejam.endDate);
    const status = getGameJamStatus(gamejam);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (status === "upcoming") {
        const daysToStart = Math.ceil((startDate.getTime() - now.getTime()) / millisecondsPerDay);
        return `还有 ${daysToStart} 天开始`;
    } else if (status === "ongoing") {
        const daysToEnd = Math.ceil((endDate.getTime() - now.getTime()) / millisecondsPerDay);
        return `还剩 ${daysToEnd} 天`;
    } else {
        const daysSinceEnd = Math.ceil((now.getTime() - endDate.getTime()) / millisecondsPerDay);
        return `已结束 ${daysSinceEnd} 天`;
    }
}

/**
 * 格式化日期为易读形式
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/**
 * 计算 GameJam 剩余时间（天数）
 */
export function getGameJamRemainingDays(gamejam: GameJam): number | null {
    const now = new Date();
    const startDate = new Date(gamejam.startDate);
    const endDate = new Date(gamejam.endDate);

    // 如果已结束，返回 null
    if (now > endDate) {
        return null;
    }

    // 如果未开始，计算距离开始还有几天
    if (now < startDate) {
        const diffTime = startDate.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // 如果正在进行，计算距离结束还有几天
    const diffTime = endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 计算 GameJam 持续时间（天数）
 */
export function getGameJamDuration(gamejam: GameJam): number {
    const startDate = new Date(gamejam.startDate);
    const endDate = new Date(gamejam.endDate);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// 设置一些示例数据，修改为使用 information 字段
export const gamejams: GameJam[] = [
    {
        id: '1',
        title: '像素艺术大挑战',
        description: '创建一个使用像素艺术风格的游戏，展示你的创意和技术能力！',
        startDate: '2023-08-01T00:00:00Z',
        endDate: '2023-08-03T23:59:59Z',
        organizer: 'PixelArt 社区',
        imageUrl: 'https://via.placeholder.com/800x450?text=PixelArtChallenge',
        theme: '时空旅行',
        information: `# 比赛规则
- 游戏必须使用像素艺术风格
- 48小时内完成
- 团队不超过3人

# 奖励设置
- 一等奖：$1000
- 二等奖：$500
- 三等奖：$250

# 评判标准
- 游戏性：30%
- 艺术风格：30%
- 创新：20%
- 主题贴合度：20%

# 提交要求
- 游戏可执行文件
- 源代码
- 游戏截图至少3张`,
        website: 'https://example.com/pixelchallenge',
        issueNumber: 1,
        issueUrl: 'https://github.com/dogyyds/gamejam/issues/1',
        participantLimit: "noLimit",
        //tags: ["像素艺术", "时空旅行", "2D"],
    },
    {
        id: '2',
        title: '手机游戏开发大赛',
        description: '专为移动平台打造的游戏开发比赛，要求创新和优秀的用户体验。',
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 明天开始
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10天后结束
        organizer: 'MobileGameDev',
        imageUrl: 'https://via.placeholder.com/800x450?text=MobileGameJam',
        theme: '城市生活',
        information: `# 参赛要求
- 必须在Android和iOS上运行
- 一周内完成
- 游戏必须是单手可玩的

# 奖励
- 最佳游戏：$2000
- 最佳创意：$1000
- 最佳视觉：$500

# 开发工具
参赛者可以使用任何开发工具和引擎，如Unity、Unreal Engine、Godot等。

# 注意事项
- 游戏必须是原创作品
- 不得使用商业游戏模板
- 提交截止日期为比赛结束当天晚上23:59`,
        website: 'https://example.com/mobilejam',
        issueNumber: 2,
        issueUrl: 'https://github.com/dogyyds/gamejam/issues/2',
        participantLimit: "noLimit",
        // 添加缺少的必要字段
        //tags: ["移动游戏", "Android", "iOS", "城市生活"],
    },
    {
        id: '3',
        title: 'VR游戏挑战赛',
        description: '使用最新的VR技术，创建身临其境的体验。',
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10天前开始
        endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3天前结束
        organizer: 'VR开发者联盟',
        imageUrl: 'https://via.placeholder.com/800x450?text=VRGameJam',
        theme: '深海探索',
        information: `## 参赛规则
必须使用Oculus或HTC Vive开发，团队规模不限，必须包含详细的游戏教程。

## 奖励设置
- 冠军：VR开发套件+$3000
- 亚军：$1500
- 季军：$750

## 关于主题
"深海探索"主题可以包括但不限于：
- 海底探险
- 深海生物研究
- 沉船寻宝
- 海底基地建设

## 技术支持
我们将提供VR开发技术支持和测试设备，有需要请联系组委会。`,
        website: 'https://example.com/vrjam',
        issueNumber: 3,
        issueUrl: 'https://github.com/dogyyds/gamejam/issues/3',
        participantLimit: "noLimit",
        // 添加缺少的必要字段
        //tags: ["VR", "虚拟现实", "深海探索", "3D"],
    }
];

/**
 * 按状态分组获取比赛
 */
export const getGameJamsByStatus = () => {
    const upcoming = gamejams.filter(jam => getGameJamStatus(jam) === 'upcoming');
    const ongoing = gamejams.filter(jam => getGameJamStatus(jam) === 'ongoing');
    const completed = gamejams.filter(jam => getGameJamStatus(jam) === 'completed');

    return { upcoming, ongoing, completed };
};