# 部署

路由和 vite 配置中都可以设置 base：

路由
```js
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory('/xxx/'),
  // ...
})
```

vite 配置
```js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vite/',
  // ...
})
```

## 1 两处都不设置

![01](https://image.newarea.site/20230424/01.png)

### 1.1 开发环境

点击按钮可以正常切换页面，刷新也正常。

### 1.2 生产环境

#### 任意位置

vue打包文件dist内的文件的存放路径 `D:\study\vite-ts\dist`

```sh
server {
    listen       80;
    server_name  localhost;

    location / {
        root   D:\study\vite-ts\dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

#### nginx html 内

vue打包文件dist内的文件的存放路径 `D:\soft\nginx-1.22.0\html\vite`

```sh
server {
    listen       80;
    server_name  localhost;

    location / {
        root   html/vite;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

## 2 vite 中设置 base

![02](https://image.newarea.site/20230424/02.png)

### 2.1 开发环境

点击按钮可以正常切换页面，但是不能刷新。

![03](https://image.newarea.site/20230424/03.png)

可以发现 index.html 中所需的相关资源文件自动被加上了一个前缀。

刷新：

![04](https://image.newarea.site/20230424/04.png)

### 2.2 生产环境

#### 任意位置

vue打包文件dist内的文件的存放路径 `D:\study\vite-ts\dist`

```sh
server {
    listen       80;
    server_name  localhost;

    #用于匹配首页
    location / {
        root   D:\study\vite-ts\dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    #用于匹配首页资源
    location /vite {
        alias   D:\study\vite-ts\dist;
    }
}
```

#### nginx html 内

vue打包文件dist内的文件的存放路径 `D:\soft\nginx-1.22.0\html\vite`

```sh
server {
    listen       80;
    server_name  localhost;

    location / {
        root   html/vite;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /vite {
        alias   html/vite;
    }
}
```

## 3 路由设置 base

![05](https://image.newarea.site/20230424/05.png)

### 3.1 开发环境

点击按钮可以正常切换页面，刷新也正常。

![06](https://image.newarea.site/20230424/06.png)

![07](https://image.newarea.site/20230424/07.png)

### 3.2 生产环境

#### 任意位置

```sh
server {
    listen       80;
    server_name  localhost;

    location / {
        root   D:\study\vite-ts\dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

#### nginx html 内

```sh
server {
    listen       80;
    server_name  localhost;

    location / {
        root   html/vite;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

## 4 两处都设置

![08](https://image.newarea.site/20230424/08.png)

### 4.1 开发环境

点击按钮可以正常切换页面，刷新也正常。

![09](https://image.newarea.site/20230424/09.png)

### 4.2 生产环境

#### 任意位置

vue打包文件dist内的文件的存放路径 `D:\study\vite-ts\dist`。

```sh
server {
    listen       80;
    server_name  localhost;

    location / {
        root   D:\study\vite-ts\dist;
        index  index.html index.htm;
    }

    location /vite {
        alias  D:\study\vite-ts\dist;
        try_files $uri $uri/ /index.html;
    }
}
```

#### nginx html 内

vue打包文件dist内的文件的存放路径 `D:\soft\nginx-1.22.0\html\vite`。

```sh
server {
    listen       80;
    server_name  localhost;

    location / {
        root   html/vite;
        index  index.html index.htm;
    }

    location /vite {
        alias  html/vite;
        try_files $uri $uri/ /index.html;
    }
}
```

## 5 两处都设置，base 不相同

![10](https://image.newarea.site/20230424/10.png)

### 5.1 开发环境

浏览器输入localhost:3000，显示如下，点击按钮可以正常切换页面，但是不能刷新

localhost:3000 -> localhost:3000/a -> localhost:3000/b/a

![11](https://image.newarea.site/20230424/11.png)

![12](https://image.newarea.site/20230424/12.png)

### 5.2 生产环境

#### 任意位置

vue打包文件dist内的文件的存放路径 `D:\study\vite-ts\dist`

```sh
server {
    listen       80;
    server_name  localhost;

    # 返回 index.html
    location / {
        root   D:\study\vite-ts\dist;
        index  index.html index.htm;
    }

    # 使 index.html 所需资源能被正确引用
    location /a {
        alias  D:\study\vite-ts\dist;
    }

    #配和路由history模式、解决不能刷新的问题
    location /b {
        try_files $uri $uri/ /index.html;
    }
}
```

#### nginx html 内

vue打包文件dist内的文件的存放路径 `D:\soft\nginx-1.22.0\html\c`

```sh
server {
    listen       80;
    server_name  localhost;

    # 返回 index.html
    location / {
        root   html/c;
        index  index.html index.htm;
    }

    # 使 index.html 所需资源能被正确引用
    location /a {
        alias  html/c;
    }

    #配和路由history模式、解决不能刷新的问题
    location /b {
        try_files $uri $uri/ /index.html;
    }
}
```

当 base: ‘/a/’，碰到 history: createWebHistory() （情况2）或者 当 base: ‘/a’，碰到 history: createWebHistory()（情况5）开发环境下会出现不能刷新的问题。

实际情况一般使用情况 1、4，有时也可以根据情况使用 2、3。

**设置 base: ‘/vite/’ 的作用:**

给 index.html 中所引用的资源路径添加前缀。


**设置 history: createWebHistory(‘/vite/’) 的作用：**

给所有路由 path 添加一个前缀。

**部署到根目录和非根目录的区别：**

部署到根目录

```
location / {
    index index.html index.htm
}
```

部署到非根目录

```
location /sub {
    index index.html index.htm
}
```
