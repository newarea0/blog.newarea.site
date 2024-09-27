# break、continue

## 1 break

用于 for、for...in、while、do...while、switch，**中止当前循环**，**并把程序控制流转到紧接着被中止语句后面的语句**。

### 1.1 for

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break
  console.log(i) // 依次打印出 0 1 2 3 4
}
```

### 1.2 for...in

```js
const condition = {
  name: 'Jack',
  country: 'CN',
  sex: 'male',
  address: 'SZ'
}

for (let key in condition) {
  if (key === 'sex') break
  console.log(key) // 依次打印出 name country
}
```

### 1.3 while

```js
let i = 0

while (i < 6) {
  if (i === 3) {
    break
  }
  i = i + 1
}

console.log(i) // 3
```

### 1.4 do...while

```js
let result = ''
let i = 0

do {
  i = i + 1
  result = result + i
} while (i < 5)

console.log(result) // 12345
```
### 1.5 switch

```js
const food = "sushi"

switch (food) {
  case "sushi":
    console.log("Sushi is originally from Japan.")
    break
  case "pizza":
    console.log("Pizza is originally from Italy.")
    break
  default:
    console.log("I have never heard of that dish.")
    break
}
```

## 2 continue

用于跳过循环中的一个迭代，并继续执行循环中的下一个迭代。与 break 语句的区别是， break 是结束整个循环体，continue是结束单次循环

- 在 while 循环中，控制流跳转回条件判断；
- 在 for 循环中，控制流跳转到更新语句。

### 2.1

```js
let text = '';

for (let i = 0; i < 10; i++) {
  if (i === 3) {
    continue
  }
  text = text + i
}

console.log(text) // 012456789
```

当 i 为 3 时，执行 continue，然后跳过 `text = text + 1`，接着执行 `i++`，至此本次迭代结束。

![04](https://image.newarea.site/20230730/04.png)

### 2.2 while

```js
i = 0
n = 0
while (i < 5) {
  i++
  if (i === 3) {
    continue
  }
  n += i
  console.log(n) // 依次打印出1 3 7 12
}
```
