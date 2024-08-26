# 前端分页组件

```html
<template>
  <div>
    <el-button
      plain
      icon="el-icon-arrow-left"
      size="mini"
      :disabled="state.currentPage === 1"
      @click="prev"
    />
    <el-button
      plain
      icon="el-icon-arrow-right"
      size="mini"
      :disabled="state.currentPage === pageCount"
      @click="next"
    />
  </div>
</template>

<script setup>
import { defineEmit, defineProps, computed, useContext, reactive, watch, onMounted } from 'vue'

const { props, emit } = useContext()

// define props、emit
defineProps({
  pageSize: {
    type: Number，
    default: 10
  },
  data: {
    type: Array,
    required: true
  }
})
defineEmit(['page'])

// data
const state = reactive({
  currentPage: 1
})

// computed
// 数据总数
const total = computed(() => props.data.length)
// 总页数
const pageCount = computed(() => Math.ceil(props.data.length / props.pageSize))

// watch
watch(() => state.currentPage, () => {
  handlePage()
})

// hook
onMounted(() => {
  handlePage()
})

// methods
const prev = () => {
  if (state.currentPage === 1) return
  state.currentPage --
}
const next = () => {
  if (state.currentPage === pageCount) return
  state.currentPage ++
}
const handlePage = () => {
  // 这里是关键逻辑，利用了数组的slice(start, end)方法
  const start = (state.currentPage - 1) * props.pageSize
  const end = state.currentPage * props.pageSize
  emit('page', props.data.slice(start, end))
}
</script>
```
