# Codex

[官方文档](https://developers.openai.com/codex/quickstart?setup=cli)

[Codex](https://chatgpt.com/zh-Hans-CN/codex/) 是 OpenAI 公司开发的 AI 编程智能体。

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

使用 npm 进行安装

```sh
npm install -g @openai/codex
```

![](https://image.newarea.site/2026-05-20_00-25-04.png)

## 配置模型 API 密钥

编辑文件 `C:\Users\lenovo\.codex\config.toml`，替换为如下内容：

```toml
model_provider = "fox"
# 可配置gpt-5.4或gpt-5.4
model = "gpt-5.5"
# 可配置high medium low
model_reasoning_effort = "high"
disable_response_storage = true

# foxcode配置
[model_providers.fox]
name = "fox"
base_url = "https://dm-fox.rjj.cc/codex/v1"
wire_api = "responses"
requires_openai_auth = true
```

编辑文件 `C:\Users\lenovo\.codex\auth.json`，替换为如下内容：

```json
{
  "OPENAI_API_KEY": "替换为您的API Key"
}
```
