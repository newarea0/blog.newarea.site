# Skills

“Agent Skills” 这一概念最初由 Anthropic 开发，后来被作为开放标准加以推广。

[Agent Skills](https://agentskills.io/) 是一项开放标准。是一个为 AI 智能体扩展专门能力的**开放标准**，将特定领域的知识和工作流**封装起来**，提供给 AI 智能体使用，

一个 Skill 是一份清晰、严谨、可执行的指令文档，用于明确告诉模型——在什么条件下（When），按照哪些步骤（How），产出什么结果（What）。

## 特点

- 可移植性：技能可以在不同的 AI 智能体之间共享和复用。
- 渐进式：AI 智能体根据任务需要，动态加载想过 Skills。
- 受版本控制：技能以文件形式存储，可以在你的代码仓库中追踪其变更。
- 可操作：技能可以包含脚本、模板和参考资料，Agent 使用其工具对这些内容进行处理。

## 目录结构

每个技能是 `.agents/skills/` 下的一个文件夹，至少包含一个 `SKILL.md` 文件，该文件中定义了技能的名称、描述等数据。

```
.agents/
└── skills/
    └── my-skill/
        └── SKILL.md // 其中的 name 字段定义了技能的名称，需与目录名一致，即 my-skill
```

技能还可以包含脚本、参考文件和资源等可选目录：

```
.agents/
└── skills/
    └── deploy-app/
        ├── SKILL.md
        ├── scripts/
        │   ├── deploy.sh
        │   └── validate.py
        ├── references/
        │   └── REFERENCE.md
        └── assets/
            └── config-template.json
```

## 内容说明

`SKILL.md` 包含两部分，第一部分是带有 YAML 格式的**前置信息**，第二部分是**正文内容**，如：

```md
---
name: pdf-processing
description: Extract PDF text, fill forms, merge files. Use when handling PDFs.
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---

# PDF Processing Skill

This skill provides reusable workflows and examples for working with PDF files in local development environments, CI pipelines, and AI-assisted automation tools.

## Capabilities

- Extract text from PDF files
- Read PDF metadata
- Merge multiple PDFs into one document
- Split PDFs into separate pages/files
- Fill PDF form fields
- Flatten interactive forms
- Convert PDF pages to images
- OCR scanned PDFs
- Encrypt or decrypt PDFs
- Compress PDF file size
```

|字段|必填|描述|
|---|---|---|
|name|是|技能标识符。仅限小写字母、数字和连字符。必须与父文件夹名称一致。|
|description|是|描述技能的作用及其使用场景。由智能体用于判断相关性。|
|license|否|许可证名称或对相关许可文件的引用。|
|metadata|否|技能的元数据，如作者、版本等。|

## skills 命令

[skills](https://github.com/vercel-labs/skills)

用于发现、安装、管理技能的命令行工具。

全局安装：`npm install -g skills`

### 查找发现 Skill

直接在网页中搜索即可。

![](https://image.newarea.site/2026-05-20_16-02-55.png)

### 查看某个仓库下包含哪些 Skill

```sh
skills add antfu/skills --list
```

![](https://image.newarea.site/2026-05-20_16-13-22.png)

### 安装仓库下某个指定 Skill

```sh
# 项目级别安装
skills add antfu/skills --skill vue-best-practices

# 全局安装，安装到 C:\Users\lenovo\.agents\skills 目录下
skills add antfu/skills --skill vue-best-practices -g
```

![](https://image.newarea.site/2026-05-20_16-19-12.png)

## 如何运作的

1. 发现：当聊天会话开始时，AI 智能体扫描可用的 skill，只读取 `name` 和 `description` 字段，这些信息足以判断该 skill 是否与当前对话相关。
2. 激活：当某个 skill 与你的提问匹配时，AI 智能体会将该 `SKILL.md` 内容全部加载到上下文中。
3. 执行：AI 智能体使用 skill 正文中要求进行操作。

## 有无 skill 的区别

拿 [vue-best-practices](https://www.skills.sh/antfu/skills/vue-best-practices) 这个 skill 为例，假设我们询问：帮我用 Vue 写一个代办事项页面。

一句话对比
- 没有 Skill：Agent 多半能做出「能用的代办页」，但写法、拆分、数据流往往随模型习惯走，质量不稳定、代码质量差、随机。
- 有 Skill：会按固定工作流交付——先规划、再按 Vue 3 最佳实践拆组件与 composable，并做收尾自检。

|对比项|没有 Skill|有 Skill|
|---|---|---|
|写法|选项式 API|组合式 API， `<script setup lang="ts">`|
|代码结构|大而全，没有拆分|按功能拆分组件，如 TodoList、TodoItem、TodoForm 等|
|状态|可能全塞组件里，或一上来就上 Pinia|只有跨组件共享的状态才用 Pinia|
|质量|不稳定|稳定|

## 常见误区

### Skill 等同于一段提示词

Skill 并不是一次性的对话提示。它是一个可长期复用、输入输出明确的能力模块，强调的是稳定、确定且易于工程化维护。而 Prompt 更偏向临时性、探索性和即兴交互，两者在设计目标和工程要求上完全不同。

### Skill 是写给人看的文档

Skill 的目标不是解释原理，而是下达指令。SKILL.md 文件的内容应使用模型可解析的结构化语言，明确约束其行为边界，并精确描述何时使用（When）、如何执行（How）、输出结果（What）。

### Skill 越复杂越强大

复杂度并不与 Skill 的能力强度挂钩。模型的推理与决策成本是显著的。职责单一、边界清晰的 Skill，更容易在正确的时机被选中并稳定执行。过于复杂的 Skill 反而会降低命中率。

## 参考

- [Cursor Agent Skills](https://cursor.com/cn/docs/skills)
- [The Open Agent Skills Ecosystem](https://www.skills.sh/)：开放智能体技能生态，是 Vercel 推出的开源 AI 智能体技能生态平台，相当于 AI Agent 界的 npm，用于发现、安装、共享可复用的 AI 技能包。
