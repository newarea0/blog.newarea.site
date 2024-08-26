# 动态设置 el-table 高度

vue基于elementui设置表格动态高度的几种方法
===========================

> ##### 方法一 css + js的形式

这个方法需要在表格外层设置一个div，原理是将表格的高度设置成外层div的高度，所以外层的div需要使用calc来设置高度，然后给表格设置:height="tableH"的属性

```vue
<div class="table-wrapper" ref="tableWrapper" v-loading="loading">
  <el-table :data="tableData" stripe style="width: 100%" :height="tableH">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
 </el-table>
</div>
```

最外层div高度的设置方法

```vue
//这里减去的是你个人业务除了表格之外其他内容的高度，比如查询条件等
<style lang="scss" scoped>
.table-wrapper {
    height: calc(100% - 60px);
 }
</style>
```

动态获取表格高度tableH的方法

```vue
<script>
// 在data里面初始化tableH
data() {
  return {
     tableH: 0
  }
},
methods: {
  // 重置table高度
      resetHeight() {
        return new Promise((resolve, reject) => {
          this.tableH = 0
          resolve()
        })
      },
      // 设置table高度
      fetTableHeight() {
        this.resetHeight().then(res => {
          this.tableH = this.$refs.tableWrapper.getBoundingClientRect().height - 10
        })
      }
},
// 调用
 mounted() {
    this.fetTableHeight();
 }
</script>
```

> ##### 方法二 纯css的形式

还是需要在表格外加一层div,div高度设置和方法一相同，不过表格高度不用动态设置，直接设置height="100%"即可

> ##### 方法三 指令的形式

这种方法不需要设置外层div,定义一个文件夹tableHeight分别定义一个tableHeight.js和index.js\
tableHeight.js如下

```js
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

// 设置表格高度
const doResize = async (el, binding, vnode) => {
  // 获取表格Dom对象
  const { componentInstance: $table } = await vnode
  // 获取调用传递过来的数据
  const { value } = binding
  // if (!$table.height) {
  //   throw new Error(`el-$table must set the height. Such as height='100px'`)
  // }
  // console.log($table, '$table$table$table$table')
  // 获取距底部距离（用于展示页码等信息）
  const bottomOffset = (value && value.bottomOffset) || 30
  if (!$table) return
  // 计算列表高度并设置
  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  // $table.layout.setMaxHeight(height)
  $table.layout.setHeight(height)
  // $table.maxHeight = height
  $table.doLayout()
}

export default {
  // 初始化设置
  bind(el, binding, vnode) {
    // 设置resize监听方法
    el.resizeListener = async () => {
      await doResize(el, binding, vnode)
    }
    // 绑定监听方法到addResizeListener
    addResizeListener(window.document.body, el.resizeListener)
  },
  // // 绑定默认高度
  async inserted(el, binding, vnode) {
    await doResize(el, binding, vnode)
  },
  // // 销毁时设置
  unbind(el) {
    // 移除resize监听
    removeResizeListener(el, el.resizeListener)
  }
}
```

index.js如下

```js
import tableHeight from './table-height'

const install = function(Vue) {
  // 绑定v-adaptive指令
  Vue.directive('tableHeight', tableHeight)
}

if (window.Vue) {
  window['tableHeight'] = tableHeight
  // eslint-disable-next-line no-undef
  Vue.use(install)
}

tableHeight.install = install

export default tableHeight
```

使用方式，在main.js里面引入以便全局使用，当然你也可以局部引入\
main.js

```js
// 这个是你刚刚写的index.js的路径
import tableHeight from '@sysmng/directive/tableHeight'
// 表格自适应指令
Vue.use(tableHeight)
```

在表格中使用

```vue
// 这里需要设置一个默认的高度，多少都可以，然后后面的60就是除了表格之外其他内容的高度，比如查询条件等
// 指令的好处是会监听屏幕的变化来动态改变高度
<el-table :data="tableData" stripe style="width: 100%" height="100px" v-tableHeight="{bottomOffset: 60}">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
 </el-table>
```
