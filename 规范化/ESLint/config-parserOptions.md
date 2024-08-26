# 解析器parser及其配置

[ESLint 官网说明](https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options)

[ESLint 的 parser 是个什么东西](https://zhuanlan.zhihu.com/p/295291463)

ESLint 在进行校验之前，会将代码转化为 AST（抽象语法树）。ESLint 默认使用的解析器是 [Espree](https://github.com/eslint/espree)。

Espree 只转换 js，且默认支持 ES5 的语法。

查看 Espree 的文档可知，ecmaVersion、sourceType、ecmaFeatures最终都是用来配置解析器的：

- ecmaVersion：Espree 默认只转换 ES5 语法，通过配置该属性可以转换其他版本 ECMAScript。

- sourceType：默认是 `script`，如果要解析的代码是 ECMAScript 模块，应该设置为 `module`

- ecmaFeatures：设置一些额外的特性。

使用 Parcel 创建一个 Espree demo

![03](https://image.newarea.site/20230718/03.png)

![04](https://image.newarea.site/20230718/04.png)

配置了 ecmaVersion 为6后，Espree 就可以正常工作。

![05](https://image.newarea.site/20230718/05.png)

![06](https://image.newarea.site/20230718/06.png)

Typescript 也有解析器，作用同样是将源码转换为 AST，这个 AST 被 Typescript 编译器其他部分用来做校验例如类型检查等，但是该 AST 与 ESLint 的默认解析器 Espree 转换出来的 AST 的内容和格式是不一样的，所以 ESLint 是不能识别 typescript 的 parser 转换出来的 AST 内容。所以如果源码是 Typescript，应该使用 @typescript-eslint/parser 解析器。

