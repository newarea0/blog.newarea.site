# WebStorm 设置

[WebStorm Setup](https://prettier.io/docs/en/webstorm.html)

默认情况下，WebStorm 会将格式应用于您在项目中编辑的所有 .js、.ts、.jsx 和 .tsx 文件。要将格式应用于其他文件类型，或将格式限制为仅位于特定目录中的文件，您可以使用 glob 模式自定义默认配置。如 Vue 项目中，想要格式 SFC 文件，需要：

![01](https://image.newarea.site/20230718/10.png)

同意如果想格式化 HTML、CSS 等文件，也需要做相同配置。

注意只用在修改了文件，或按快捷键 Ctrl+Alt+L 才会触发对文件的格式化。