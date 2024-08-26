# 类型判断式 type predicates

[Using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

[类型判断式(type predicates)](https://ts.yayujs.com/handbook/Narrowing.html#%E7%B1%BB%E5%9E%8B%E5%88%A4%E6%96%AD%E5%BC%8F-type-predicates)

![04](https://image.newarea.site/20230713/04.png)

![05](https://image.newarea.site/20230713/05.png)

等价于

![06](https://image.newarea.site/20230713/06.png)

在这个例子中，`pet is Fish` 就是我们的类型判断式，一个类型判断式采用 `parameterName is Type`的形式， `parameterName` 必须是当前函数的参数名，**意思是如果函数返回 `true`，那么参数 `parameterName` 类型就是 `type`**。

类型判断式是类型收窄的一种形式，其他形式还有 typeof 收窄、in 操作符收窄、instanceof 收窄、真值收窄等。

## 什么是类型收窄

![07](https://image.newarea.site/20230713/07.png)

上面例子中，参数 `str` 的初始类型是由 `string`、`string[]`、`null` 组成的联合类型，经过“操作”后，类型变得更具体、确切。


