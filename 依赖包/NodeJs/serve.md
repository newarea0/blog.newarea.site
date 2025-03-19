# serve

## 1. `serve` 介绍

[`serve`](https://github.com/vercel/serve) 是一个用于快速部署静态文件的 Node.js 命令行工具。它可以轻松地在本地或服务器上提供静态文件的 HTTP 访问，适用于开发和测试环境。

### 1.1 `serve` 特点

- **轻量级**：安装简单，开箱即用。
- **支持 SPA（单页应用）**：可以重写所有路由指向 `index.html`。
- **支持缓存和压缩**：优化文件传输。
- **支持目录列表**：可以查看文件目录结构。
- **跨平台**：可在 Windows、macOS 和 Linux 上运行。

## 2. 安装 `serve`

### 2.1 全局安装

```sh
npm install -g serve
```

### 2.2 作为项目依赖安装

如果想在项目中使用 `serve`，可以在 `devDependencies` 中添加它：

```sh
npm install serve --save-dev
```

## 3. 使用 `serve`

### 3.1 在当前目录启动服务器

```sh
serve
```

默认会在 `localhost:3000` 提供当前目录的静态文件。

### 3.2 指定目录

如果要为特定目录提供服务，例如 `dist` 目录：

```sh
serve -s dist
```

`-s` 选项表示将 `dist` 目录作为单页应用（SPA）处理，所有路由将指向 `index.html`。

### 3.3 指定端口

默认端口是 `3000`，可以使用 `-l` 选项指定其他端口，例如：

```sh
serve -l 8080
```

### 3.4 允许外部访问

如果想让局域网或外部设备访问，可以使用：

```sh
serve -l 0.0.0.0:8080
```

这样其他设备可以通过 `http://<你的IP>:8080` 访问。

### 3.5 启用目录浏览

如果要让 `serve` 显示文件目录，可以使用 `--no-clean-url` 选项：

```sh
serve --no-clean-url
```

### 3.6 启用缓存

默认情况下，`serve` 使用智能缓存策略。你可以显式地启用或禁用缓存：

```sh
serve --single --cache 3600
```

上面命令会设置缓存时间为 3600 秒。

### 3.7 禁用缓存

如果你不希望缓存文件，可以使用：

```sh
serve -s build --no-cache
```

### 3.8 设定自定义 `404.html`

如果要为 404 错误提供自定义页面，可以添加 `404.html` 文件，`serve` 会自动使用它。

### 3.9 运行 HTTPS 服务器

可以使用 `--ssl-cert` 和 `--ssl-key` 选项启用 HTTPS，例如：

```sh
serve --ssl-cert cert.pem --ssl-key key.pem
```

## 4. `serve` 配置文件

可以创建 `serve.json` 文件，配置 `serve` 的行为，例如：

```json
{
  "public": "dist",
  "cleanUrls": true,
  "headers": [{
    "source": "**/*.html",
    "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
  }]
}
```

## 5. 总结

`serve` 是一个简单易用的静态文件服务器，适用于前端开发、测试以及简单的静态资源托管。它提供了多种配置选项，可以根据不同需求灵活使用。
