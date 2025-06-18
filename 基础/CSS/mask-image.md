# mask-image

为一个元素的上下边缘添加渐隐的遮罩效果（mask），中间内容清晰可见，而顶部和底部逐渐透明。

```css
mask-image: linear-gradient(
        to bottom,                                     // 渐变方向: 从上到下
        rgba(0, 0, 0, 0) 0px,                        // 顶部 alpha 为 0，透明，显示父元素
        rgba(0, 0, 0, 1) 36px,                       // 到距离顶部 36px 时，alpha 为 1，不透明，显示元素本身
        rgba(0, 0, 0, 1) calc(100% - 36px),          // 到距离底部 36px 时，alpha 为 1，不透明，显示元素本身
        rgba(0, 0, 0, 0) 100%                        // 底部 alpha 为 0，透明，显示父元素
      );
```

`mask-image` 的遮罩层不是叠加在元素上方的“可见图层”，而是一个控制元素可见区域的 `alpha`。`mask-image` 值中颜色值 RGB 不重要，重要的是 `alpha`。

- `alpha` 为 0，透明，元素完全透明，显示父元素。
- `alpha` 为 1，不透明，元素完全不透明，显示元素本身。
