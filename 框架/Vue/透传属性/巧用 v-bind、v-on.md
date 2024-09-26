# 巧用 v-bind、v-on

## v-bind

`v-bind:arg.modifier="value"`

`v-bind:visible="isShow"` 简写 `:visible="isShow"`

- arg 表示参数
- modifier 表示修饰符
- value 表示值，类型为 any (带参数) 或 Object (不带参数)

绑定多个值：

```html
<template>
  <info v-bind="infoOptions" />
</template>

<script setup>
  import { reactive } from 'vue'

  const infoOptions = reactive({
    name: 'Jack',
    age: 20
  })
</script>
```

## v-on

`v-on:arg.modifier1.modifier1="value"`
- arg 表示参数
- modifier 表示修饰符
- value 表示值

值可以是一个函数名、一个内联声明、一个对象

值是一个函数名或一个内联声明时，可以使用简写语法：

`v-on:click="handleClick"` 简写 `@click="handleClick"`

值是一个对象：

```html
<template>
  <button v-on="buttonEvents">click</button>
</template>

<script setup>
  const buttonEvents = {
    mousedown() {

    },
    mouseup() {

    }
  }
</script>
```

当一个页面中多次使用某个大型组件（组件的 porps 或自定义事件比较多），推荐使用 `v-bind`、`v-on`，而不是在模板中一个一个的绑定 props、自定义事件。

例1：v-bind 绑定 props，v-on 绑定事件：

```html
<template>
  <Table v-bind="tableOptions" v-on="tableEvents" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { Table } from '@arco-design/web-vue'

  const tableOptions = reactive({
    columns: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Salary', dataIndex: 'salary' },
      { title: 'Address', dataIndex: 'address' },
      { title: 'Email', dataIndex: 'email' }
    ],
    data: [
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com'
      }
    ],
    rowSelection: {
      type: 'checkbox'
    }
    // 这种方式也可以
    // 'row-selection': {
    //   type: 'checkbox'
    // }
  })

  const tableEvents = {
    rowClick(record) {
      console.log(111, record)
    }
    // 这种方式不行
    // 'row-click': function (record) {
    //   console.log(111, record)
    // }
  }
</script>
```

例2：仅用 `v-bind`：

```html
<template>
  <Table v-bind="tableOptions" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { Table } from '@arco-design/web-vue'

  const tableOptions = reactive({
    columns: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Salary', dataIndex: 'salary' },
      { title: 'Address', dataIndex: 'address' },
      { title: 'Email', dataIndex: 'email' }
    ],
    data: [
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com'
      }
    ],
    rowSelection: {
      type: 'checkbox'
    },
    // 注意要在事件名前加上 on
    onRowClick(value) {
      console.log(1112, value)
    }
  })
</script>
```

推荐使用例1，例1分类清楚，不用改写事件名称。

例3：替换 `v-model`

`v-model` 实际是一种语法糖写法

```html
<template>
  <Input v-bind="inputOptions" v-on="inputEvents" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { Input } from '@arco-design/web-vue'

  const inputOptions = reactive({
    modelValue: 'hello'
  })

  const inputEvents = {
    'update:modelValue': function (val) {
      inputOptions.modelValue = val
    }
  }
</script>
```

或者

```html
<template>
  <Input v-bind="inputOptions" />
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { Input } from '@arco-design/web-vue'

  const inputOptions = reactive({
    modelValue: 'hello',
    // 注意这里没有加 on 前缀
    'update:modelValue': function (val) {
      this.modelValue = val
    }
  })
</script>
```
