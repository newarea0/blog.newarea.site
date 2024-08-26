# Cloudflare

Cloudflare 是一个 DNS 服务提供商，可以：

- 免费托管域名
- 提供 CDN 加速
- 设置证书

## 新增站点

![](https://image.newarea.site/2024-08-07_00-33-04.png)

## 选择套餐

使用 Cloudflare 免费套餐就行。

![](https://image.newarea.site/2024-08-07_00-28-06.png)

## 修改原先的腾讯云域名 DNS 服务器

使用 Cloudflare 分配的 DNS 服务器修改原先的腾讯域名 DNS 服务器。

![](https://image.newarea.site/2024-08-07_00-26-15.png)

![](https://image.newarea.site/2024-08-07_00-26-57.png)

![](https://image.newarea.site/2024-08-07_00-27-26.png)

当看到如下状态说明修改 DNS 服务器成功。

![](https://image.newarea.site/2024-08-07_00-35-18.png)

## 快速入门设置

完成上述步骤后，需要完成快速入门设置，设置安全性和性能。

![](https://image.newarea.site/2024-08-07_00-46-04.png)

打开【自动 HTTPS 重写】。

![](https://image.newarea.site/2024-08-07_00-47-02.png)

打开 【始终使用 HTTPS】。

![](https://image.newarea.site/2024-08-07_00-47-40.png)

上面这两个配置也可以在 SSL/TLS -> 边缘证书中查看修改。

## 使用 HTTPS

### 方式一

> 该方式操作简单，Nginx 无需复杂配置。

完成上面快速入门设置，然后修改博客 Nginx 配置（Nginx 中不要配置证书）。

/www/server/panel/vhost/nginx/blog.conf

之前：

```conf
server {
    #SSL 默认访问端口号为 443
    listen 443 ssl; 
    #请填写绑定证书的域名
    server_name www.newarea.site; 
    #请填写证书文件的相对路径或绝对路径
    ssl_certificate /www/server/nginx/ssl/www.newarea.site_bundle.crt; 
    #请填写私钥文件的相对路径或绝对路径
    ssl_certificate_key /www/server/nginx/ssl/www.newarea.site.key;
    ssl_session_timeout 5m;
    #请按照以下协议配置
    ssl_protocols TLSv1.2 TLSv1.3; 
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
    ssl_prefer_server_ciphers on;
    location / {
        #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
        #例如，您的网站主页在 Nginx 服务器的 /etc/www 目录下，则请修改 root 后面的 html 为 /etc/www。
        root /home/www/blog; 
        index  index.html index.htm;
    }

}

server {
    listen 80;
    server_name www.newarea.site;
    #将请求转成https
    rewrite ^(.*)$ https://$host$1 permanent;
}
```

现在：

```conf
server {
    listen 80;
    server_name www.newarea.site;

    location / {
        #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
        #例如，您的网站主页在 Nginx 服务器的 /etc/www 目录下，则请修改 root 后面的 html 为 /etc/www。
        root /home/www/blog; 
        index  index.html index.htm;
    }
}
```

重启 Nginx。

CloudFlare -> SSL/TLS -> 概述，选择“灵活”，或者“完全”。

![](https://image.newarea.site/2024-08-07_01-24-03.png)

```sh
nginx -s reload
```

### 方式二

> 该方式稍复杂，需要生成 SSL 证书并配置 Nginx SSL 相关属性。**是 Cloudflare 推荐的方式**。

在 Cloudflare -> SSL/TLS -> 源服务器中生成源证书

![](https://image.newarea.site/2024-08-07_01-27-42.png)

![](https://image.newarea.site/2024-08-07_01-28-57.png)

下载保存源证书（我命名为 newarea.site.pem）和私钥（我命名为 newarea.site.key）到本地。

![](https://image.newarea.site/2024-08-07_01-29-47.png)

上传到服务器。

![](https://image.newarea.site/2024-08-07_01-41-40.png)

Nginx 配置（/www/server/panel/vhost/nginx/blog.conf）：

```
server {
    #SSL 默认访问端口号为 443
    listen 443 ssl; 
    #请填写绑定证书的域名
    server_name www.newarea.site; 
    #请填写证书文件的相对路径或绝对路径
    ssl_certificate /www/server/panel/vhost/nginx/certificates-cloudflare/newarea.site.pem; 
    #请填写私钥文件的相对路径或绝对路径
    ssl_certificate_key /www/server/panel/vhost/nginx/certificates-cloudflare/newarea.site.key;
    ssl_session_timeout 5m;
    #请按照以下协议配置
    ssl_protocols TLSv1.2 TLSv1.3; 
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
    ssl_prefer_server_ciphers on;
    location / {
        #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
        #例如，您的网站主页在 Nginx 服务器的 /etc/www 目录下，则请修改 root 后面的 html 为 /etc/www。
        root /home/www/blog; 
        index  index.html index.htm;
    }

}

server {
    listen 80;
    server_name www.newarea.site;
    #将请求转成https
    rewrite ^(.*)$ https://$host$1 permanent;
}
```

重启 Nginx。

最后，CloudFlare -> SSL/TLS -> 选择“完全（严格）”

![](https://image.newarea.site/2024-08-07_01-46-05.png)
