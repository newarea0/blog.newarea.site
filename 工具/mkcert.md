# mkcert

## 1. mkcert 介绍

[`mkcert`](https://github.com/FiloSottile/mkcert) 是一个简单易用的本地 HTTPS 证书生成工具，可以为本地开发环境创建受信任的 SSL 证书，而无需手动配置复杂的 CA（证书颁发机构）。

### 1.1 mkcert 特点

- **简化 HTTPS 证书创建**：避免浏览器不安全警告。
- **无需手动配置 CA**：自动安装本地受信任的根证书。
- **跨平台支持**：适用于 Windows、macOS 和 Linux。
- **支持任意域名**：包括 `localhost`、`127.0.0.1` 和自定义域名。

---

## 2. Windows 环境安装 mkcert

### 2.1 安装 Chocolatey

可以使用 [Chocolatey](https://chocolatey.org/) 进行安装（如果未安装 Chocolatey，请参考 Chocolatey 学习笔记）：

```powershell
choco install mkcert
```

![](https://blog-1320825986.cos.ap-nanjing.myqcloud.com/2025-03-19-20-31-29.png)

### 2.1 验证安装

安装完成后，打开 `PowerShell` 或 `cmd`，运行：

```sh
mkcert -version
```

如果正确安装，将显示 `mkcert` 版本号。

---

## 3. 配置本地证书

### 3.1 安装本地 CA（仅需执行一次）

```sh
mkcert -install
```

此命令会创建一个本地受信任的根证书，并将其添加到系统信任存储中。

![](https://blog-1320825986.cos.ap-nanjing.myqcloud.com/2025-03-19-20-34-32.png)

### 3.2 生成本地 HTTPS 证书

创建 `localhost` 和 `127.0.0.1` 的 HTTPS 证书：

```sh
mkcert localhost 127.0.0.1 172.20.147.101 ::1
```

成功后，会生成以下文件：

- `localhost+3.pem`（证书文件，localhost+3 表示有4个地址）
- `localhost+3-key.pem`（私钥文件）

![](https://blog-1320825986.cos.ap-nanjing.myqcloud.com/2025-03-19-20-38-08.png)

### 3.3 生成通用的 wildcard 证书（可用于多个子域）

```sh
mkcert "*.example.com"
```

---

## 4. 结合 `serve` 使用 HTTPS

### 4.1 安装 `serve`

如果未安装 `serve`，可以使用 npm 进行安装：

```sh
npm install -g serve
```

### 4.2 运行 `serve` 并使用 HTTPS 证书

使用 `serve` 运行本地 HTTPS 服务器，指定证书文件：

```sh
serve -l 443 --ssl-cert C:\Users\zhangbaoxi\localhost+3.pem --ssl-key C:\Users\zhangbaoxi\localhost+3-key.pem
```

然后在浏览器访问 `https://localhost`，不会再出现“不安全”警告。

### 4.3 允许外部设备访问

如果希望局域网中的其他设备访问你的本地 HTTPS 服务器，可以运行：

```sh
serve -l 0.0.0.0:443 --ssl-cert localhost+1.pem --ssl-key localhost+1-key.pem
```

其他设备可通过 `https://你的IP` 访问。

---

## 5. 其他进阶用法

### 5.1 删除本地 CA

如果需要清理 mkcert 生成的本地证书，可以运行：

```sh
mkcert -uninstall
```

---

## 6. 总结

`mkcert` 是一个方便的本地 HTTPS 证书工具，结合 `serve` 可以轻松在本地搭建受信任的 HTTPS 服务器。掌握 `mkcert` 及其基本命令后，能够有效避免开发环境中 HTTPS 相关的问题。
