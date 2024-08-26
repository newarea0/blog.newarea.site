# eslint-config-* 和 eslint-plugin-* 的区别

### 前言

应该有很多同学在配置`eslint文件`的时候，会有这样的疑问，为什么每种校验模块包要分成 `config/plugin` 两个版本，并且有时候在`plugins`引入了插件，还可以再以extends方式去使用插件，既然插件这么全能，为何要有 `eslint-config-*` 呢？

### 探索

#### eslint-config-* 的配置形式

##### 以 eslint-config-airbnb 为参考

```js
module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    './rules/react',
    './rules/react-a11y',
  ].map(require.resolve),
  rules: {}
}
```

你会发现就是一个简单的`.eslintrc`对象，再往它 ---> `继承的文件` 里去看

##### 以 ./rules/react 为参考

```js
module.exports = {
  plugins: [
    'react',
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {...无数规则声明s}
}
```

是不是很神奇，继承链的顶端忽然之间就没那么神秘了。其实就是一个 常规的`.eslintrc`文件，那我们可以理解最终被 `eslint`所识别的配置文件就是所有继承文件的属性合并，并且子类覆盖父类。

### eslint-plugin-* 的配置形式

#### 以eslint-plugin-react 为参考对象

```js
// 引用规则的验证逻辑块
const allRules = {
  'boolean-prop-naming': require('./lib/rules/boolean-prop-naming'),
  'button-has-type': require('./lib/rules/button-has-type'),
  ...
};

// 导出的对象
module.exports = {
  deprecatedRules,
  rules: allRules,
  configs: {
    recommended: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'react/display-name': 2,
        'react/jsx-key': 2,
        ...
      }
    },
    all: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: activeRulesConfig
    }
  }
};

```

recommended、all 中捆绑了不同的配置，从而可知
- `eslint-config-*` 只能提供一套配置，而 `eslint-plugin-*` 可以提供多套配置
- `eslint-plugin-*` 中可以自定义 rule、environment、processor 等，而 `eslint-config-*` 不可以
- `eslint-plugin-*` 功能大而全，`eslint-config-*` 功能则比较单一

