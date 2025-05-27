# monorepo

> 利用单一仓库来管理多个 packages 的一种策略。

`monorepo` 就是把多个工程放到一个 git 仓库中进行管理，因此他们可以共享同一套构建流程、代码规范也可以做到统一，特别是如果存在模块间的相互引用的情况，查看代码、修改bug、调试等会更加方便。

pnpm 并不是通过目录名称，而是通过目录下 package.json 文件的 `name` 字段来识别仓库内的包与模块的。

```
|-- pnpm-workspace                 // 根项目
    |-- package.json
    |-- pnpm-lock.yaml
    |-- pnpm-workspace.yaml
    |-- common
        |-- components             // 子包，或者称作 workspace、工作空间
    |-- packages
        |-- app1                   // 子包，或者称作 workspace、工作空间
```

pnpm-workspace.yaml

```yaml
# 指定位于 pnpm-workspace/packages/、pnpm-workspace/common/ 内的直接子目录为工作区，具体语法参考 https://pnpm.io/zh/pnpm-workspace_yaml
packages:
  - 'packages/*'
  - 'common/*'
```

注意下面当前工作目录都是在根项目下。

## 根项目

### 依赖管理

使用选项 `--workspace-root`（简写 `-w`）给根项目安装、卸载依赖，如：

```sh
# 安装
pnpm i eslint -wD

# 卸载
pnpm uninstall eslint -w
```

如果直接根项目下安装依赖，会报错：

![](https://image.newarea.site/2025-03-25_22-39-20.png)

### 执行脚本

执行根项目 package.json 中脚本：

```sh
pnpm dev
```

## 子包

### 依赖管理

使用选项 `--filter xxx`（简写 `-F xxx`） 给子包安装、卸载依赖， `xxx` 是对应项目 package.json 里面的 `name` 属性，需要确保 `name` 唯一如：

```sh
# 为指定子包 app1 安装外部依赖 lodash-es
pnpm i lodash-es -F app1

# 为指定子包 app1 安装内部依赖 @common/components
pnpm i @common/components -F app1
```

子包 app1 package.json 变化：

```json
"dependencies": {
  "@common/components": "workspace:^", // [!code ++]
  "lodash-es": "^4.17.21" // [!code ++]
}
```

### 执行脚本

执行子包 app1 package.json 中脚本：

```sh
# 注意不能写成 pnpm dev -F app1
pnpm -F app1 dev
```

或者配置根项目 package.json：

```json
"scripts": {
  "dev:app1": "pnpm -F app1 dev", // [!code ++]
},
```

然后直接执行：

```sh
npm dev:app1
```

##  `.npmrc` 中 `link-workspace-packages` 设置为 `true`

[link-workspace-packages](https://pnpm.io/zh/npmrc#link-workspace-packages)

在 pnpm 9.0 后，`link-workspace-packages` 的默认值为 `false`，表示依赖包将全部从注册源下载并安装。导致安装内部依赖时报错。

![](https://image.newarea.site/2025-03-26_00-36-28.png)

解决办法是在文件 `.npmrc` 中将 `link-workspace-packages` 设置为 `true`，

```
link-workspace-packages=true
```

当然主动在 package.json 中声明的内部依赖不受影响，如 `"@common/components": "workspace:^"`，然后执行 `pnpm i -w`、`pnpm i -F app1` 是能成功的。
