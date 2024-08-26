# 常用函数

## 数组

### uniq

```js
_.uniq(array)
```

创建一个去**重后**的 array 数组副本。只有第一次出现的元素才会被保留。

```js
_.uniq([1, 1, 2, 2, 3]) // [1, 2, 3]
```

### remove

```js
/** 
 * @param {array} array - 表示要修改的数组
 * @param {Function} [predicate=_.identity] - 为数组中的每个元素执行的函数，如果返回真值，则该元素被移除，函数执行时会传入 3 个参数：value, index, array
 */
_.remove(array, [predicate=_.identity])
```

移除数组中满足条件的所有元素，并返回移除元素组成的数组。**注意该方法会修改原数组**。

```js
var array = [1, 2, 3, 4];
var evens = _.remove(array, item => item % 2 === 0);
console.log(array) // [1, 3]
console.log(evens) // [2, 4]
```

### difference

```js
_.difference(array, [values])
```

创建一个新数组，这个数组中的值，为第一个数组排除了给定数组中的值。可以看做第一数组“减去”给定数组的结果。

```js
_.difference([1, 2, 3, 4], [3, 4]) // [1, 2]
```

### omit

与 `_.pick` 相反，创建一个由 object 中剔除选中属性后组成的新对象。

```js

var object = { 'a': 1, 'b': '2', 'c': 3 }
 
_.omit(object, ['a', 'c']) // { 'b': '2' }
```

## 集合

### groupBy

```js
_.groupBy(collection, [iteratee])
```

根据指定的标准将集合进行分组，并返回一个包含分组结果的对象。

- collection：要被分组的集合，可以是数组、对象或字符串。
- iteratee：一个函数或属性名称，用作每个元素的分组标准。默认情况下，它使用自身作为键进行分组。

```js
const users = [
  { name: 'Jack', age: 18 },
  { name: 'Marry', age: 20 },
  { name: 'Bob', age: 18 },
  { name: 'Tom', age: 30 },
]
// 将数组 users 按 age 分组
console.log(_.groupBy(users, age))
/*
{
  18: [
    { name: 'Jack', age: 18 },
    { name: 'Bob', age: 18 }
  ],
  20: [
    { name: 'Marry', age: 20 }
  ],
  30: [
    { name: 'Tom', age: 30 }
  ]
}
*/
```

```js
const numbers = [1, 2, 3, 4, 5, 6];
// 将数组 numbers 按奇数偶数分组
const result = _.groupBy(numbers, (num) => num % 2=== 0 ? 'even': 'odd');
console.log(result);
/*
{
  odd: [1, 3, 5],
  even: [2, 4, 6]
}
*/
```

## 语言

### isPlainObject 和 isObject

**isPlainObject**

```js
_.isPlainObject(value)
```

检查 value 是否是普通对象。 也就是说该对象由 Object 构造函数创建，或者 [[Prototype]] 为 null 。

```js
function Foo() {
  this.a = 1;
}
 
_.isPlainObject(new Foo);
// => false
 
_.isPlainObject([1, 2, 3]);
// => false
 
_.isPlainObject({ 'x': 0, 'y': 0 });
// => true
 
_.isPlainObject(Object.create(null));
// => true
```

**isObject**

检查 value 是否为 Object 的 [language type](https://262.ecma-international.org/7.0/#sec-ecmascript-language-types)。 (例如：arrays、function、 objects、regexes、new Number(0)、以及 new String(''))

### isFunction

检查是否为函数。

### isBoolean

检查是否为布尔类型。

### cloneDeep 深拷贝和浅拷贝的区别

### isEmpty

之前判断一个空对象（`{}`）是这样写：

```js
const o = {}
const isEmpty = Object.keys(o).length === 0
```

### isNil

检查值是否为 `null` 或 `undefined`。

### isNull

检查值是否为 `null`。

## 对象

### pick

```js
/**
 * @param {Object} object - 来源对象
 * @param {string|string[]} [props] - 来源对象
 */
_.pick(object, [props])
```

创建一个由 object 中选中属性组成的新对象。

```js
var object = { 'a': 1, 'b': '2', 'c': 3 }
 
_.pick(object, ['a', 'c']) // { 'a': 1, 'c': 3 }
```

## 数学

### round

```js
/**
 * @param {*} number 要四舍五入的数字
 * @param {number} precision 四舍五入的精度
 * @returns {number}
 */
_.round(number, [precision=0])
```

将一个参数（数字、字符串）四舍五入到指定的精度。注意第一参数可以是数字或者字符串，返回值为数字。

该函数作用类似于 `Number.prototype.toFixed()`，但 `round` 比 `toFixed` 更灵活、方便，因为 `toFixed` 只能用于数字，且返回值为字符串。

```js
_.round(4.006);
// => 4
 
_.round(4.006, 2);
// => 4.01

_.round('4.006', 2)
// => 4.01
```
