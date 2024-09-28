# 发布 npm 包

可以参考[lib-flexible-for-dashboard](https://github.com/QuellingBlade/lib-flexible-for-dashboard)

> 将自己封装好的代码、方法发布到 npm 上供他人和自己使用，这样可以避免重复造轮子，提高开发效率，因此要熟练使用 node 的 module（模块）

## 1 步骤

1 前置条件，安装 node 环境，注册 npm 账号

2 新建一个文件夹 npm-demo，进入后执行 npm init，接下来是一长串表单

- name: 填写你这个包的名字，默认是你这个文件夹的名字。不过这里要着重说一下，最好先去 npm 上找一下有没有同名的包，否则发布会因为同名而报错。这里包名叫 npm-demo-zbx，初始化完成后也可以直接修改 package.json 文件
- version: 这个包的版本，默认 1.0.0
- description: 描述包时干嘛的，如 "my first npm package, just for test"
- entry point：入口文件，默认是 index.js，**即暴露包接口的文件**
- test command：测试命令，这个直接回车就好了，因为目前还不需要这个
- git repository：这个是 git 仓库地址，**如果你的包是先放到github上或者其他git仓库里**，这时候你的文件夹里面会存在一个隐藏的 `.git` 目录，npm 会读到这个目录作为这一项的默认值。如果没有的话，直接回车继续。
- keyword：这个是一个重点，这个关系到有多少人会搜到你的 npm 包。尽量使用贴切的关键字作为这个包的索引。如 "test,package"
- author：写你的账号或者你的 github 账号
- license：这个直接回车，开源文件来着

初始化完成后也可以直接修改 package.json 文件

3 然后再根目录下新建 index.js

```js
// index.js
module.exports = '123456'
```

4 `npm login`，登录npm（确保此时是在npm源下，若不是可以通过nrm切换）

5 `npm publish`，发布包，ok，此时在其他项目中就可以通过`npm i npm-demo-zbx -S`或`npm i npm-demo-zbx -D`来安装该包

## 2 发布后如何迭代

当更改了包内容后，应该修改 package.json 中 version，然后重新发布`npm publish`，否则发布会报错

- `npm version patch`: 升级修订版本号
- `npm version minor`: 升级次版本号
- `npm version major`: 升级主版本号

注意：**执行 `npm version xxx` 命令前需要先 commit Git 当前工作目录，否则命令执行不成功**：

![11](https://image.newarea.site/20230719/11.png)

执行完命令 `npm version xx` 后，会自动修改 package.json 至相应版本。并且会在 git 中打上相应的 tag

在其他项目更新生产环境依赖包，`npm update npm-demo-zbx -S`； 更新开发环境依赖包，`npm update npm-demo-zbx -D`


# 3 如何给 npm 包添加 Repository、Homepage 等信息

将项目初始化为一个 Git 项目

```sh
git init
```

在 github 上新建一个仓库，仓库名最好和 npm 包名相同，然后将本地项目和远程仓库关联，并将本地项目推送至远程仓库。

```sh
git remote add origin https://github.com/stormzhangbx/npm-demo-zbx.git
git branch -M main
git push -u orgin main
```

此时再在本地执行 `npm init`，根据提示重新生成 package.json 文件。 