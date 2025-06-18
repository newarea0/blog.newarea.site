# IntersectionObserver

`IntersectionObserver` 是一个非常实用的 Web API，它可以用来监听某个元素是否进入或离开另一个元素（或视口）的可视区域，而无需监听滚动事件。这在懒加载图片、实现无限滚动、元素可见性检测等场景中特别有用。

下面是一个 `IntersectionObserver` 的基础用法示例，逐步解释它的工作原理：

### 基本语法

```js
const observer = new IntersectionObserver(callback, options)
observer.observe(targetElement)
```

### 参数说明

#### 1. `callback(entries, observer)`

* 当被观察的元素进入或离开可视区域时触发。
* `entries`: 是一个 `IntersectionObserverEntry` 数组，包含所有被观察的元素的状态。
* `observer`: 当前的 `IntersectionObserver` 实例。

#### 2. `options`

* `root`: 作为视口的元素，默认是浏览器视口 (`null`)。
* `rootMargin`: 类似 CSS 的 margin，用来扩大或缩小 root 区域。
* `threshold`: 触发回调的比例，范围 `0` \~ `1`，也可以是数组。

### 示例：检测元素是否进入视口

```html
<div class="box" id="target">观察我</div>
```

```css
.box {
  height: 200px;
  margin-top: 1000px;
  background: lightblue;
}
```

```js
const target = document.getElementById('target')

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('元素进入视口')
    }
    else {
      console.log('元素离开视口')
    }
  })
}, {
  root: null, // 使用默认视口
  rootMargin: '0px',
  threshold: 0.1 // 10% 可见时触发
})

observer.observe(target)
```

### 示例用途

* 图片懒加载：

  ```js
  if (entry.isIntersecting) {
    img.src = img.dataset.src
    observer.unobserve(img)
  }
  ```

* 无限滚动加载更多数据

* 统计某元素曝光率（广告、埋点）

* 动画播放控制（进入视口才开始）
