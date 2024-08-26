# 遍历数组删除指定元素

 ## 1、forEach

【1】例子：循环arr数组，将item为1的元素从数组中删除

```js
let arr = [1, 1, 2]
arr.forEach((item, index, arr) => {
  if (item == 1) {
    arr.splice(index, 1)
  }
})
console.log(arr)// [1, 2]
```

【2】结果：循环之后打印 [1, 2]， 还有一个1无法删除

【3】原因分析：

①第一次forEach循环，arr是[1, 1, 2]，index是0，item是1，if条件成立，使用splice删除了item1，arr变成[1, 2]
②第二次forEach循环，arr是[1, 2]，index是1，item是2，if条件不成立，使用splice无法删除了第二个重复的1
③原因是使用splice容易使数组的index乱序。

## 解决方法

```js
let arr = [1, 1, 2]
arr = arr.filter(item => {
  return item != 1
})
console.log(arr) // [2]
```

或者

```js
let arr = [1, 1, 2]
for (var i = 0; i < arr.length; i++) {
　if (...) {
　　arr.splice(i, 1) // 将使后面的元素依次前移，数组长度减1
　　i-- // 如果不减，将漏掉一个元素
　}
}
```