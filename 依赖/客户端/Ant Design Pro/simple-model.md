# 简易数据流

一种全局的状态管理，Vue 中也有相关概览，如 Pinia。下面是使用数据流的简单例子。

## 一个简单例子

### 1 创建 Model

数据流管理插件采用约定式目录结构，这里我们创建文件 `src/models/counter.ts`，文件导出一个自定义的 hook 函数：

```ts
import { useState, useCallback } from "react";

export default () => {
  const [counter, setCounter] = useState(0)
  const increment = useCallback(() => setCounter(c => c + 1), [])
  const decrement = useCallback(() => setCounter((c) => c - 1), []);
  return { counter, increment, decrement };
}
```

这就是一个 Model。不同的组件在使用该 Model 时，拿到的是同一份状态或数据。

### 2 使用 Model

页面1：

```tsx
// src/pages/ant-design/form/index.tsx
import React from 'react';
import { Space } from 'antd';
import { useModel } from "umi";

export default () => {
  const { counter, increment, decrement } = useModel('counter')

  return (
    <>
      <Space>
          <Button onClick={increment}>+</Button>
          <Button onClick={decrement}>-</Button>
        </Space>
        <span>{counter}</span>
    </>
  )
}
```

页面2：

```tsx
// src/pages/ant-design/table/index.tsx
import { useModel } from "umi";

export default () => {
  const { counter, increment, decrement } = useModel('counter')

  return (
    <>
      <span>{counter}</span>
    </>
  )
}
```

在页面1中通过点击按钮修改 counter 值，如修改后为 5，点击菜单，进入页面2，发现 counter 也是5。

## 全局初始状态

[全局初始状态](https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81) 是一种特殊的 Model，特殊点是全局初始状态在整个 Umi 项目的最开始创建。
