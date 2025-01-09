# type、interface

在 TypeScript 中，`interface` 和 `type` 都可以用来定义类型，它们有许多相似之处，但也有一些关键的区别。下面是它们的主要差异：

### 1. **声明合并**
   - **`interface`** 支持声明合并（declaration merging）。如果你定义了多个相同名称的 `interface`，它们会自动合并为一个接口。
   - **`type`** 不支持声明合并。多个相同名称的 `type` 会导致错误。

   ```ts
   interface User {
     name: string
   }

   interface User {
     age: number
   }

   // 合并后的结果：
   // interface User {
   //   name: string
   //   age: number
   // }
   ```

   ```ts
   type User = {
     name: string
   }

   type User = {
     age: number
   }

   // 错误：Duplicate identifier 'User'.
   ```

### 2. **扩展**
   - **`interface`** 可以通过 `extends` 来继承其他接口。
   - **`type`** 也可以通过交叉类型（`&`）来扩展其他类型，但其语法上稍微不同。

   ```ts
   interface Person {
     name: string
   }

   interface Employee extends Person {
     salary: number
   }
   ```

   ```ts
   type Person = {
     name: string
   }

   type Employee = Person & {
     salary: number
   }
   ```

### 3. **声明的复杂性**
   - **`interface`** 主要用于定义对象的结构，如类的形状、函数签名等。
   - **`type`** 更灵活，可以用来定义任何类型，包括字面量类型、基本类型、联合类型、交叉类型、元组等。

   ```ts
   // 使用 interface 定义对象结构
   interface Point {
     x: number
     y: number
   }

   // 使用 type 定义联合类型
   type Status = 'success' | 'failure'

   // 使用 type 定义元组
   type Tuple = [number, string]
   ```

### 4. **类型别名 vs 接口的语法**
   - **`interface`** 用于定义对象或类的形状，通常在面向对象编程中使用。
   - **`type`** 用于定义更复杂的类型（如联合类型、交叉类型等），更具灵活性。

   ```ts
   interface Car {
     brand: string
     model: string
   }

   type Vehicle = {
     brand: string
     model: string
   }
   ```

### 5. **是否可以定义函数类型**
   - **`interface`** 可以定义函数类型，但语法较为冗长。
   - **`type`** 定义函数类型时更简洁。

   ```ts
   interface Add {
     (a: number, b: number): number
   }

   type Add = (a: number, b: number) => number
   ```

### 6. **联合类型和交叉类型**
   - **`type`** 可以定义联合类型、交叉类型等，而 **`interface`** 不能直接用于这些复杂类型的定义。

   ```ts
   type A = string | number // 联合类型

   type B = { name: string } & { age: number } // 交叉类型
   ```

### 总结
- 使用 **`interface`** 时，适合定义对象或类的结构，特别是当你需要扩展或实现接口时。
- 使用 **`type`** 时，更适合定义复杂的类型（如联合类型、交叉类型、字面量类型等）。

通常，**推荐使用 `interface`** 来定义对象类型，除非你需要更复杂的类型结构，这时可以选择 `type`。
