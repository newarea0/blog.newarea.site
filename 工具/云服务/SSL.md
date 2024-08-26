# SSL

网站开启 https 步骤。

## 申请免费 SSL 证书

### 提交证书申请

![](https://image.newarea.site/2024-01-28-23-31-40.png)

![](https://image.newarea.site/2024-01-29-00-59-40.png)

### 验证域名

然后点击【提交申请，进行域名验证】按钮，进入验证域名页面，根据提供的信息添加一条域名解析记录（[云解析 DNS](https://console.cloud.tencent.com/cns/detail/newarea.site/records)）。

## 部署 SSL 证书

### 下载 SSL 证书文件压缩包

![](https://image.newarea.site/2024-01-29-01-14-37.png)

![](https://image.newarea.site/2024-01-29-01-18-28.png)

解压压缩包，有如下文件：

![](https://image.newarea.site/2024-01-29-01-20-51.png)

- www.newarea.site.csr CSR 文件，CSR 文件是申请证书时由您上传或系统在线生成的，提供给 CA 机构。安装时可忽略该文件。
- www.newarea.site.key 私钥文件
- www.newarea.site_bundle.crt 证书文件
- www.newarea.site_bundle.pem 证书文件

将已获取到的 `www.newarea.site_bundle.crt` 证书文件和 `www.newarea.site.key` 私钥文件从本地目录拷贝到 Nginx 服务器的  /www/server/nginx/ssl 目录（请根据实际情况操作，此处 /www/server/nginx 为 Nginx 安装目录）下。

### 配置 Nginx

原先个人博客网站访问地址是 `http://www.newarea.site`，现在想将其改成 `https://www.newarea.site`，需修改个人博客相关 Nginx 配置。

#### http_ssl_module 模块

查看 Nginx 是否安装 http_ssl_module 模块：

```sh
./nginx -V
```

如果输出内容包含 `--with-http_ssl_module`，说明已安装。

#### 修改 Nginx 配置

/www/server/panel/vhost/nginx/blog.conf

修改前：

```plain
server {
  listen 80;
  server_name www.newarea.site; 
  
  location / {
    root /home/www/blog;
    index index.html;
  }
}
```

修改后：

```plain
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
    index  index.html;
  }
}

server {
  listen 80;
  server_name www.newarea.site;
  #将请求转成https
  rewrite ^(.*)$ https://$host$1 permanent;
}
```

#### 验证配置文件

```sh
nginx -t
```

#### 重载 Nginx

```sh
nginx -s reload
```

重载成功，即可使用 `https://www.newarea.site` 进行访问。

## 总结

注意 http 的默认端口是 80，https 默认端口是 443，访问时可以将默认端口省略。记得相关端口要提前开通（**系统防火墙**和**轻量云防火墙**）

可以发现配置文件的改动点主要有3处：

1. 启用 SSL 模式

    ```plain
    // 可以使用任意端口，这里假设使用 https 默认端口
    listen 443 ssl; 
    ```

2. SSL 证书相关配置

    ```plain
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
    ```

3. 将 http 请求转发到 https 请求

    ```plain
    server {
      // 可以使用任意端口，这里假设使用 https 默认端口
      listen 80;
      server_name www.newarea.site;
      #将请求转成https
      rewrite ^(.*)$ https://$host$1 permanent;
    }
    ```

## 注意

以上步骤只是将个人博客由 HTTP 协议改成了 HTTPS，并没有改造服务器上的其他应用，如果想将服务器上的其他应用，如 WordPress (`http://www.newarea.site:9090/`)也改成 HTTPS 协议，同样需要修改对应的 Nginx 配置。不需要再申请 SSL 证书，因为域名 `www.newarea.site` 的 SSL 证书已经申请过了。
