# 如何运行 Jest 单元测试

前几天在基础 API 上面转了一下 现在准备向原理源码进军了。有个小问题先要处理一下。就是研究一下如何把 Vue3 的单元测试跑起来。毕竟光读代码不运行是没有灵魂的。歪歪一下中国的球迷是不是就是光看不踢。

Vue3 代码是基于 Jest 进行测试，我们先简单看看什么是 jest

## Jest 简介

> Jest 是 Facebook 的一个专门进行 Javascript 单元测试的工具，适合 JS、NodeJS 使用，具有零配置、内置代码覆盖率、强大的 Mocks 等特点。

总之目前来讲 JS 界 Jest 是一套比较成体系的测试工具。为什么这么说呢比如拿以前的测试框架 Mocha 对比 他只是一个测试框架，如果你需要断言还需要专门的断言库比如 assert shoud expect 等等 如果需要 Mock 还需要住啊们的库来支持很不方便。不过 Jest 基本上可以一次性搞定。

## 目录文件名约定

Jest 测试代码和逻辑代码是遵从约定优于配置（convention over configuration）其实这个也是目前编程世界普遍接受的原则。

Jest 的测试代码是基于以下约定

- 测试文件名要以 spec 结果
- 测试文件后缀为 js，jsx，ts，tsx
- 测试文件需要放在 tests/unit/目录下或者是/**tests**/目录下 只要满足这三个要求的测试文件，使用运行 jest 时就会自动执行。

其实这个规定类似于 Maven 对于测试代码和逻辑代码的约定只是 test 目录换成了**tests**

下面我们具体看一下 Vue3 源码的目录结构

![](https://image.newarea.site/20230525/25.jpg)

其实逻辑代码和测试代码对应放置还是很方便的 我们再看看另外一个 reactive 这个包

![](https://image.newarea.site/20230525/26.jpg)

## 运行全量测试

package.json 文件中已经配置好了 jest

![](https://image.newarea.site/20230525/27.jpg)

```
npm run test
复制代码
```

![](https://image.newarea.site/20230525/28.jpg)

## 覆盖率

我们增加一个参数把覆盖率跑出来

```
npx jest --coverage
复制代码
```

![](https://image.newarea.site/20230525/29.jpg)

实际上跑覆盖率的时候是有错的 我们先不去管他 我们先解析一下这个报告怎么看，如果大家学过软件工程会知道一般从理论上讲覆盖率包括

- 语句覆盖
- 节点覆盖
- 路径覆盖
- 条件组合覆盖

但是一般来讲不同框架理解不一样 在 Jest 这里大概是这样分解的

- %stmts 是语句覆盖率（statement coverage）：是不是每个语句都执行了？
- %Branch 分支覆盖率（branch coverage）：是不是每个 if 代码块都执行了？
- %Funcs 函数覆盖率（function coverage）：是不是每个函数都调用了？
- %Lines 行覆盖率（line coverage）：是不是每一行都执行了？

## 单独运行一个测试

比如我们看看 vue 的 index 这个测试

![](https://image.newarea.site/20230525/25.jpg)

有两种方法进行单独测试

```
// 全局安装
npm i jest -g
jest index

// 或者更更简便一点
npx jest index
复制代码
```

![](https://image.newarea.site/20230525/30.jpg)

index.spec.ts

```
import { createApp } from '../src'

it('should support on-the-fly template compilation', () => {
  const container = document.createElement('div')
  const App = {
    template: `{{ count }}`,
    data() {
      return {
        count: 0
      }
    }
  }
  createApp().mount(App, container)
  // 断言
  expect(container.innerHTML).toBe(`0`)
})
复制代码
```

声明中说为了确认模板编译可以生效，这个就是一个简单的数据绑定 最后 断言也是看了一下 count 是否为 0 这个例子其实除了断言部分其实直接拷贝到第一次讲的那个 html 文件里面是可以运行的。

## 响应式 Reactive 的单元测试

![](https://image.newarea.site/20230525/31.jpg)

看一下每个包对应的测试代码都放在**tests**文件件中

```
    npx jest reactive --coverage
复制代码
```

![](https://image.newarea.site/20230525/32.jpg)

转载自 [尝鲜 Vue3 之四：如何运行 Jest 单元测试](https://juejin.cn/post/6844903974512885767)
