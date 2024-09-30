# Vercel

Vercel 是一个前端开发平台，专注于提供无服务器的静态网站托管和动态应用部署服务。它的目标是简化开发流程，帮助开发者快速构建、预览和部署现代 Web 应用。Vercel 与 Next.js 框架紧密集成，但也支持 Vue.js、React、Svelte、Angular 等其他前端框架。以下是 Vercel 的一些关键特性：

- **无缝部署**：Vercel 提供了一个无缝的部署体验，开发者只需将代码推送到 GitHub、GitLab 或 Bitbucket 上，Vercel 会自动检测更改并重新构建应用。这个过程不需要复杂的服务器配置，尤其适合前端开发者。
- **自定义域名**：Vercel 支持自定义域名，用户可以非常轻松地将自己的域名绑定到 Vercel 托管的项目上。
- **实时预览**：在每次提交时自动生成预览链接，方便团队成员进行协作和审查。
- **全球 CDN**：Vercel 自动将应用内容分发到全球各地的边缘节点，确保快速的加载速度和高可用性。
- **分析和监控**：Vercel 还提供了内置的分析功能，可以监控网站的访问情况、性能数据和用户行为，帮助开发者优化应用。
- **无服务器函数**：允许开发者轻松创建无服务器 API，支持多种编程语言。

## Vercel 和 Next.js 的集成

虽然 Vercel 支持多种前端框架，但它与 Next.js 的集成最为紧密。Next.js 是一个由 Vercel 团队开发的 React 框架，专注于静态生成和服务器端渲染（SSR），非常适合构建 SEO 友好的 Web 应用。Vercel 提供了对 Next.js 的原生支持，包括动态路由、API 路由和页面预渲染等特性。

## 使用场景

- 个人网站和博客：由于其简单的部署和全球 CDN 支持，Vercel 非常适合部署个人博客或静态网站。
- 电商网站：通过动态页面生成和快速加载，Vercel 可以很好地支持现代电商应用。
- 企业级应用：企业可以利用 Vercel 的无服务器架构来快速构建和扩展应用，无需维护复杂的基础设施。

## 示例

下面演示如何将一个 Vitepress 项目部署到 Vercel。

### 1. 创建项目

![](https://image.newarea.site/2024-09-30_16-02-29.png)

选择从 GitHub 导入项目：

![](https://image.newarea.site/2024-09-30_16-03-03.png)

这里构建和输出目录设置使用默认的即可，然后点击创建：

![](https://image.newarea.site/2024-09-30_16-08-47.png)

接下来可以查看构建、部署日志：

![](https://image.newarea.site/2024-09-30_16-09-46.png)

部署完成后，可以点击访问项目：

![](https://image.newarea.site/2024-09-30_16-11-50.png)

### 2. 添加域名

按上面步骤完成创建后，Vercel 会自动添加一个默认域名（如：xxx.vercel.app），我们可以在项目设置中添加一个自定义域名。

这里添加一个自定义域名 `vercel.newarea.site`，这里提示“Invalid Configuration”，这是因为域名没有通过域名服务商的 DNS 解析到 Vercel 的 IP 地址。

![](https://image.newarea.site/2024-09-30_15-49-12.png)

新增一条 CNAME 记录：

![](https://image.newarea.site/2024-09-30_15-53-25.png)

待解析生效后，再次验证：

![](https://image.newarea.site/2024-09-30_15-55-32.png)
