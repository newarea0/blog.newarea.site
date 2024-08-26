# Charles

Charles 是一个抓包工具。

[下载](https://www.charlesproxy.com/latest-release/download.do)

激活码：[Charles 激活码计算器](https://www.zzzmode.com/mytools/charles/)、[在线运行代码](https://play.golang.org/p/Qtt2CmHbTzU)

安装成功后，启动 Charles，通过浏览器浏览页面时，Charles 会自动抓取请求信息。

## 1 抓 HTTPS 包

刚安装的 Charles 是无法抓取 HTTPS 协议的请求的，需要做一些设置：

### 1.1 安装 SSL 证书

![](https://image.newarea.site/2024-05-22-22-55-38.png)

![](https://image.newarea.site/2024-05-22-22-59-56.png)

![](https://image.newarea.site/2024-05-22-23-01-50.png)

![](https://image.newarea.site/2024-05-22-23-02-43.png)

![](https://image.newarea.site/2024-05-22-23-03-45.png)

### 1.2 设置 HTTPS 端口

菜单栏 Proxy -> SSL Proxying Settings 打开 SSL Proxying Settings配置面板。添加一个 Location，主机位 `*`，端口位 443：

![](https://image.newarea.site/2024-05-22-23-06-12.png)

## 2 抓取 localhost 请求

使用 IP 或者 `localhost.charlesproxy.com` 替代 localhost 即可。
