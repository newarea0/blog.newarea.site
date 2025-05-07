`Commitizen` 是一个帮助你编写**规范化 Git 提交信息**的工具，常用于配合 `Conventional Commits`（约定式提交规范）使用。

控制台出现交互式的会话，提示填写必要的提交字段。方便人们写出符合规范的 commit 信息，该工具运行在 commitlint 之前。

它的主要功能是：

* 在你执行 `git commit` 时，**引导你选择类型（如 feat、fix、docs）并填写描述**；
* 保证提交信息结构一致，方便自动生成 changelog、版本控制、CI 流程等。

---

## ✅ 为什么使用 Commitizen？

* 保证所有开发者提交格式统一；
* 提交历史更清晰（自动生成 changelog）；
* 配合工具（如 semantic-release）实现自动版本发布。

---

## 🛠 用法步骤

### 1. 安装 Commitizen

```bash
npm install --save-dev commitizen
```

### 2. 初始化配置

```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这会使用 `cz-conventional-changelog` 适配器，它符合 Conventional Commits 规范。

在 `package.json` 中会自动添加：

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

---

### 3. 使用 Commitizen 提交代码

```bash
npx cz
# 或者用命令别名（建议）：
npx git-cz
```

你会看到一个 CLI 提示界面，逐步选择：

```
? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code
...
```

最终生成的提交信息可能是这样的：

```
feat(login): add remember me option
```

---

## ✅ 搭配 Commitlint + Husky 强制检查提交格式

1. 安装：

```bash
npm install --save-dev @commitlint/{config-conventional,cli}
```

2. 新建配置文件 `commitlint.config.js`：

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3. 添加 Git hook（用 Husky）：

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'
```

这样提交时如果格式不对会被拦截。

---

## 💡 快速提交命令简写（可选）

你可以在 `package.json` 中添加脚本：

```json
"scripts": {
  "commit": "cz"
}
```

以后就可以用 `npm run commit` 代替 `git commit`。

---

需要我给你配置一个含有 Commitizen + Husky + Commitlint 的完整前端项目示例吗？

参考：

- [@commitlint/prompt-cli](https://commitlint.js.org/guides/use-prompt.html)
