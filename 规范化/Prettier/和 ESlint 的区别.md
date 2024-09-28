# 和 ESlint 的区别

Prettier 和 ESlint 中有一些相同的**样式规则**，如 semi，Prettier 通过 semi 决定是否去掉语句末尾的分号，ESlint 通过 semi 决定是否给出相关提示。

ESlint 中的规则大多数是**逻辑或语法规则**，Prettier 中没有这些规则，如 no-unreachable （在return，throw，continue和break语句之后禁止不可访问的代码）

用 Prettier 检查样式相关问题，用 ESlint 检查逻辑或语法错误。

## 相关工具

### 1 eslint-plugin-prettier

将 Prettier 规则作为 ESLint 规则运行

.prettierrc.js

```js
module.exports = {
  // ...
  semi: false,
  trailingComma: 'none'
}
```

表示使用 Prettier 格式化代码时，去掉语句后的分号、和尾逗号。

当代码违法上面的规则时，我想 ESlint 能给出相应的提示，可以使用 eslint-plugin-prettier 来实现这个功能。

#### 安装与使用

安装

```
npm install --save-dev eslint-plugin-prettier
```

使用

修改配置文件 .eslintrc.js

```js
module.exports = {
  extends: [
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': [1, { semi: false, trailingComma: 'none' }], // 注意这里的配置应该和 .prettierrc.js 中的一致
  }
}
```


### 2 eslint-config-prettier

用于配置 ESlint，关闭与 Prettier 冲突或不必要的样式规则。

#### 2.1 原理

直接将相关规则设置为 0 或者 off。

主要代码如下：

eslint-config-prettier/index.js

