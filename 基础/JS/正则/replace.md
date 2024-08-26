返回一个新字符串，不改变原字符串。

语法：`str.replace(regexp|substr, newSubStr|function)`

第一个参数是一个正则表达式或字符串，表示模式，即原字符串中哪些字符串需要被替换。
第二个参是是一个字符串或函数，表示替换项，即用来替换旧字符串的新字符串。

```js
const reg = /([\u4e00-\u9fa5]{2})\s?(\d+(\.\d+)?%)/
const str = '同比增长 19.6%'
const newStr = str.replace(reg, function (match, p1, p2, p3) {
  console.log(match) // 增长 19.6%
  console.log(p1) // 增长
  console.log(p2) // 19.6%
  console.log(p3) // .6
  return 'hello'
})
console.log(str) // 同比增长 19.6%
console.log(newStr) // 同比hello
```

| 正则 | 同比增长 19.6% |
| --- | :---: | :---: |
|`/[\u4e00-\u9fa5]{2,5}\s?\d+(\.\d+)?%/`| 同比增长 19.6% |
|`([\u4e00-\u9fa5]{2,5})`| 增长 |
|`(\d+(\.\d+)?%)`| 19.6% |
|`(\.\d+)`| .6 |

如果想将字符串中所有的匹配项都替换掉，正则表达式需要加上标志g。

```js
const reg = /([\u4e00-\u9fa5]{2})\s?(\d+(\.\d+)?%)/g
const str = '同比增长 19.6%, 同比下降 20%'
const newStr = str.replace(reg, function (match, p1, p2, p3) {
  console.log(match)
  console.log(p1)
  console.log(p2)
  console.log(p3)
  return 'hello'
})
```

打印如下

![03](https://image.newarea.site/20230804/03.png)
