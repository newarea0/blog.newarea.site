# install及参数

install命令用于安装一个包以及它所依赖的任何包

## 1 -g

安装在全局的地方，所有node项目都可以使用这个module，安装路径可以通过`npm root -g`查看。

## 2 不带参数

`npm i` 或 `npm install`

默认会安装两种（dependencies 字段和 devDependencies 字段中的所有模块）依赖，安装在项目目录下的node_modules目录中。

## 3 --save-prod或是-P(--save或者-S)

安装在项目目录下的node_modules目录中，并把安装包信息写入package.json文件的dependencies字段中，表明是运行时依赖，正常使用`npm install`时，会下载dependencies和devDependencies中的模块，当使用`npm install –production`或者注明NODE_ENV变量值为production时，只会下载dependencies中的模块。

如vue、vue-router

## 4 --save-d或者-D

安装在项目目录下的node_modules目录中，并安装包信息写入package.json文件的devDependencies字段中，表明是开发时依赖。

如webpack、loader类、测试类、优化类的包

## 5 只写包名

如 `npm i loadsh`，将会把安装包信息写入package.json文件的dependencies。

如果我们开发的是一个库，当别人安装我们的包时，库 package.json 文件 devDependencies 中列出的包，是不会被 npm 下载的，即只会安装库本身，和该库package.json 文件 dependencies 中列出的包。

参考 [npm install 你很明白吗](https://blog.csdn.net/csdn_yudong/article/details/83721870)
