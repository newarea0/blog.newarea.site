## JSON.stringify()

常用来：
- 对象深拷贝（会忽略函数和 undefined 类型的内容）
- 用于比较两个对象是否“相同”

JSON.stringify 除了可以转换对象、数组，也可以转换普通类型的值，如字符串、数字、布尔值、null、undefined，平常用的更多的是转换对象。

```js
JSON.stringify({
  name: 'Jack',
  friends: ['Bob', 'Marry']
})
// output: '{"name":"Jack","friends":["Bob","Marry"]}'
```
## 1 序列化对象时会忽略属性值为函数和 undefined、symbol的项

为什么会这样呢，MDN 上说 “JSON 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 null ”，由此可知函数和 undefined 是无法被序列化的

```js
JSON.stringify({
  a: 'Jack',
  b: 10,
  c: true,
  d: null,
  e: undefined,
  f: function(){
    console.log('hello')
  }
})
// '{"a":"Jack","b":10,"c":true,"d":null}'
```

所以通过 `JSON.parse(JSON.stringify(xxx))` 来深拷贝一个对象或通过`JSON.stringify(xxx)`来比较两个对象是否“相同”时，结果可能会 **“失真”**。

**当序列化数组时，函数和 undefined、symbol 会被转换成 null。**

**当单独序列化函数和 undefined、symbol时，会返回 undefined。**



##  2 当参数是字符串时，属性顺序如何排序

这里可以参考 Object.key() 的排序规则，先提取 Number 的 key，按升序排列，再提取 String 类型的 key，按定义顺序排列

注意事项：前一类需满足`0<number<2^32-1`，否则按字符串处理（见特殊示例）

```js
JSON.stringify({
  2: 'aa', 
  f: 5, 
  1: 'cc', 
  d: 4, 
  3: 'bb'
})
// '{"1":"cc","2":"aa","3":"bb","f":5,"d":4}'
```

## 3 JSON.stringify(value, replacer)

```js
var foo = {name: "Mozilla", model: 'box'}
function replacer(key, value) {
  console.log(1, key, value)
  if (key === "name"){
    return "hello";
  }
  return value
}
var bar = JSON.stringify(foo, replacer)
console.log(bar)
```

![05](https://image.newarea.site/20230730/05.png)

- 初始时，传入 replacer 函数的第一个参数是空字符串，第二个参数是被序列化的对象
- replacer 函数必须要有返回值，如下是错误的
  ```js
  var foo = {name: "Mozilla", model: 'box'}
  function replacer(key, value) {
    console.log(1, key, value)
    if (key === "name"){
      return "hello";
    }
  }
  var bar = JSON.stringify(foo, replacer)
  console.log(bar)
  ```
  ![06](https://image.newarea.site/20230730/06.png)