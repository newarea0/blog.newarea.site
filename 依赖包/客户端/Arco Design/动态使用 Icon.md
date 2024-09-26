# 动态使用 Icon

[Element Plus动态Icon的使用方法](https://blog.csdn.net/qq_43492356/article/details/127615443)

## 基本使用

Arco图标是一个独立的库，需要额外引入并注册使用。

```ts
// main.ts
import { createApp } from 'vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue';

const app = createApp(App);
app.use(ArcoVueIcon);
app.mount('#app');
```

注册后可以通过 `<icon-xx />` 的形式即可使用Icon。

## 动态使用

```html
<template>
  <component v-for="(item, index) in icons" :key="index" :is="item" />
</template>

<script setup lang="ts">
  import { IconPlus, IconMinus, IconFullscreenExit } from '@arco-design/web-vue/es/icon'

  const icons = [IconPlus, IconMinus, IconFullscreenExit]
</script>
```

上面无需全局引入 Arco 图标，如果全局引入了 Arco 图标，可以这样动态使用：

```html
<template>
  <component v-for="(item, index) in icons" :key="index" :is="item" />
</template>

<script setup lang="ts">
  const icons = ['IconPlus', 'IconMinus', 'IconFullscreenExit']
</script>
```