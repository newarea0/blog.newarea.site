# 如何设置 Ant Design 的全局配置

通过 Umi 插件 [Antd](https://umijs.org/docs/max/antd) 来设置。

```ts
// config/config.ts
export default {
  antd: {
    configProvider: {
      componentSize: 'small'
    }
  }
}
```
