> [!WARNING]
> 非常抱歉，本网站已停止继续更新，为了给大家一个更好的平台，决定增加更丰富功能重构，本网站仅存档纪念

# GameJam 看板

一个用于展示、提交和管理游戏开发比赛(GameJam)的 Next.js 应用程序。该应用使用 GitHub Issues 作为数据存储和审核系统，无需额外数据库。

## 主要功能

- 🎮 浏览正在进行、即将到来和已经结束的 GameJam 比赛
- 🚀 用户可以提交新的 GameJam 比赛信息
- 🔍 管理员可以审核、批准或拒绝提交的比赛信息
- 🌐 完全使用 GitHub 作为数据存储和权限管理系统
- 🌙 支持深色模式

## 技术栈

- Next.js 15.2 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (GitHub OAuth)
- GitHub API (Octokit)

## 项目设置

### 前提条件

- Node.js 18.17.0 或更高版本
- GitHub 账号
- GitHub OAuth App 和个人访问令牌

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/nextjs-gamejam.git
cd nextjs-gamejam
```

2. 安装依赖

```bash
cd my-app
npm install
```

3. 设置环境变量

复制 `.env.example` 文件并重命名为 `.env.local`，然后填写相应的环境变量：

```bash
cp .env.example .env.local
```

4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用程序。

### 环境变量配置

应用程序需要以下环境变量：

- `NEXTAUTH_URL`: 应用程序的 URL（开发环境为 http://localhost:3000）
- `NEXTAUTH_SECRET`: NextAuth.js 的加密密钥
- `GITHUB_CLIENT_ID`: GitHub OAuth App 的客户端 ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth App 的客户端密钥
- `GITHUB_TOKEN`: GitHub 个人访问令牌（需要 repo 权限）
- `GITHUB_REPO_OWNER`: GitHub 仓库所有者用户名
- `GITHUB_REPO_NAME`: GitHub 仓库名称
- `ADMIN_USERS`: 管理员用户的 GitHub 邮箱，逗号分隔

## 部署到 Vercel

该项目可以直接部署到 Vercel：

1. 在 Vercel 中导入 GitHub 仓库
2. 配置环境变量
3. 部署

## 工作原理

- 用户通过 GitHub OAuth 登录
- 提交的 GameJam 信息会创建 GitHub Issue
- 管理员审核 Issue 并决定是否批准
- 批准的内容会被添加到仓库中的 JSON 数据文件
- 前端从 GitHub 获取数据并展示

## 贡献

欢迎提交 Pull Request 来完善项目。对于重大更改，请先开 Issue 讨论您想要改变的内容。

## 许可证

[MIT](LICENSE) Dogxi
