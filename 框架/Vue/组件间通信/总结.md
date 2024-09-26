# 组件间通信的方法

- props 和 自定义事件、v-model
- `ref` 和 `defineExpore`
- provide/inject
- 全局状态管理 pinia
- 作用域插槽
- 事件总线 mitt

Vue 官网（[新](https://v3-migration.vuejs.org/breaking-changes/events-api.html#event-bus)、[旧](https://v3.cn.vuejs.org/guide/migration/events-api.html#%E4%BA%8B%E4%BB%B6%E6%80%BB%E7%BA%BF)）其实以上几点已经有总结

各自的优缺点、使用场景

## 1 props 和 自定义事件、v-model

适用与父子组件间，父到子使用 props、子到父使用自定义事件、双向绑定 v-model

优点：简单、直接

缺点：仅限父子组件间使用，props 使用不当会造成“prop 逐渐透传”

## 2 `ref` 和 `defineExpore`

优点：简单直接

缺点：仅限父子组件间使用

## 3 provide/inject

可以避免“prop 逐渐透传”

## 4 全局状态管理 pinia

优点：全局的，在任何组件中都可以使用，不限组件层级

缺点：
- 需要增加额外文件；
- 由于它的便捷性，可能导致大量定义全局状态，容易埋下潜在的风险与bug

## 5 作用域插槽

缺点：
- 需要跟模板（DOM）一起使用
- 只能传递属性，无法传递方法

## 6 事件总线 mitt

优点：不限组件层级

缺点：`mitter.emit()` 算然可以向 `mitter.on()` 处传递参数，但是无法获知 `mitter.on()` 中的回调是否执行完毕，对于有些场景不适用

注意：当相应组件卸载时应即时取消监听
