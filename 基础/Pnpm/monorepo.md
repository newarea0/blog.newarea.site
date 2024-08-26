# monorepo

当仓库多项目，`monorepo` 就是把多个工程放到一个 git 仓库中进行管理，因此他们可以共享同一套构建流程、代码规范也可以做到统一，特别是如果存在模块间的相互引用的情况，查看代码、修改bug、调试等会更加方便。


在一个终端中执行命令，有时需要对不用的 package 执行操作，为了避免来回进入多个不同 package，可以在项目根目录下使用 `--filter`

```
|-- pnpm-workspace
    |-- package.json
    |-- pnpm-lock.yaml
    |-- pnpm-workspace.yaml
    |-- packages
        |-- add-one
        |-- add-two
        |-- adder
```

想在 add-one 下安装 dayjs，有两种方式：

方式一：

进入目录 pnpm-workspace/packages/add-one 下，执行 `pnpm install dayjs`

方式二：

在根目录 pnpm-workspace 下执行 `pnpm install dayjs --filter 'add-one'`