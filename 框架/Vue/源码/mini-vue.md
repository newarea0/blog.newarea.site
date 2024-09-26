[Vue官方教程笔记]- 尤雨溪手写mini-vue
==========================

上周发了 [【Vue3官方教程】🎄万字笔记 | 同步导学视频](https://juejin.cn/post/6909247394904702984 "https://juejin.cn/post/6909247394904702984") 1050赞

🔥这周我看了看了尤大神亲手写的mini版Vue3，笔记如下请大家指正。

[【原版视频】](https://link.juejin.cn/?target=https%3A%2F%2Fwww.vuemastery.com%2Fcourses%2Fvue3-deep-dive-with-evan-you "https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you")

![image-20201230111207968](https://image.newarea.site/20230525/02.jpg)

⚡️关注公众号【前端大班车】 回复 【mini-vue】索取完整代码
==================================

一、整体工作流程
--------

![Kapture 2020-12-10 at 16.13.53.gif](https://image.newarea.site/20230525/04.gif)

1.  编译器将视图模板编译为渲染函数
2.  数据响应模块将数据对象初始化为响应式数据对象
3.  视图渲染
    1.  RenderPhase ： 渲染模块使用渲染函数根据初始化数据生成虚拟Dom
    2.  MountPhase ： 利用虚拟Dom创建视图页面Html
    3.  PatchPhase：数据模型一旦变化渲染函数将再次被调用生成新的虚拟Dom，然后做Dom Diff更新视图Html

二、三大模块的分工
---------

![image.png](https://image.newarea.site/20230525/05.png)

-   数据响应式模块
-   编译器
-   渲染函数

### 1\. 数据响应式模块

提供创建一切数据变化都是可以被监听的响应式对象的方法。![Kapture 2020-12-10 at 11.47.59.gif](https://image.newarea.site/20230525/06.gif)

### 2\. 编译模块

![image.png](https://image.newarea.site/20230525/07.png)

将html模板编译为渲染函数

这个编译过程可以在一下两个时刻执行

-   浏览器运行时 (runtime)
-   Vue项目打包编译时 (compile time)

### 3\. 渲染函数

渲染函数通过以下三个周期将视图渲染到页面上![image.png](https://image.newarea.site/20230525/08.png)

-   Render Phase
-   Mount Phase
-   Patch Phase

三、MVVM原型(Mock版)
---------------

![MVVM原理](https://image.newarea.site/20230525/09.gif)

MVVM框架其实就是在原先的View和Model之间增加了一个VM层完成以下工作。完成数据与视图的监听。我们这一步先写一个Mock版本。其实就是先针对固定的视图和数据模型实现监听。

### 1\. 接口定义

我们MVVM的框架接口和Vue3一模一样。

初始化需要确定

-   视图模板
-   数据模型
-   模型行为 - 比如我们希望click的时候数据模型的message会会倒序排列。

```js
const App = {
  // 视图
  template: `
  <input v-model="message"/>
  <button @click='click'>{{message}}</button>
  `,
  setup() {
    // 数据劫持
    const state = new Proxy(
      {
        message: "Hello Vue 3!!",
      },
      {
        set(target, key, value, receiver) {
          const ret = Reflect.set(target, key, value, receiver);
          // 触发函数响应
          effective();
          return ret;
        },
      }
    );

    const click = () => {
      state.message = state.message.split("").reverse().join("");
    };
    return { state, click };
  },
};
const { createApp } = Vue;
createApp(App).mount("#app");
```

### 2\. 程序骨架

程序执行过程大概如图：

![render-proxy](https://image.newarea.site/20230525/10.gif)

```js
const Vue = {
  createApp(config) {
    // 编译过程
    const compile = (template) => (content, dom) => {

    };

    // 生成渲染函数
    const render = compile(config.template);

    return {
      mount: function (container) {
        const dom = document.querySelector(container);

				// 实现setup函数
        const setupResult = config.setup();

        // 数据响应更新视图
        effective = () => render(setupResult, dom);
        render(setupResult, dom);
      },
    };
  },
};
```

### 3\. 编译渲染函数

MVVM框架中的渲染函数是会通过视图模板的编译建立的。

```js
// 编译函数
// 输入值为视图模板
const compile = (template) => {
  //渲染函数
  return (observed, dom) => {
  	// 渲染过程
	}
}
```

简单的说就是对视图模板进行解析并生成渲染函数。

大概要处理以下三件事

-   确定哪些值需要根据数据模型渲染

    ```js
    // <button>{{message}}</button>
    // 将数据渲染到视图
    button = document.createElement('button')
    button.innerText = observed.message
    dom.appendChild(button)
    ```

-   绑定模型事件

    ```js
    // <button @click='click'>{{message}}</button>
    // 绑定模型事件
    button.addEventListener('click', () => {
      return config.methods.click.apply(observed)
    })
    ```

-   确定哪些输入项需要双向绑定

    ```js
    // <input v-model="message"/>
    // 创建keyup事件监听输入项修改
    input.addEventListener('keyup', function () {
      observed.message = this.value
    })
    ```

完整的代码

```js
const compile = (template) => (observed, dom) => {

    // 重新渲染
    let input = dom.querySelector('input')
    if (!input) {
        input = document.createElement('input')
        input.setAttribute('value', observed.message)

        input.addEventListener('keyup', function () {
            observed.message = this.value
        })
        dom.appendChild(input)
    }
    let button = dom.querySelector('button')
    if (!button) {
        console.log('create button')
        button = document.createElement('button')
        button.addEventListener('click', () => {
            return config.methods.click.apply(observed)
        })
        dom.appendChild(button)
    }
    button.innerText = observed.message
}
```

四、数据响应实现
--------

Vue普遍走的就是数据劫持方式。不同的在于使用DefineProperty还是Proxy。也就是一次一个属性劫持还是一次劫持一个对象。当然后者比前者听着就明显有优势。这也就是Vue3的响应式原理。

Proxy/Reflect是在ES2015规范中加入的，Proxy可以更好的拦截对象行为，Reflect可以更优雅的操纵对象。 优势在于

-   针对整个对象定制 而不是对象的某个属性，所以也就不需要对keys进行遍历。
-   支持数组,这个DefineProperty不具备。这样就省去了重载数组方法这样的Hack过程。
-   Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
-   Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法
-   可以通过递归方便的进行对象嵌套。

说了这么多我们先来一个小例子

```js
var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
})
obj.abc = 132
```

这样写如果你修改obj中的值，就会打印出来。

也就是说如果对象被修改就会得的被响应。

![image-20200713122621925](https://image.newarea.site/20230525/11.jpg)

当然我们需要的响应就是重新更新视图也就是重新运行render方法。

首先制造一个抽象的数据响应函数

```js
// 定义响应函数
let effective
observed = new Proxy(config.data(), {
  set(target, key, value, receiver) {
    const ret = Reflect.set(target, key, value, receiver)
    // 触发函数响应
    effective()
    return ret
  },
})
```

在初始化的时候我们设置响应动作为渲染视图

```js
const dom = document.querySelector(container)
// 设置响应动作为渲染视图
effective = () => render(observed, dom)
render(observed, dom)
```

### 1\. 视图变化的监听

浏览器视图的变化,主要体现在对输入项变化的监听上，所以只需要通过绑定监听事件就可以了。

```js
document.querySelector('input').addEventListener('keyup', function () {
  data.message = this.value
})
```

### 2\. 完整的代码

```js
<html lang="en">
  <body>
    <div id="app"></div>
    <script>
      const Vue = {
        createApp(config) {
          // 编译过程
          const compile = (template) => (content, dom) => {
            // 重新渲染
            dom.innerText = "";
            input = document.createElement("input");
            input.addEventListener("keyup", function () {
              content.state.message = this.value;
            });
            input.setAttribute("value", content.state.message);
            dom.appendChild(input);

            let button = dom.querySelector("button");
            button = document.createElement("button");
            button.addEventListener("click", () => {
              return content.click.apply(content.state);
            });
            button.innerText = content.state.message;
            dom.appendChild(button);
          };

          // 生成渲染函数
          const render = compile(config.template);

          return {
            mount: function (container) {
              const dom = document.querySelector(container);
              const setupResult = config.setup();
              effective = () => render(setupResult, dom);
              render(setupResult, dom);
            },
          };
        },
      };
      // 定义响应函数
      let effective;
      const App = {
        // 视图
        template: `
                <input v-model="message"/>
                <button @click='click'>{{message}}</button>
            `,
        setup() {
          // 数据劫持
          const state = new Proxy(
            {
              message: "Hello Vue 3!!",
            },
            {
              set(target, key, value, receiver) {
                const ret = Reflect.set(target, key, value, receiver);
                // 触发函数响应
                effective();
                return ret;
              },
            }
          );

          const click = () => {
            state.message = state.message.split("").reverse().join("");
          };
          return { state, click };
        },
      };
      const { createApp } = Vue;
      createApp(App).mount("#app");
    </script>
  </body>
</html>
```

五、 视图渲染过程
---------

> Dom => virtual DOM => render functions

### 1\. 什么是Dom 、Document Object Model

![image.png](https://image.newarea.site/20230525/12.png)

HTML在浏览器中会映射为一些列节点，方便我们去调用。

![image.png](https://image.newarea.site/20230525/13.png)

### 2\. 什么是虚拟Dom

Dom中节点众多，直接查询和更新Dom性能较差。

> A way of representing the actual DOM with JavaScript Objects. 用JS对象重新表示实际的Dom

![image.png](https://image.newarea.site/20230525/14.png)

### 3\. 什么是渲染函数

在Vue中我们通过将视图模板(template)编译为渲染函数(render function)再转化为虚拟Dom

![image.png](https://image.newarea.site/20230525/15.png)

### 4\. 通过DomDiff高效更新视图

![image.png](https://image.newarea.site/20230525/16.png)

### 5\. 总结

举个栗子🌰 虚拟Dom和Dom就像大楼和大楼设计图之间的关系。

![image.png](https://image.newarea.site/20230525/17.png)

假设你要在29层添加一个厨房 ❌ 拆除整个29层，重新建设 ✅先绘制设计图，找出新旧结构不同然后建设

六、实现渲染函数
--------

在Vue中我们通过将视图模板(template)编译为渲染函数(render function)再转化为虚拟Dom

![image.png](https://image.newarea.site/20230525/15.png)

渲染流程通常会分为三各部分:

> [vue-next-template-explorer.netlify.app/](https://link.juejin.cn/?target=https%3A%2F%2Fvue-next-template-explorer.netlify.app%2F "https://vue-next-template-explorer.netlify.app/")

![](https://image.newarea.site/20230525/18.png)

-   RenderPhase ： 渲染模块使用渲染函数根据初始化数据生成虚拟Dom
-   MountPhase ： 利用虚拟Dom创建视图页面Html
-   PatchPhase：数据模型一旦变化渲染函数将再次被调用生成新的虚拟Dom，然后做Dom Diff更新视图Html

```js
mount: function (container) {
    const dom = document.querySelector(container);
    const setupResult = config.setup();
    const render = config.render(setupResult);

    let isMounted = false;
    let prevSubTree;
    watchEffect(() => {
      if (!isMounted) {
        dom.innerHTML = "";
        // mount
        isMounted = true;
        const subTree = config.render(setupResult);
        prevSubTree = subTree;
        mountElement(subTree, dom);
      } else {
        // update
        const subTree = config.render(setupResult);
        diff(prevSubTree, subTree);
        prevSubTree = subTree;
      }
    });
  },
```

### 1.Render Phase

渲染模块使用渲染函数根据初始化数据生成虚拟Dom

```js
render(content) {
  return h("div", null, [
    h("div", null, String(content.state.message)),
    h(
      "button",
      {
        onClick: content.click,
      },
      "click"
    ),
  ]);
},
```

### 2\. Mount Phase

利用虚拟Dom创建视图页面Html

```js
function mountElement(vnode, container) {
  // 渲染成真实的 dom 节点
  const el = (vnode.el = createElement(vnode.type));

  // 处理 props
  if (vnode.props) {
    for (const key in vnode.props) {
      const val = vnode.props[key];
      patchProp(vnode.el, key, null, val);
    }
  }

  // 要处理 children
  if (Array.isArray(vnode.children)) {
    vnode.children.forEach((v) => {
      mountElement(v, el);
    });
  } else {
    insert(createText(vnode.children), el);
  }

  // 插入到视图内
  insert(el, container);
}
```

### 3\. Patch Phase(Dom diff)

数据模型一旦变化渲染函数将再次被调用生成新的虚拟Dom，然后做Dom Diff更新视图Html

```js
function patchProp(el, key, prevValue, nextValue) {
  // onClick
  // 1. 如果前面2个值是 on 的话
  // 2. 就认为它是一个事件
  // 3. on 后面的就是对应的事件名
  if (key.startsWith("on")) {
    const eventName = key.slice(2).toLocaleLowerCase();
    el.addEventListener(eventName, nextValue);
  } else {
    if (nextValue === null) {
      el.removeAttribute(key, nextValue);
    } else {
      el.setAttribute(key, nextValue);
    }
  }
}
```

通过DomDiff - 高效更新视图

![image.png](https://image.newarea.site/20230525/16.png)

![image-20201230104838657](https://image.newarea.site/20230525/19.png)

```js
function diff(v1, v2) {
  // 1. 如果 tag 都不一样的话，直接替换
  // 2. 如果 tag 一样的话
  //    1. 要检测 props 哪些有变化
  //    2. 要检测 children  -》 特别复杂的
  const { props: oldProps, children: oldChildren = [] } = v1;
  const { props: newProps, children: newChildren = [] } = v2;
  if (v1.tag !== v2.tag) {
    v1.replaceWith(createElement(v2.tag));
  } else {
    const el = (v2.el = v1.el);
    // 对比 props
    // 1. 新的节点不等于老节点的值 -> 直接赋值
    // 2. 把老节点里面新节点不存在的 key 都删除掉
    if (newProps) {
      Object.keys(newProps).forEach((key) => {
        if (newProps[key] !== oldProps[key]) {
          patchProp(el, key, oldProps[key], newProps[key]);
        }
      });

      // 遍历老节点 -》 新节点里面没有的话，那么都删除掉
      Object.keys(oldProps).forEach((key) => {
        if (!newProps[key]) {
          patchProp(el, key, oldProps[key], null);
        }
      });
    }
    // 对比 children

    // newChildren -> string
    // oldChildren -> string   oldChildren -> array

    // newChildren -> array
    // oldChildren -> string   oldChildren -> array
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          setText(el, newChildren);
        }
      } else if (Array.isArray(oldChildren)) {
        // 把之前的元素都替换掉
        v1.el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        // 清空之前的数据
        n1.el.innerHTML = "";
        // 把所有的 children mount 出来
        newChildren.forEach((vnode) => {
          mountElement(vnode, el);
        });
      } else if (Array.isArray(oldChildren)) {
        // a, b, c, d, e -> new
        // a1,b1,c1,d1 -> old
        // 如果 new 的多的话，那么创建一个新的

        // a, b, c -> new
        // a1,b1,c1,d1 -> old
        // 如果 old 的多的话，那么把多的都删除掉
        const length = Math.min(newChildren.length, oldChildren.length);
        for (let i = 0; i < length; i++) {
          const oldVnode = oldChildren[i];
          const newVnode = newChildren[i];
          // 可以十分复杂
          diff(oldVnode, newVnode);
        }

        if (oldChildren.length > length) {
          // 说明老的节点多
          // 都删除掉
          for (let i = length; i < oldChildren.length; i++) {
            remove(oldChildren[i], el);
          }
        } else if (newChildren.length > length) {
          // 说明 new 的节点多
          // 那么需要创建对应的节点
          for (let i = length; i < newChildren.length; i++) {
            mountElement(newChildren[i], el);
          }
        }
      }
    }
  }
}
```

七、编译器原理
-------

> 这个地方尤大神并没有实现 后续然叔会给大家提供一个超简洁的版本 这个章节我们主要看看compile这个功能。

![compiler](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e70cd358dc244b169a5e6482b861eaab~tplv-k3u1fbpfcp-zoom-1.image)

上文已经说过编译函数的功能

```js
// 编译函数
// 输入值为视图模板
const compile = (template) => {
  //渲染函数
  return (observed, dom) => {
  	// 渲染过程
	}
}
```

简单的说就是

-   输入：视图模板
-   输出：渲染函数

细分起来还可以分为三个个小步骤

![Snip20200713_17](https://image.newarea.site/20230525/21.jpg)

-   Parse 模板字符串 -> AST(Abstract Syntax Treee)抽象语法树

-   Transform 转换标记 譬如 v-bind v-if v-for的转换

-   Generate AST -> 渲染函数

    ```js
    //  模板字符串 -> AST(Abstract Syntax Treee)抽象语法树
    let ast = parse(template)
    // 转换处理 譬如 v-bind v-if v-for的转换
    ast = transfer(ast)
    // AST -> 渲染函数
    return generator(ast)
    复制代码
    ```

    我们可以通过在线版的VueTemplateExplorer感受一下

    [vue-next-template-explorer.netlify.com/](https://link.juejin.cn/?target=https%3A%2F%2Fvue-next-template-explorer.netlify.com%2F "https://vue-next-template-explorer.netlify.com/")

![image-20200713150630150](https://image.newarea.site/20230525/22.jpg)

> [编译函数解析](https://juejin.im/post/5d9dbfb4e51d4577f7061978#heading-1 "https://juejin.im/post/5d9dbfb4e51d4577f7061978#heading-1")

### 1\. Parse解析器

解析器的工作原理其实就是一连串的正则匹配。

比如：

标签属性的匹配

-   class="title"

-   class='title'

-   class=title

```js
const attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)=("([^"]*)"|'([^']*)'|([^\s"'=<>`]+)/

"class=abc".match(attr);
// output
(6) ["class=abc", "class", "abc", undefined, undefined, "abc", index: 0, input: "class=abc", groups: undefined]

"class='abc'".match(attr);
// output
(6) ["class='abc'", "class", "'abc'", undefined, "abc", undefined, index: 0, input: "class='abc'", groups: undefined]
```

这个等实现的时候再仔细讲。可以参考一下文章。

[AST解析器实战](https://juejin.im/post/5d9c16686fb9a04e320a54c0#heading-5 "https://juejin.im/post/5d9c16686fb9a04e320a54c0#heading-5")

那对于我们的项目来讲就可以写成这个样子

```js
// <input v-model="message"/>
// <button @click='click'>{{message}}</button>
// 转换后的AST语法树
const parse = template => ({
    children: [{
            tag: 'input',
            props: {
                name: 'v-model',
                exp: {
                    content: 'message'
                },
            },
        },
        {
            tag: 'button',
            props: {
                name: '@click',
                exp: {
                    content: 'message'
                },
            },
            content:'{{message}}'
        }
    ],
})
```

### 2\. Transform转换处理

前一段知识做的是抽象语法树，对于Vue3模板的特别转换就是在这里进行。

比如：vFor、vOn

在Vue三种也会细致的分为两个层级进行处理

-   compile-core 核心编译逻辑

    -   AST-Parser

    -   基础类型解析 v-for 、v-on

        ![image-20200713183256931](https://image.newarea.site/20230525/23.jpg)

-   compile-dom 针对浏览器的编译逻辑

    -   v-html

    -   v-model

    -   v-clock

        ![image-20200713183210079](https://image.newarea.site/20230525/24.jpg)

```js
const transfer = ast => ({
    children: [{
            tag: 'input',
            props: {
                name: 'model',
                exp: {
                    content: 'message'
                },
            },
        },
        {
            tag: 'button',
            props: {
                name: 'click',
                exp: {
                    content: 'message'
                },
            },
            children: [{
                content: {
                    content: 'message'
                },
            }]
        }
    ],
})
```

### 3\. Generate生成渲染器

生成器其实就是根据转换后的AST语法树生成渲染函数。当然针对相同的语法树你可以渲染成不同结果。比如button你希望渲染成 button还是一个svg的方块就看你的喜欢了。这个就叫做自定义渲染器。这里我们先简单写一个固定的Dom的渲染器占位。到后面实现的时候我在展开处理。

```js
const generator = ast => (observed, dom) => {
    // 重新渲染
    let input = dom.querySelector('input')
    if (!input) {
        input = document.createElement('input')
        input.setAttribute('value', observed.message)
        input.addEventListener('keyup', function () {
            observed.message = this.value
        })
        dom.appendChild(input)
    }
    let button = dom.querySelector('button')
    if (!button) {
        console.log('create button')
        button = document.createElement('button')
        button.addEventListener('click', () => {
            return config.methods.click.apply(observed)
        })
        dom.appendChild(button)
    }
    button.innerText = observed.message
}
```

转载自[[Vue官方教程笔记]- 尤雨溪手写mini-vue](https://juejin.cn/post/6911897255087702030)
