# async-validator

https://www.null123.com/article/detail-482846.html

https://juejin.cn/post/6888681604621795336?searchId=20240619221018B5DE9AD770FFCD07F952

https://www.php.cn/faq/406545.html

## 1 使用步骤

```js
// 1 导入依赖包
import Validator from 'async-validator'

// 2 定义校验规则
const rules = {
  // name 字段的校验规则，默认字符串类型
  name: {
    required: true,
    message: '姓名不能为空'
  },
  // type、min 都是校验条件，违反任何一个条件，都会产生对应的错误
  // 该项校验通过的场景：
  // 1. source 中没有 age 属性
  // 2. age 值为 undefined、null
  // 3. age 值类型为数字，且大于 18
  age: {
    type: 'number',
    min: 18
  }
}

// 3 创建校验器
const validator = new Validator(rules)

// 4 执行校验器的 validate 方法，参数包括：
// - 要校验的数据源 source
// - 配置 options
// - 验证后的回调函数 callback
validator.validate({ name: 'muji' }, (errors, fields) => {
  if (errors) {
    // 校验失败，errors 是一个所有 error 组成的数组；field 是一个对象，键是 field，值是对应的 errors 数组。
    // 校验成功，errors 为 null，fields 为一个与 source 相同的对象
    // ...
    return
  }
  // 校验通过
  // ...
})
```

## 2 如何定义规则

> 如果某字段就一条校验规则，使用**对象的方式**；如果有多条校验规则，使用**数组的方式**；对于复杂场景可以使用**函数的方式**。

### 2.1 对象的方式

一个字段一条规则：

```js
const rules = { 
  // ...
  name: { type: 'string', required: true } 
}
```

### 2.2 数组的方式

[Multiple Rules](https://github.com/tmpfs/async-validate?tab=readme-ov-file#multiple-rules)

一个字段多条规则：

```js
const rules = { 
  // ...
  name: [
    { type: 'string' },
    { required: true }
  ]
}
```

校验器配置选项 `firstFields` 就是用于这种场景，如依次校验字段 `name` 的两条规则，当第一条规则（`{ type: 'string' }`）不通过，则终止校验下一个规则。

### 2.3 函数的方式

```js
const rules = { 
  // ...
  name(rule, value, callback, source, options) {
    // ...
  }
}
```

## 3 校验器配置选项

- first: 一个布尔值，如果出现字段不通过，终止验证后面的字段

- firstFields: 布尔值或者字符串，如果验证一个字段时，一个规则不通过，终止验证下个规则(一个字段，多个规则的情况)

`firstFields` 是针对单个字段多规则的情况下使用，而 `first` 是针对所有字段。

## 4 关于路径

[Deep Rules](https://github.com/yiminghe/async-validator?tab=readme-ov-file#deep-rules)

提供了校验规则 `rules`、数据源 `source`，async-validator 是如何根据 `rules` 中属性路径去 `source` 查找相应的值。

Deep Rules 是处理 object 或者 array 类型的，使用了 `fields` 或 `defaultField`。

- fields：Deep Rules 的时候使用，定义下一层的字段名以及规则。
- defaultField: Deep Rules 的时候使用，所有下一层的字段都会采用该规则，可以被fields替换。

```js
const rules = {
  name: {
    required: true,
    message: '姓名不能为空'
  }
}

const source = { name: 'Jack' }
```

路径为 `name`，`rules.name` <-> `source.name`

```js
const rules = {
  address: {
    type: 'object',
    required: true,
    fields: {
      street: { type: 'string', required: true },
      city: { type: 'string', required: true },
      zip: { type: 'string', required: true, len: 8, message: 'invalid zip' },
    },
  },
}

const source = {
  address: {
    street: 'yh',
    city: 'sz',
    zip: '00000000',
  }
}
```

## 5 validate 方法

参数

返回值

## 6 实际例子

参考

- [async-validator](https://github.com/yiminghe/async-validator)
