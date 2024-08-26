# String.prototype.match()

```js
const reg = /([\u4e00-\u9fa5]{2,})\s?(\d+(\.\d+)?%)/
const str = '同比增长 19.6%'
console.log(str.match(reg))
```

打印结果

![01](https://image.newarea.site/20230804/01.png)

```js
const reg = /([\u4e00-\u9fa5]{2,})\s?(\d+(\.\d+)?%)/
const str = '同比增长 19%'
console.log(str.match(reg))
```

打印结果

![02](https://image.newarea.site/20230804/02.png)

可以看出，match 方法返回一个数组，数组第一项是正则表达式的完整匹配，和捕获组（正则表达式中括号匹配到的字符串）

- `/[\u4e00-\u9fa5]{2,5}\s?\d+(\.\d+)?%/`
- `([\u4e00-\u9fa5]{2,5})`
- `(\d+(\.\d+)?%)`
- `(\.\d+)`

| 正则 | 同比增长 19.6% | 同比增长 19% |
| --- | :---: | :---: |
|`/[\u4e00-\u9fa5]{2,5}\s?\d+(\.\d+)?%/`| 同比增长 19.6% | 同比增长 19% |
|`([\u4e00-\u9fa5]{2,5})`| 同比增长 | 同比增长 |
|`(\d+(\.\d+)?%)`| 19.6% | 19.6% |
|`(\.\d+)`| .6 | undefined |

注意：如果正则表达式使用了 g 标志，则仅返回完整匹配，不返回捕获组，如：

```js
const reg = /([\u4e00-\u9fa5]{2,5})\s?(\d+(\.\d+)?%)/g
const str = '同比增长 19.6%'
console.log(str.match(reg)) // ['同比增长 19.6%']
```
