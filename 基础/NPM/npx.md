# npx

[npx 使用教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)

Node 项目中使用命令的几种方式：

## 1. node-modules/.bin/

通常如果想在命令行中使用安装在项目本地的依赖包命令，需要加上 `node-modules/.bin/`，如 `node-modules/.bin/tsc index.ts`。

## 2. script

或者将命令放到 package.json 中的 `script`中：

```json
{
  "script": {
    "dev": "tsc index.ts"
  }
}
```

然后执行 `npm run dev`

## 3. npx

npx 让项目内部安装的模块用起来更方便，只要像下面这样调用就行。

`npx tsc index.ts`

npx 的原理很简单，就是运行的时候，会到 node_modules/.bin 路径和环境变量 `$PATH` 里面，检查命令是否存在。如果存在则使用 node_modules/.bin 路径或环境变量 `$PATH` 里的。如果不存在，则临时安装该模块，使用后再删除，避免全局安装模块。