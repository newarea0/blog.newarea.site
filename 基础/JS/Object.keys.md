# Object.keys

## 1 参数为对象

先提取 Number 的 key，按升序排列，再提取 String 类型的 key，按定义顺序排列

注意事项：前一类需满足`0<number<2^32-1`，否则按字符串处理（见特殊示例）

```js
// 属性为字符（串）
Object.keys({
  c: 11,
  bb: 22,
  a: 33
})
// output: ["c", "bb", "a"]

// 属性为数字
Object.keys({
  2: 'aa',
  1: 'cc',
  3: 'bb'
})
// output: ["1", "2", "3"]

// 属性有字符串、数字
Object.keys({
  2: 'aa',
  f: 5,
  1: 'cc',
  d: 4,
  3: 'bb'
})
// output: ["1", "2", "3", "f", "d"]

// 特殊示例：属性有字符串、负数、正数、大于2^32-1的数
Object.keys({
  '2': 'aa',
  'f': 5,
  '1': 'd',
  '4294967295': 'cc', // 2^32 - 1
  'd': 4,
  '-3': 'bb',
  '4294967294': 'cc', // 2^32 - 2
})
// output: ["1", "2", "4294967294", "f", "4294967295", "d", "-3"]
```

## 2 参数为数组

按顺序返回数组元素索引字符串

```js
Object.keys([
  'a',
  false,
  /d+/
])
// output: ["0", "1", "2"]
```

## 3 参数为字符串

按顺序返回字符串字符下标

```js
Object.keys('ghjgvjh')
// output: ["0", "1", "2", "3", "4", "5", "6"]
```

## 4 参数为布尔、数字、BigInt、Symbol

返回空数组，因为不可迭代

```js
Object.keys(true) // output: []
Object.keys(312) // output: []
Object.keys(BigInt(546))	// output: []
Object.keys(Symbol('sa54'))	// output: []
```

## 5 参数为null、undefined时

抛出错误，因为它们无法转换成对象

```js
Object.keys(null)
// output: Uncaught TypeError: Cannot convert undefined or null to object

Object.keys(undefined)
// output: Uncaught TypeError: Cannot convert undefined or null to object
```
