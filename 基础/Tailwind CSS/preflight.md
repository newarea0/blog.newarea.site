# preflight

默认的 preflight 样式可能会产生一些意想不到的结果，可以通过如下方式修改：

```css
/* tailwind.css */
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

@layer base {
  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    vertical-align: baseline;
  }
}
```

开发时根据实际情况更新 `@layer base {}` 即可。
