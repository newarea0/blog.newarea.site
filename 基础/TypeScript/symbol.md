# 常见符号

## |

用于定义联合类型，表示取值可以为多种类型中的一种。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## &

扩展类型别名

```ts
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear: Bear = getBear();
bear.name;
bear.honey;
```
