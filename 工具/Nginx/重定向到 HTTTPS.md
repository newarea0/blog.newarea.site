# 重定向到 HTTPS

要将所有 HTTP 请求重定向到 HTTPS，可以在 Nginx 配置文件中添加以下内容：

```
server {
    listen 80;
    server_name example.com;

    # 方式一
    return 301 https://$server_name$request_uri;

    # 方式二
    # rewrite ^(.*)$ https://$host$1 permanent;
}

server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/certificate.key;

    # 其他 SSL 配置...

    location / {
        # 您的网站配置...
    }
}
```
