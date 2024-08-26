# 全局变量

定义额外的全局变量

- readonly/false——只读
- writable/true——可写
- off——禁用该全局变量
- 说明：true/false 等价于只读/可写，但不推荐使用

## 1 不定义全局变量 foo

![09](https://image.newarea.site/20230718/09.png)

## 2 定义只读环境变量

```js
// .eslintrc.js
module.exports = {
  globals: {
    foo: 'readonly'
  }
}
```

![07](https://image.newarea.site/20230718/07.png)

## 3 定义可写环境变量

```js
// .eslintrc.js
module.exports = {
  globals: {
    foo: 'writable'
  }
}
```

![08](https://image.newarea.site/20230718/08.png)