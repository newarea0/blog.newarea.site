# 安装

## 检查是否安装了 Nginx

可以使用以下方法之一：

1. 使用 `nginx -v`，看能否打印出版本号：

   ```
   [root@VM-4-9-centos ~]# nginx -v
   nginx version: nginx/1.18.0
   ```
2. 使用 `which` 命令查找可执行文件的路径：
   ```
   [root@VM-4-9-centos ~]# which nginx
   /usr/bin/nginx
   ```
3. 检查 Nginx 服务状态：
   ```
   [root@VM-4-9-centos ~]# systemctl status nginx
   ● nginx.service - LSB: starts the nginx web server
     Loaded: loaded (/etc/rc.d/init.d/nginx; bad; vendor preset: disabled)
     Active: active (exited) since Sun 2023-09-10 23:20:15 CST; 2 months 22  days ago
       Docs: man:systemd-sysv-generator(8)
   ```

## 查看 Nginx 可执行文件路径

```
which nginx
```

## 查看 Nginx 配置文件路径

```
nginx -t
```

## 安装

### 检查yum源

可以通过安装包的方式和yum的方式来安装Nginx，这里介绍基于Yum的方式安装Nginx。[链接](http://nginx.org/en/docs/install.html)

![](https://image.newarea.site/2023-12-04-00-16-01.png)

查看Nginx是否在可安装软件清单列表中

`yum list | grep nginx`

如果出现以下内容说明yum源是存在的。

![](https://image.newarea.site/2023-12-04-00-16-02.png)

如果当前yum源中没有Nginx，那么需要新增一个yum源

通过`vim /etc/yum.repos.d/nginx.repo`创建nginx.repo文件，内容如下：

```sh
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

### 安装

```sh
yum install nginx
```

### 检验是否安装成功

```sh
nginx -v
```

如果是用 root 用户安装的 nginx，普通用户就无法编辑 nginx 配置文件，可以通过如下方式修改 nginx 配置文件权限。

```
chmod -R 777 /etc/nginx/
```

重启 nginx 时，如果报端口占用，使用 netstat -ntpl或者ps -ef | grep nginx找到相应进程，然后kill 进程ID。
