# js实现文章目录导航(TOC)

[鱼儿的博客](https://yuerblog.cc/2017/12/04/js-toc/)

[github](https://owenliang.github.io/js-toc)

TOC 是 table of content 的简写

这里有两种类型：

- 一种是文档、文章、博客类型，点击目录，对应段落顶端滚动到和浏览器视口顶端对齐；滚动内容，相应目录高亮；点击段落标题，该段落顶端滚动到和浏览器视口顶端对齐，并且对应目录高亮。这种类型可以理解成元素在整个浏览器视口中滚动。
- 另一种也存在目录和内容，目录和内容也是“双向绑定”的，只是内容在一个包裹容器内滚动，而不是整个浏览器视口中滚动

## 1 功能一：点击目录，对应段落顶端滚动到和浏览器视口顶端对齐

### 1.1 类型一

```html
<style>
  ul {
    padding: 0;
    margin: 0;
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
  }
  li {
    list-style: none;
  }
  .content {
    margin-left: 200px;
  }
  .item1 {
    height: 400px;
    background-color: red;
  }
  .item2 {
    height: 500px;
    background-color: yellow;
  }
  .item3 {
    height: 900px;
    background-color: blue;
  }
</style>
<div class="wrapper">
  <ul>
    <li><a href="#chinese">语文</a></li>
    <li><a href="#math">数学</a></li>
    <li><a href="#english">英语</a></li>
  </ul>
  <div class="content">
    <div class="item1" id="chinese">语文</div>
    <div class="item2">
      <a name="math" href="#math">数学</a>
    </div>
    <div class="item3" id="english">英语</div>
  </div>
</div>
```

通过在任意元素上设置id属性，或者在a标签上设置href属性（同时点击段落标题，该段落顶端滚动到和浏览器视口顶端对齐）来设置锚点。

### 1.2 类型二

```html
<style>
  .wrapper {
    height: 200px;
    border: 1px solid red;
    overflow-y: auto;
    position: relative;
  }
  .item1 {
    height: 100px;
    background-color: red;
  }
  .item2 {
    height: 200px;
    background-color: yellow;
  }
  .item3 {
    height: 300px;
    background-color: blue;
  }
</style>
<body>
  <div style="height: 100px;">1</div>
  <div class="wrapper">
    <div class="item1" id="chinese">语文</div>
    <div class="item2" id="math">数学</div>
    <div class="item3" id="english">英语</div>
  </div>
  <button type="button" onclick="handleClick('chinese')">语文</button>
  <button type="button" onclick="handleClick('math')">数学</button>
  <button type="button" onclick="handleClick('english')">英语</button>
  <script>
    function handleClick (id) {
      document.getElementById(id).scrollIntoView()
    }
  </script>
</body>
```

通过元素的 `scrollIntoView` 方法，滚动元素的父容器，使被调用 `scrollIntoView` 的元素对用户可见。

## 2 功能二：滚动内容，相应目录高亮

```html
<style>
  .wrapper {
    height: 200px;
    border: 1px solid red;
    overflow-y: auto;
    position: relative;
  }
  .item1 {
    height: 100px;
    background-color: red;
  }
  .item2 {
    height: 200px;
    background-color: yellow;
  }
  .item3 {
    height: 300px;
    background-color: blue;
  }
  button.active {
    color: red
  }
</style>
<body>
  <div style="height: 100px;">1</div>
  <div class="wrapper" onscroll="handleScroll(this)">
    <div class="item item1" id="chinese" data-num="0">语文</div>
    <div class="item item2" id="math" data-num="1">数学</div>
    <div class="item item3" id="english" data-num="2">英语</div>
  </div>
  <button type="button" onclick="handleClick('chinese')">语文</button>
  <button type="button" onclick="handleClick('math')">数学</button>
  <button type="button" onclick="handleClick('english')">英语</button>
  <script>
    function handleClick (id) {
      document.getElementById(id).scrollIntoView()
    }

    function handleScroll (el) {
      const scrollTop = el.scrollTop
      const items = document.getElementsByClassName('item')
      let topSeg = null
      for (let i = 0; i < items.length; i++) {
        let seg = items[i]
        if (seg.offsetTop > scrollTop) {
          continue
        }
        if (!topSeg) {
          topSeg = seg
        } else if (seg.offsetTop >= topSeg.offsetTop) {
          topSeg = seg
        }
      }

      if (topSeg) {
        const btns = document.getElementsByTagName('button')
        for (let i = 0; i < btns.length; i++) {
          btns[i].classList.remove('active')
        }
        const num = topSeg.getAttribute('data-num')
        btns[num].classList.add('active')
      }
    }
  </script>
</body>
```

重点是 `handleScroll` 中的逻辑。

Vue 项目

```html
<template>
  <div>
    <div class="city-container" @scroll="handleScroll($event)">
      <ul>
        <li v-for="(item, index) in cities" :key="index" :id="'id' + item.id">{{item.name}}</li>
      </ul>
    </div>
    <div class="index-container">
      <ul>
        <li
          v-for="(item, index) in cities"
          :key="index"
          :id="'id' + item.id"
          @click="handleClick(item.id)"
          :class="activeIndex === index ? 'active' : ''"
        >
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const cities = ref([
  { name: 1, id: 1 },
  { name: 2, id: 2 },
  { name: 3, id: 3 },
  { name: 4, id: 4 },
  { name: 5, id: 5 },
  { name: 6, id: 6 },
  { name: 7, id: 7 },
  { name: 8, id: 8 },
  { name: 9, id: 9 },
  { name: 11, id: 11 },
  { name: 10, id: 10 },
  { name: 12, id: 12 },
])
const activeIndex = ref(0)

const handleClick = (id) => {
  document.getElementById(`id${id}`).scrollIntoView()
}

const handleScroll = (el) => {
  const scrollTop = el.target.scrollTop
  var topSeg = null
  for (let i = 0; i < cities.value.length; i++) {
    let seg = document.getElementById(`id${cities.value[i].id}`)
    if (seg.offsetTop > scrollTop) {
      continue
    }
    if (!topSeg) {
      topSeg = seg
      activeIndex.value = i
    } else if (seg.offsetTop >= topSeg.offsetTop) {
      topSeg = seg
      activeIndex.value = i
    }
  }
}
</script>

<style scoped>
.city-container {
  border: 1px solid red;
  height: 100px;
  overflow: auto;
  position: relative;
}
ul {
  padding: 0;
  margin: 0;
}
ul>li {
  list-style: none;
}
.index-container li  {
  cursor: pointer;
}
.index-container li.active  {
  background-color: #ccc;
}
.index-container li:hover {
  background-color: #ccc;
}
</style>
```

注意，要将容器元素（产生滚动条的元素）设置成定位元素，只有这样 `offsetTop` 才是相对顶部内边距的距离。

## 3 功能三：点击段落标题，该段落顶端滚动到和浏览器视口顶端对齐，并且对应目录高亮

对于“点击段落标题，该段落顶端滚动到和浏览器视口顶端对齐”可以通过`<a href="#xxx">段落标题</a>`实现。要实现“并且对应目录高亮”，相关的js逻辑并不难。

## 4 知识点

### 4.1 offsetTop

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)

`HTMLElement.offsetTop` 为只读属性，它返回当前元素相对于其 [offsetParent](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent) 元素的顶部内边距的距离。
