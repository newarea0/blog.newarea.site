# 抽离弹框组件

即使是简单功能，弹框的代码量一般都比较多，好多时候，页面中可能不止一个弹框，如果不抽离弹框，代码就会显得很臃肿。

功能点：

- 将弹框抽离成单独组件；
- 设置组件不变的默认参数；
- 使用 `v-bind`、`v-on`，减少变量命名麻烦；
- 使用 `useAttrs()` 接收组件变化的参数。

![01](https://image.newarea.site/20230529/01.png)

1 src/settings/modal.ts 组件默认配置

```ts
export default {
  maskClosable: false,
  draggable: true
}
```

2 src/components/user-modal/index.vue 封装弹框组件

```html
<template>
  <a-modal v-bind="options">
    <a-form v-bind="formOptions" ref="formRef">
      <a-form-item field="name" label="用户名">
        <a-input
          v-model="formOptions.model.name"
          placeholder="请输入"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { reactive, computed, useAttrs, ref, ComputedRef } from 'vue'
  import type { FormInstance } from '@arco-design/web-vue'
  import { Modal, Message } from '@arco-design/web-vue'

  import modalSetting from '@/settings/modal'

  const props = defineProps({
    id: {
      type: Number
    }
  })
  const emit = defineEmits(['success'])
  const attrs = useAttrs()

  // 表单
  const formRef = ref<FormInstance>()
  const formOptions = reactive<FormInstance['$props']>({
    model: {
      name: ''
    },
    rules: {
      // 这种提示语比“请输入用户名”好，因为“输入”要根据组件的类型来确定，有可能是“选择”，这增加了“工作量”
      name: [{ required: true, message: '用户名不能为空' }]
    }
  })
  // 弹框
  const options: ComputedRef<InstanceType<typeof Modal>['$props']> = computed(() => {
    const type = props.id ? '编辑' : '新增'
    return {
      // 设置默认参数
      ...modalSetting,
      // 设置变化的参数
      ...attrs,
      title: `${type}用户`,
      // 打开弹框动画开始前
      onBeforeOpen() {
        if (props.id) {
          setTimeout(() => {
            formOptions.model.name = 'Jack'
          }, 0)
        }
      },
      async onBeforeOk(done) {
        const err = await formRef.value.validate()
        if (err) return done(false)
        emit('success')
        Message.success(`${type}成功`)
        return done(true)
      },
      // 关闭弹框动画结束后
      onClose() {
        formRef.value.resetFields()
      }
    }
  })
</script>
```

3 src/views/test/index.vue 使用封装的组件

```html
<template>
  <a-button @click="handleClick">my-modal</a-button>
  <!-- 第二步，模板中使用组件 -->
  <user-modal v-bind="userOptions" />
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  // 第一步，导入组件
  import UserModal from '@/components/user-modal/index.vue'

  // 第三步，编写组件 options
  const userOptions = reactive({
    visible: false,
    id: undefined,
    'onUpdate:visible'(val) {
      userOptions.visible = val
    }
  })

  function handleClick() {
    userOptions.id = 1
    userOptions.visible = true
  }
</script>
```