# git 忽略文件

```
|-- git-demo
    |-- .gitignore
    |-- src
        |-- test.txt
        |-- utils
            |-- index.js
            |-- api
                |-- index.js
```

## 1 基础规则

- 每一行是一条匹配规则，每个规则路径都是相对项目根目录。以 `#` 开头的行表示注释。

- 开头的斜杠表示项目根目录，推荐带上，如
  `src/utils/api/index.js` 等价与 `/src/utils/api/index.js`。

- `/src/utils` 既表示目录，也表示文件（src下如果存在文件utils）。

- 末尾的斜杠表示目录，如 `/src/utils/` 只表示目录。

如果想要忽略文件夹api下的index.js，可以这样写：

`src/utils/api`
`src/utils/api/`
`src/utils/api/index.js`

`/src/utils/api`
`/src/utils/api/`
`/src/utils/api/index.js`

可以发现，规则是需要写完整的路径名，要么具体到文件index.js本身，要么具体到index.js的父文件夹。

在了解下面规则后，上面的写法可以再简化

## 2 包含

`!` 表示包含某文件（夹），如果之前的规则排除了某文件（夹），可以通过 `!` 将其重新包含进来。但是，如果包含某文件的文件夹被排除了，即使使用 `!` 也无法重新将其包含进来。

## 3 量词

`*` 表示任意长度的字符，除了表示一个斜杠 `/`。

`?` 表示任意一个字符，除了斜杠 `/`。

## 4 范围

`[xyz]`、`[a-zA-Z]` 一个字符集合。匹配方括号中的任意字符

## 5 连续星号

`**/api` 匹配任意层级路径下的文件（夹）api

`src/**` 匹配目录src下任意层级的目录、文件

`src/**/index.js` 这里连续星号表示0个或更多文件夹
