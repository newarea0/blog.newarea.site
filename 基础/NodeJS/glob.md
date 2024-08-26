# 模式匹配

用于匹配目录、文件，而不是字符串，类似与正则表达式，但他们有不同的语法、用途。例如，列出目录 src 下的所有目录、文件：

```shell
li src/**
```

## 1 语法

glob 默认不匹配隐藏文件（以点.开头的文件或目录）

### 1.1 基础语法

| 通配符 | 描述 | 示例 | 匹配 | 不匹配 |
| --- | --- | --- | --- | --- |
| `*` | 匹配0个或多个字符，包含空串 | `Law*` | `Law`, `Laws`和`Lawer` | `La`, `aw` |
| `?` | 匹配1个字符 | `?at` | `cat`, `bat` | `at` |
| `[abc]` | 匹配括号内字符集合中的单个字符 | `[cb]at` | `cat`, `bat` | `at`, `bcat` |
| `[a-z]` | 匹配括号内字符范围中的单个字符 | `[a-z]at` | `aat`, `bat`, `zat` | `at`, `bcat`, `Bat` |
| `[^abc]`或`[!abc]` | 匹配非括号内字符集合中的单个字符 | `[!CB]at` | `cat`, `bat` | `Cat`, `Bat` |
| `[^a-z]`或`[!a-z]` | 匹配非括号内字符范围中的单个字符 | `[!A-Z]at` | `aat`, `bat`, `zat` | `Aat`, `Bat`, `Zat` |

在 bash 命令行中[!abc]需要转义成[\!abc]

### 1.2 扩展语法

主要包含三种：

- Brace Expansion
- globstar
- extglob

| 通配符 | 描述 | 示例 | 匹配 | 不匹配 |
| --- | --- | --- | --- | --- |
| `{x, y, ...}` | Brace Expansion，展开花括号内容，支持展开嵌套括号 | `a.{png,jp{,e}g}` | `a.png`, `a.jpg`, `a.jpeg` |  |
| `**` | globstar，匹配所有文件和任意层目录，如果`**`后面紧接着`/`则只匹配目录，不含隐藏目录 | `src/**` | `src/a.js`, `src/b/a.js`, `src/b/` | `src/.hide/a.js` |
| `?(pattern-list)` | 匹配0次或1次给定的模式 | `a.?(txt|bin)` | `a.`, `a.txt`, `a.bin` | `a` |
| `*(pattern-list)` | 匹配0次或多次给定的模式 | `a.*(txt|bin)` | `a.`, `a.txt`, `a.bin`, `a.txtbin` | `a` |
| `+(pattern-list)` | 匹配1次或多次给定的模式 | `a.+(txt|bin)` | `a.txt`, `a.bin`, `a.txtbin` | `a.`, `a` |
| `@(pattern-list)` | 匹配给定的模式 | `a.@(txt|bin)` | `a.txt`, `a.bin` | `a.`, `a.txtbin` |
| `!(pattern-list)` | 匹配非给定的模式 | `a.!(txt|bin)` | `a.`, `a.txtbin` | `a.txt`, `a.bin` |

pattern-list 是一组以|作为分隔符的模式集合，例如abc|a?c|ac*

## 2 与正则表达式的差异

`*`、`?` 在正则表达式中是量词，表示匹配的字符或表达式的数量，与其前一个表达式组合使用。在glob 中表示字符，可以单独使用。

| 通配符 | glob | 正则表达式 |
| --- | --- | --- |
| * | 匹配0个或多个字符 | 匹配前一个表达式 0 次或多次。等价于 {0,} |
| ? | 匹配1个字符 | 匹配前面一个表达式 0 次或者 1 次。等价于 {0,1} |

## 相关库

[minimatch](https://github.com/isaacs/minimatch) 

[glob](https://github.com/isaacs/node-glob)




