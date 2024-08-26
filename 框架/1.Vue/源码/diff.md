视图模板最终是转换成渲染函数的（[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)），将

```js
{
  template: `<div>hello</div>`
}
```

转化成

```js
{
  render() {
    h('div', ['hello'])
  }
}
```

渲染函数（[渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)）接受3个参数，返回一个虚拟 Dom 对象。虚拟 DOM，即用 JS 对象重新表示实际的 DOM。

Vue 3 中的渲染函数可以单独使用。

```js
const { h } = Vue

const vDom = h('div',
  { class: 'msg', onclick: ($event) => console.log($event.target) },
  [h('span', ['hello']), 'world']
)

console.log(vDom)
```

![01](https://image.newarea.site/20230525/01.png)
