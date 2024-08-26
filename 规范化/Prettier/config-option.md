# 常用配置选项

Prettier 的配置选项不多，并且官方也不在打算新增新选项。

以下测试实例采用了“控制变量法”。

## 1 Global

### 1.1 tabWidth

含义 | 默认值 | 备注
:-- | :-- | :--
指定缩进的长度 | 2 |

- `2`（默认、推荐）

  ```js
  function foo(a, b) {
    return a + b;
  }
  ```

- `3`

  ```js
  function foo(a, b) {
     return a + b;
  }
  ```
### 1.2 parser

含义 | 默认值 | 备注
:-- | :-- | :--
指定使用哪一种解析器| 无 | Prettier 会自动从输入文件路径推断解析器，因此您不必更改此设置。

### 1.3 printWidth

含义 | 默认值 | 备注
:-- | :-- | :--
一行最多多少个字符 | 80，推荐设置为120 |

### 1.4 useTabs

含义 | 默认值 | 备注
:-- | :-- | :--
缩进是否使用 tab | false（推荐） |

### 1.5 requirePragma

含义 | 默认值 | 备注
:-- | :-- | :--
是否仅格式化文件顶部包含特殊注释（称为 pragma）的文件 | false（推荐） |

## 2 Common

## 3 JavaScript

### 3.1 singleQuote

含义 | 默认值 | 备注
:-- | :-- | :--
是否使用单引号 | false，即默认使用双引号 |

- `false`（默认）

  ```js
  var foo = "hello"
  ```

- `true` （推荐）

  ```js
  var foo = 'hello'
  ```
### 3.2 semi

含义 | 默认值 | 备注
:-- | :-- | :--
是否在末尾加分号 | true，即默认在末尾加分号 |

- `true`（默认）

  ```js
  var foo = "hello";
  ```

- `false` （推荐）

  ```js
  var foo = 'hello'
  ```

### 3.3 bracketSpacing

含义 | 默认值 | 备注
:-- | :-- | :--
在对象自面量的大括号（即`{`、`}`）前后输出空格 | true |

- `true`（默认、推荐）

  ```js
  var foo = { name: "Jack" };
  ```

- `false`

  ```js
  var foo = {name: "Jack"};
  ```

### 3.4 trailingComma

[什么是尾逗号（Trailing commas）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#trailing_commas_in_functions)

含义 | 默认值 | 备注
:-- | :-- | :--
是否在多行以逗号分隔的句法结构中输入尾逗号 | ES5 |

- `none`（推荐）无尾随逗号

  ```js
  var foo = {
    name: "Jack"
  };
  ```

- `es5`（默认 ）添加ES5中被支持的尾逗号（如多行对象、数组）

  ```js
  var foo = {
    name: "Jack",
  };
  ```

- `all` 所有可能的地方都添加（包括函数的参数定义、函数调用）

  ```js
  var foo = {
    name: "Jack",
  };
  ```

### 3.5 arrowParens

含义 | 默认值 | 备注
:-- | :-- | :--
是否给单个参数的箭头函数参数部分添加括号 | always |

- `always`（默认、推荐）总是包含括号

  ```js
  var foo = (x) => x;
  ```

- `avoid` 忽略括号

  ```js
  var foo = x => x;
  ```

### 3.6 quoteProps

含义 | 默认值 | 备注
:-- | :-- | :--
对象属性名加引号的规则 | `as-needed` |

- `as-needed`（默认、推荐） 在需要引号的对象属性上添加引号

  ```js
  var a = {
    name: "Jack",
    "foo-bar": 20, // 以横杠相连命令的对象属性，需要加引号
  };

  var b = {
    "foo-bar": 20,
    name: "Jack",
  };
  ```

- `consistent` **如果对象中有一个属性有引号，则都加上引号**

  ```js
  var a = {
    "name": "Jack",
    "foo-bar": 20,
  };

  var b = {
    "foo-bar": 20,
    "name": "Jack",
  };
  ```

- `preserve` 在符合语法的情况下，输入什么样最终展示的就是什么样

  ```js
  var a = {
    name: "Jack",
    "foo-bar": 20,
  };

  var b = {
    "foo-bar": 20,
    name: "Jack",
  };
  ```



## 4 HTML

### 4.1 bracketSameLine

含义 | 默认值 | 备注
:-- | :-- | :--
在对象自面量的大括号（即`{`、`}`）前后输出空格 | true |

- `true`（默认、推荐）

  ```js
  var foo = { name: "Jack" };
  ```

- `false`

  ```js
  var foo = {name: "Jack"};
  ```

### 4.2 htmlWhitespaceSensitivity

含义 | 默认值 | 备注
:-- | :-- | :--
指定HTML, Vue, Angular, and Handlebars文件空格敏感性 | css |css 遵循 CSS `display` 属性默认值 <br>

- css 遵循 CSS `display` 属性默认值
- strict 空格敏感
- ignore 空格不敏感

## 5 Special

## 6 range

指定文件需要代码格式的范围

选项 | 含义 | 默认值 | 备注
:-- | :-- | :-- | :--
rangeStart | 开始位置 | `0` |
rangeEnd | 结束位置 | `Infinity` |

## 7 Vue

### 7.1 vueIndentScriptAndStyle

含义 | 默认值 | 备注
:-- | :-- | :--
Vue 单文件组件中 script 和 style 标签内代码是否缩进 | false |

- `false`（默认）不缩进

  ```js
  <template>
    <div></div>
  </template>

  <script setup>
  import { ref, reactive } from "vue";

  var msg = ref("hello");
  </script>

  <style scoped lang="scss">
  p {
    font-size: 20px;
  }
  </style>
  ```

- `true`（推荐）缩进

  ```html
  <template>
    <div></div>
  </template>

  <script setup>
    import { ref, reactive } from "vue";

    var msg = ref("hello");
  </script>

  <style scoped lang="scss">
    p {
      font-size: 20px;
    }
  </style>
  ```

## 8 React

### 8.1 jsxSingleQuote

含义 | 默认值 | 备注
:-- | :-- | :--
JSX 中是否使用单引号 | `false` |

- `false`（默认、推荐）使用双引号

  ```js
  function HelloWorld() {
    return <div className="hello"></div>;
  }
  ```

- `true` 使用单引号

  ```js
  function HelloWorld() {
    return <div className='hello'></div>;
  }
  ```

## 9 Other

### 9.1 endOfLine

在文件结尾插入空行

### 9.2 proseWrap

含义 | 默认值 | 备注
:-- | :-- | :--
指定文件折行方式 | `preserve` |

- always 当超过 printWidth 折行
- never 不折行
- preserve 按照文件原样折行



