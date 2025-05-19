# Docker Compose

[Docker Compose](https://docs.docker.com/compose/)
[Compose file reference](https://docs.docker.com/reference/compose-file/)
[Docker Compose 命令](https://docs.docker.com/reference/cli/docker/compose/)

Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。它使用 YAML 文件来配置应用程序的服务，包括容器、网络、卷等。

比如，我要部署一个博客应用，如果不使用 Docker Compose，我需要先部署一个 MySQL 容器，然后部署一个 WordPress 容器。如果使用 Docker Compose，我只需要一个 `docker-compose.yml` 文件，就可以部署一个博客应用。

编写 docker-compose.yml 文件：

```yaml
name: myblog

# 定义各个容器服务 https://docs.docker.com/reference/compose-file/services/
services:
  mysql:
    # 容器名称
    container_name: mysql
    # 镜像
    image: mysql:8.0
    # 端口
    ports:
      - '3306:3306'
    # 环境变量
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: wordpress
    # 卷
    volumes:
      - mysql-data:/var/lib/mysql
      - /app/myconfig:/etc/mysql/conf.d
    # 网络
    networks:
      - myblog
    # 重启策略
    restart: always

  wordpress:
    image: wordpress:latest
    ports:
      - '8080:80'
    environment:
      WORDPRESS_DB_HOST: mysql:3306
      WORDPRESS_DB_USER: root
      WORDPRESS_DB_PASSWORD: 123456
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress:/var/www/html
    networks:
      - myblog
    restart: always
    # 依赖关系
    depends_on:
      - mysql

# 定义各个网络，包含上面 services 中出现的网络
networks:
  myblog:

# 定义各个卷
volumes:
  mysql-data:
  wordpress:
```

进入 compose-file.yml 文件所在目录。

后台启动服务：

```bash
docker compose up -d
```

![](https://image.newarea.site/2025-03-02_01-32-09.png)

其他常用命令：

```bash
# 停止容器并删除容器、网络（默认不删除卷）
docker compose down

# 停止容器但不删除容器、网络
docker compose stop

# 启动容器
docker compose start
```