```js
"use strict";

const includeDeprecated = !process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED;

module.exports = {
  rules: {
    // The following rules can be used in some cases. See the README for more
    // information. (These are marked with `0` instead of `"off"` so that a
    // script can distinguish them.)
    "curly": 0,
    "lines-around-comment": 0,
    "max-len": 0,
    "no-confusing-arrow": 0,
    "no-mixed-operators": 0,
    "no-tabs": 0,
    "no-unexpected-multiline": 0,
    "quotes": 0,
    "@typescript-eslint/quotes": 0,
    "babel/quotes": 0,
    "vue/html-self-closing": 0,
    "vue/max-len": 0,

    // The rest are rules that you never need to enable when using Prettier.
    "array-bracket-newline": "off",
    "array-bracket-spacing": "off",
    "array-element-newline": "off",
    "arrow-parens": "off",
    "arrow-spacing": "off",
    "block-spacing": "off",
    "brace-style": "off",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "comma-style": "off",
    "computed-property-spacing": "off",
    "dot-location": "off",
    "eol-last": "off",
    "func-call-spacing": "off",
    "function-call-argument-newline": "off",
    "function-paren-newline": "off",
    "generator-star": "off",
    "generator-star-spacing": "off",
    "implicit-arrow-linebreak": "off",
    "indent": "off",
    "jsx-quotes": "off",
    "key-spacing": "off",
    "keyword-spacing": "off",
    "linebreak-style": "off",
    "multiline-ternary": "off",
    "newline-per-chained-call": "off",
    "new-parens": "off",
    "no-arrow-condition": "off",
    "no-comma-dangle": "off",
    "no-extra-parens": "off",
    "no-extra-semi": "off",
    "no-floating-decimal": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-multi-spaces": "off",
    "no-multiple-empty-lines": "off",
    "no-reserved-keys": "off",
    "no-space-before-semi": "off",
    "no-trailing-spaces": "off",
    "no-whitespace-before-property": "off",
    "no-wrap-func": "off",
    "nonblock-statement-body-position": "off",
    "object-curly-newline": "off",
    "object-curly-spacing": "off",
    "object-property-newline": "off",
    "one-var-declaration-per-line": "off",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "quote-props": "off",
    "rest-spread-spacing": "off",
    "semi": "off",
    "semi-spacing": "off",
    "semi-style": "off",
    "space-after-function-name": "off",
    "space-after-keywords": "off",
    "space-before-blocks": "off",
    "space-before-function-paren": "off",
    "space-before-function-parentheses": "off",
    "space-before-keywords": "off",
    "space-in-brackets": "off",
    "space-in-parens": "off",
    "space-infix-ops": "off",
    "space-return-throw-case": "off",
    "space-unary-ops": "off",
    "space-unary-word-ops": "off",
    "switch-colon-spacing": "off",
    "template-curly-spacing": "off",
    "template-tag-spacing": "off",
    "unicode-bom": "off",
    "wrap-iife": "off",
    "wrap-regex": "off",
    "yield-star-spacing": "off",
    "@babel/object-curly-spacing": "off",
    "@babel/semi": "off",
    "@typescript-eslint/brace-style": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/comma-spacing": "off",
    "@typescript-eslint/func-call-spacing": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/keyword-spacing": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-extra-parens": "off",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/object-curly-spacing": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-blocks": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/space-infix-ops": "off",
    "@typescript-eslint/type-annotation-spacing": "off",
    "babel/object-curly-spacing": "off",
    "babel/semi": "off",
    "flowtype/boolean-style": "off",
    "flowtype/delimiter-dangle": "off",
    "flowtype/generic-spacing": "off",
    "flowtype/object-type-curly-spacing": "off",
    "flowtype/object-type-delimiter": "off",
    "flowtype/quotes": "off",
    "flowtype/semi": "off",
    "flowtype/space-after-type-colon": "off",
    "flowtype/space-before-generic-bracket": "off",
    "flowtype/space-before-type-colon": "off",
    "flowtype/union-intersection-spacing": "off",
    "react/jsx-child-element-spacing": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-closing-tag-location": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-curly-spacing": "off",
    "react/jsx-equals-spacing": "off",
    "react/jsx-first-prop-new-line": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-multi-spaces": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-wrap-multilines": "off",
    "standard/array-bracket-even-spacing": "off",
    "standard/computed-property-even-spacing": "off",
    "standard/object-curly-even-spacing": "off",
    "unicorn/empty-brace-spaces": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/number-literal-case": "off",
    "vue/array-bracket-newline": "off",
    "vue/array-bracket-spacing": "off",
    "vue/arrow-spacing": "off",
    "vue/block-spacing": "off",
    "vue/block-tag-newline": "off",
    "vue/brace-style": "off",
    "vue/comma-dangle": "off",
    "vue/comma-spacing": "off",
    "vue/comma-style": "off",
    "vue/dot-location": "off",
    "vue/func-call-spacing": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/html-closing-bracket-spacing": "off",
    "vue/html-end-tags": "off",
    "vue/html-indent": "off",
    "vue/html-quotes": "off",
    "vue/key-spacing": "off",
    "vue/keyword-spacing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/mustache-interpolation-spacing": "off",
    "vue/no-extra-parens": "off",
    "vue/no-multi-spaces": "off",
    "vue/no-spaces-around-equal-signs-in-attribute": "off",
    "vue/object-curly-newline": "off",
    "vue/object-curly-spacing": "off",
    "vue/object-property-newline": "off",
    "vue/operator-linebreak": "off",
    "vue/quote-props": "off",
    "vue/script-indent": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/space-in-parens": "off",
    "vue/space-infix-ops": "off",
    "vue/space-unary-ops": "off",
    "vue/template-curly-spacing": "off",

    ...(includeDeprecated && {
      // Deprecated since version 4.0.0.
      // https://github.com/eslint/eslint/pull/8286
      "indent-legacy": "off",
      // Deprecated since version 3.3.0.
      // https://eslint.org/docs/rules/no-spaced-func
      "no-spaced-func": "off",
      // Deprecated since version 7.0.0.
      // https://github.com/yannickcr/eslint-plugin-react/blob/master/CHANGELOG.md#700---2017-05-06
      "react/jsx-space-before-closing": "off",
    }),
  },
};
```

#### 2.2 安装与使用

安装

```
npm install --save-dev eslint-config-prettier
```

使用

修改配置文件 .eslintrc.js

```js
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```