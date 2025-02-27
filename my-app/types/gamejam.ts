// GameJam 类型定义

// 用于提交表单的数据结构
export interface GameJamFormData {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    organizer: string;
    imageUrl: string;
    theme?: string;
    information?: string; // 比赛详情、规则、奖品等所有额外信息
    website?: string;
    participantLimit?: ParticipantLimit;
    participantLimitDetails?: string; // 添加这个属性
    tags?: string[];
    prizes?: string[];
    rules?: string;
}

// 完整的 GameJam 数据结构
export interface GameJam {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    organizer: string;
    imageUrl: string;
    theme?: string;
    information: string;
    website?: string;
    //tags: string[];
    issueNumber?: number;
    issueUrl?: string;         // 添加这个属性
    issueCreator?: string;     // 添加这个属性
    issueCreatedAt?: string;   // 添加这个属性
    issueComments?: unknown;
    participantLimit: ParticipantLimit;
    participantLimitDetails?: string; // 添加这个属性
}

// GameJam 状态类型
export type GameJamStatus = 'upcoming' | 'ongoing' | 'completed';
export type ParticipantLimit = 'noLimit' | 'studentsOnly' | 'ageRestricted' | 'other';
