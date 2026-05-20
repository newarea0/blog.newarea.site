# Claude Code

[官方文档](https://code.claude.com/docs/en/overview)

[Claude Code](https://claude.com/product/claude-code) 是 Anthropic 公司开发的，可以运行在命令行中的 AI 编程 Agent，可以用来操作辅助编程、电脑文件、运行命令。

使用方式主要有：

- 命令行
- VSCode、Cursor 等编辑器插件
- 桌面客户端

下面主要介绍在命令行中使用的方法。

## 安装

### 前置条件

- Node 环境
- Git

### 安装命令

打开终端（Windows 用 PowerShell），粘贴命令即可：

```sh
irm https://daheiai.com/cc.ps1 | iex
```

整个过程会下载一个 200+MB 的软件，取决于个人的网络状态，时间可能会很长。

> [!NOTE] 为什么不用官方原版命令 irm https://claude.ai/install.ps1 | iex？
> 直接使用官方安装命令通常会失败，提示：“Install failed. Failed to fetch version from https://downloads.claude.ai/claude-code-releases/latest: ECONNREFUSED”

> [!IMPORTANT] 重要声明
> 本页面提供的 Claude Code Windows 安装脚本（cc.ps1） 用于自动化安装流程。
> - 脚本会获取官方版本信息（latest / manifest.json），并在本地执行安装。
> - 所有二进制文件（claude.exe）均由用户电脑直接从 Anthropic 官方 Google Cloud Storage 存储桶下载。
> - 使用前请确认当前网络环境能够正常访问 storage.googleapis.com 及相关官方地址。
> - 本项目与 Anthropic, Inc.、Google LLC 均无关联、合作或授权关系。

### 配置环境变量

安装完成后如果直接在命令行中使用 `claude`，提示无法识别，这是因为你没有配置环境变量。

安装完成后，C盘个人文件下会：
- 生成 `C:\Users\lenovo\.local\bin\claude.exe` 可执行文件。
- 生成 `.claude` 文件夹，里面存放了 Claude Code 的配置文件。

将 `C:\Users\lenovo\.local\bin` 添加到环境变量 `Path` 中，即可在命令行中使用 `claude` 命令。

### 绕过登录

首次执行 `claude` 命令提示如下错误，因为 Claude Code 需要登录才能使用。

![](https://image.newarea.site/2026-05-19_19-03-27.png)

打开这个文件 `C:\Users\lenovo\.claude.json` （这个路径里的用户名部分每个人都不一样，看你自己的用户名是什么），然后把这个内容复制进去：`"hasCompletedOnboarding": true,`，即可绕过登录。

## 配置模型 API 密钥

我使用的是中转站 [foxcode](https://foxcode.rjj.cc/model-square)，根据说明文档配置模型 API 密钥。

创建（如果不存在）或编辑 `C:\Users\lenovo\.claude\settings.json`，输入以下值并保存

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "替换为您的 API 密钥",
    "ANTHROPIC_BASE_URL": "https://code.newcli.com/claude",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [],
    "deny": []
  }
}
```

## 使用

找到要工作的文件夹，右键文件夹选择用终端打开，然后输入 `claude` 命令即可。

![](https://image.newarea.site/2026-05-19_19-37-27.png)

![](https://image.newarea.site/2026-05-19_19-39-20.png)
