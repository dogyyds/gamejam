import { Octokit } from '@octokit/rest';
import { GameJam, GameJamFormData } from '../types/gamejam';

// 环境变量配置
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || '';
const REPO_NAME = process.env.GITHUB_REPO_NAME || '';
const DATA_PATH = 'data/gamejams.json';
const ISSUE_LABEL = 'gamejam-submission';
const APPROVED_LABEL = 'approved';
const REJECTED_LABEL = 'rejected';

// 创建Octokit实例
const octokit = new Octokit({ auth: GITHUB_TOKEN });

/**
 * 提交新的GameJam申请（创建Issue）
 */
export async function submitGameJamRequest(data: GameJamFormData, userToken?: string) {
    const client = userToken ? new Octokit({ auth: userToken }) : octokit;

    try {
        const response = await client.issues.create({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            title: `GameJam提交: ${data.title}`,
            body: formatGameJamIssueBody(data),
            labels: [ISSUE_LABEL],
        });

        return {
            success: true,
            issueNumber: response.data.number,
            issueUrl: response.data.html_url,
        };
    } catch (error) {
        console.error('创建GameJam提交Issue失败:', error);
        return {
            success: false,
            error: '提交失败，请稍后再试',
        };
    }
}

/**
 * 获取所有待审核的GameJam提交
 */
export async function getPendingGameJamSubmissions() {
    try {
        const response = await octokit.issues.listForRepo({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            state: 'open',
            labels: ISSUE_LABEL,
            per_page: 100,
        });

        return response.data.map(issue => parseIssueToGameJamSubmission(issue));
    } catch (error) {
        console.error('获取待审核GameJam失败:', error);
        return [];
    }
}

/**
 * 审核GameJam提交
 */
export async function reviewGameJamSubmission(issueNumber: number, approve: boolean) {
    try {
        if (approve) {
            // 1. 获取Issue内容
            const issue = await octokit.issues.get({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                issue_number: issueNumber,
            });

            // 2. 解析Issue内容为GameJam对象
            const gamejam = parseIssueBodyToGameJam(issue.data.body || '', issueNumber, issue.data);

            // 3. 获取现有GameJam数据
            const existingData = await fetchGameJamData();

            // 4. 添加新的GameJam
            const updatedData = [...existingData, gamejam];

            // 5. 更新GitHub中的数据文件
            await updateGameJamData(updatedData);

            // 6. 更新Issue标签和状态
            await octokit.issues.update({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                issue_number: issueNumber,
                state: 'closed',
                labels: [ISSUE_LABEL, APPROVED_LABEL],
            });

            await octokit.issues.createComment({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                issue_number: issueNumber,
                body: '✅ 此GameJam提交已获批准并发布。',
            });
        } else {
            // 拒绝申请
            await octokit.issues.update({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                issue_number: issueNumber,
                state: 'closed',
                labels: [ISSUE_LABEL, REJECTED_LABEL],
            });

            await octokit.issues.createComment({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                issue_number: issueNumber,
                body: '❌ 此GameJam提交已被拒绝。',
            });
        }

        return { success: true };
    } catch (error) {
        console.error('审核GameJam失败:', error);
        return { success: false, error: '审核操作失败' };
    }
}

/**
 * 从GitHub获取GameJam数据
 */
export async function fetchGameJamData(): Promise<GameJam[]> {
    try {
        const response = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: DATA_PATH,
        });

        if ('content' in response.data) {
            const content = Buffer.from(response.data.content, 'base64').toString();
            return JSON.parse(content) as GameJam[];
        } else {
            throw new Error('未找到数据文件');
        }
    } catch (error: any) {
        // 如果文件不存在（404），则创建新文件
        if (error.status === 404) {
            try {
                await createInitialDataFile();
                return [];
            } catch (createError) {
                console.error('创建初始数据文件失败:', createError);
                return [];
            }
        }
        return [];
    }
}

