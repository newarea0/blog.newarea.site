# 下拉刷新、上拉加载

下拉刷新、上拉加载通常同时使用，官网[示例](https://vant-ui.github.io/vant/#/zh-CN/list#xia-la-shua-xin)

PullRefresh 组件 下拉刷新跟滚动条没关系，组件监听的是下拉这个操作（包括 touchstart、touchmove、touchend）

单独使用 List 组件时，如果想要在某个容器内 List 组件的上拉加载功能生效，容器通常需要设置 height，同时需要设置 `overflow-y: auto;` 。

```html
<div class="overflow-y-auto h-[200px]">
  <vant-list />
</div>
```

同时 List、PullRefresh 组件时

```html
<div class="overflow-y-auto h-[200px]">
  <vant-pull-refresh>
    <vant-list />
  </vant-pull-refresh>
</div>
```

```html
<!-- <script setup lang="ts">
import { getExampleList } from '@/api/home'
import banner1 from '@/assets/banner1.svg'

const value = ref('')
const images = [banner1, banner1]
const activeTab = ref(0)
const examples = ref([])
const current = 1
</script> -->

<script lang="ts">
import { debounce } from 'lodash-es'
import { getExampleList } from '@/api/home'
import banner1 from '@/assets/banner1.svg'

export default defineComponent({
  data() {
    return {
      value: '',
      images: [banner1, banner1],
      activeTab: 0,

      list: [],

      // 当为 true，出现上拉加载中动画
      loading: false,
      // 当为 true，表示数据已经全部加载，后面无法再触发上拉事件
      finished: false,
      // 当为 true，出现下拉加载中动画
      refreshing: false,
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
    }
  },
  mounted() {
  },
  methods: {
    debounce,

    // 上拉开始时组件自动设置 loading 为 true，操作完成后需要我们手动设置 loading 为 false
    async handleLoad() {
      await this.fetchData()

      this.loading = false

      if (this.list.length >= this.pagination.total)
        this.finished = true
    },

    // 下拉刷新操作相当于常规 PC 端 CURD 页面中的点击查询按钮，查询第一页数据
    // 下拉开始时组件自动设置 refreshing 为 true，操作完成后需要我们手动设置refreshing 为 false，表示加载完成。
    async handleRefresh() {
      this.pagination.pageNum = 1
      this.list = []
      await this.fetchData()

      this.refreshing = false
    },

    async fetchData() {
      const params = {
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        warnBeginTime: '2024-05-24 00:00:00',
        warnEndTime: '2024-05-25 00:00:00',
      }
      const res = await getExampleList(params)

      const data = res.data
      this.pagination.total = data.total
      this.list = this.list.concat(data.list)
      this.pagination.pageNum += 1
    },
  },
})
</script>

<template>
  <div class="flex flex-col">
    <div class="home-header">
      <van-nav-bar title="首页" :border="false" />

      <van-search
        v-model="value"
        shape="round"
        background="transparent"
        placeholder="请输入搜索关键词"
      />

      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item">
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-tabs v-model:active="activeTab" shrink>
      <van-tab title="最近" />
      <van-tab title="收藏" />
      <van-tab title="授权于我" />
    </van-tabs>

    <div class="mt-4 flex-1 min-h-0 overflow-y-auto">
      <!-- <van-cell title="单元格" class="items-center">
      <template #icon>
        <svg-icon name="report" class="mr-2" />
      </template>
      <template #right-icon>
        <svg-icon name="more" :size="12" />
      </template>
    </van-cell>
    <van-cell title="单元格" class="items-center">
      <template #icon>
        <svg-icon name="report" class="mr-2" />
      </template>
      <template #right-icon>
        <svg-icon name="more" :size="12" />
      </template>
    </van-cell> -->

      <!-- <van-cell-group inset> -->
      <van-pull-refresh v-model="refreshing" @refresh="handleRefresh">
        <!-- 重要：v-model 这是vue2升到vue3的坑 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :offset="100"
          @load="handleLoad"
        >
          <div v-for="item in list" :key="item.recordId" :title="item.recordId" class="items-center">
            {{ item.recordId }}
          </div>
        </van-list>
      </van-pull-refresh>
      <!-- </van-cell-group> -->
    </div>
  </div>
</template>

<style scoped lang="less">
.home-header {
  background: linear-gradient(180deg, #7552CC 0%, rgba(117, 82, 204, 0) 100%);
}

:deep(.van-nav-bar) {
  background-color: transparent;
}

:deep(.van-nav-bar__title) {
  color: #fff;
}

.van-swipe img {
  margin: 0 auto;
}

:deep(.van-tabs__nav ) {
  background-color: transparent;
}
</style>
```

上面有问题，

1. 上拉到最后一页 finished 被设置为 true
2. 然后下拉刷新，此时请求的是第一页数据
3. 页面此时展示的是第一页，然后下拉，按理说应该可以拉取下一页，但因为第一步中 finished 被设置成了 true 导致实际不能拉取下一页

应该改为：

```html
<!-- <script setup lang="ts">
import { getExampleList } from '@/api/home'
import banner1 from '@/assets/banner1.svg'

const value = ref('')
const images = [banner1, banner1]
const activeTab = ref(0)
const examples = ref([])
const current = 1
</script> -->

<script lang="ts">
import { debounce } from 'lodash-es'
import { getExampleList } from '@/api/home'
import banner1 from '@/assets/banner1.svg'

export default defineComponent({
  data() {
    return {
      value: '',
      images: [banner1, banner1],
      activeTab: 0,

      list: [],

      // 当为 true，出现上拉加载中动画
      loading: false,
      // 当为 true，表示数据已经全部加载，后面无法再触发上拉事件
      finished: false,
      // 当为 true，出现下拉加载中动画
      refreshing: false,
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
    }
  },
  mounted() {
  },
  methods: {
    debounce,

    // 上拉开始时组件自动设置 loading 为 true，操作完成后需要我们手动设置 loading 为 false
    async handleLoad() {
      this.pagination.pageNum += 1
      await this.fetchData()

      this.loading = false

      // if (this.list.length >= this.pagination.total)
      //   this.finished = true
    },

    // 下拉刷新操作相当于常规 PC 端 CURD 页面中的点击查询按钮，查询第一页数据
    // 下拉开始时组件自动设置 refreshing 为 true，操作完成后需要我们手动设置refreshing 为 false，表示加载完成。
    async handleRefresh() {
      this.pagination.pageNum = 1
      this.list = []
      await this.fetchData()

      this.refreshing = false
    },

    async fetchData() {
      const params = {
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        warnBeginTime: '2024-05-24 00:00:00',
        warnEndTime: '2024-05-25 00:00:00',
      }
      const res = await getExampleList(params)

      const data = res.data
      this.pagination.total = data.total
      this.list = this.list.concat(data.list)

      // 改动点
      if (this.list.length >= this.pagination.total)
        this.finished = true
      else this.finished = false
    },
  },
})
</script>

<template>
  <div class="flex flex-col">
    <div class="home-header">
      <van-nav-bar title="首页" :border="false" />

      <van-search
        v-model="value"
        shape="round"
        background="transparent"
        placeholder="请输入搜索关键词"
      />

      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item">
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-tabs v-model:active="activeTab" shrink>
      <van-tab title="最近" />
      <van-tab title="收藏" />
      <van-tab title="授权于我" />
    </van-tabs>

    <div class="mt-4 flex-1 min-h-0 overflow-y-auto">
      <!-- <van-cell title="单元格" class="items-center">
      <template #icon>
        <svg-icon name="report" class="mr-2" />
      </template>
      <template #right-icon>
        <svg-icon name="more" :size="12" />
      </template>
    </van-cell>
    <van-cell title="单元格" class="items-center">
      <template #icon>
        <svg-icon name="report" class="mr-2" />
      </template>
      <template #right-icon>
        <svg-icon name="more" :size="12" />
      </template>
    </van-cell> -->

      <!-- <van-cell-group inset> -->
      <van-pull-refresh v-model="refreshing" @refresh="handleRefresh">
        <!-- 重要：v-model 这是vue2升到vue3的坑 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :offset="100"
          @load="handleLoad"
        >
          <div v-for="item in list" :key="item.recordId" :title="item.recordId" class="items-center">
            {{ item.recordId }}
          </div>
        </van-list>
      </van-pull-refresh>
      <!-- </van-cell-group> -->
    </div>
  </div>
</template>

<style scoped lang="less">
.home-header {
  background: linear-gradient(180deg, #7552CC 0%, rgba(117, 82, 204, 0) 100%);
}

:deep(.van-nav-bar) {
  background-color: transparent;
}

:deep(.van-nav-bar__title) {
  color: #fff;
}

.van-swipe img {
  margin: 0 auto;
}

:deep(.van-tabs__nav ) {
  background-color: transparent;
}
</style>
```