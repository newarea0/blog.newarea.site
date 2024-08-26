# nodemon

监测文件改动并重启应用程序，从而便于调试应用程序

## 安装

```sh
npm i nodemon -g
```

查看是否安装成功

```sh
nodemon -v
```

## 使用

启动 node 服务

```sh
nodemon ./main.js
```

在本地6677端口启动node服务

```sh
nodemon ./main.js localhost 6677
```