/**
 * 更新GitHub中的GameJam数据
 */
async function updateGameJamData(data: GameJam[]) {
    try {
        // 先获取文件的SHA值（如果存在）
        let sha: string | undefined;
        try {
            const fileInfo = await octokit.repos.getContent({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                path: DATA_PATH,
            });
            if ('sha' in fileInfo.data) {
                sha = fileInfo.data.sha;
            }
        } catch (e) {
            // 文件不存在，忽略错误
        }

        // 更新或创建文件
        await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: DATA_PATH,
            message: '更新GameJam数据',
            content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
            sha,
        });

        return { success: true };
    } catch (error) {
        console.error('更新GameJam数据失败:', error);
        return { success: false, error: '更新数据失败' };
    }
}

/**
 * 创建初始数据文件
 */
async function createInitialDataFile() {
    try {
        await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: DATA_PATH,
            message: '创建初始GameJam数据文件',
            content: Buffer.from(JSON.stringify([], null, 2)).toString('base64'),
        });
        console.log('已创建初始数据文件');
    } catch (error) {
        console.error('创建初始数据文件失败:', error);
    }
}

/**
 * 格式化GameJam提交内容为Issue正文
 */
function formatGameJamIssueBody(data: GameJamFormData): string {
    // 将参赛限制转为可读文本
    const participantLimitText = {
        'noLimit': '全年龄无限制',
        'studentsOnly': '仅限学生',
        'ageRestricted': '有年龄限制',
        'other': '其他限制'
    }[data.participantLimit || 'noLimit'];

    return `
## GameJam提交

### 基本信息

- **标题**: ${data.title}
- **描述**: ${data.description}
- **开始日期**: ${data.startDate}
- **结束日期**: ${data.endDate}
- **主办方**: ${data.organizer}
- **封面图片**: ${data.imageUrl}
- **主题**: ${data.theme || '无'}
- **官网**: ${data.website || '无'}
- **参赛限制**: ${participantLimitText}
${data.participantLimitDetails ? `- **限制详情**: ${data.participantLimitDetails}` : ''}

### 详细信息
\`\`\`
${data.information || '无'}
\`\`\`

<!-- 请不要修改以下内容，这是用于系统处理的数据 -->
\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`
`;
}

/**
 * 从Issue解析GameJam提交
 */
function parseIssueToGameJamSubmission(issue: any) {
    return {
        issueNumber: issue.number,
        issueUrl: issue.html_url,
        title: issue.title.replace('GameJam提交: ', ''),
        createdAt: issue.created_at,
        creator: issue.user?.login,
        body: issue.body,
        submissionData: extractJsonFromIssueBody(issue.body || ''),
    };
}

/**
 * 从Issue正文提取JSON数据
 */
function extractJsonFromIssueBody(body: string): GameJamFormData | null {
    const jsonMatch = body.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
        try {
            return JSON.parse(jsonMatch[1]);
        } catch (e) {
            console.error('解析Issue中的JSON失败:', e);
        }
    }
    return null;
}

/**
 * 从Issue正文转换为GameJam对象
 */
function parseIssueBodyToGameJam(body: string, issueNumber: number, issueData: any): GameJam {
    const data = extractJsonFromIssueBody(body);
    if (!data) {
        throw new Error('无法解析Issue内容');
    }

    return {
        id: `issue-${issueNumber}`,
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        organizer: data.organizer,
        imageUrl: data.imageUrl,
        theme: data.theme,
        information: data.information || '',
        website: data.website,
        issueNumber: issueNumber,
        issueUrl: issueData.html_url,
        issueCreator: issueData.user?.login,
        issueCreatedAt: issueData.created_at,
        issueComments: issueData.comments,
        participantLimit: data.participantLimit || "noLimit", // 添加默认为"noLimit"
        participantLimitDetails: data.participantLimitDetails || "", // 添加这个属性
    };
}
