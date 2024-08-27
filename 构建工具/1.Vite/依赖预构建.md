# 依赖预构建 deps pre build

用于开发阶段

预构建哪些依赖

## 1 预构建做了哪些事

### 将使用 CommonJS、UMD 模块转成 ES 模块

Vite 通过 `<script type="module">` 方式在浏览器中使用原生 ES 模块（ESM），所以需要将 CommonJS、UMD 模块转成 ES 模块。

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### 将那些具有许多内部模块的 ESM 依赖项转换为单个模块

下面用一个简单示例来说明

#### 未使用 Vite

新建一个普通 Npm 项目 lodash-es-study，其中 index.html 内容如下：

![14](https://image.newarea.site/20230424/14.png)

预览该页面，发现 Network 下请求了一堆资源：

![18](https://image.newarea.site/20230424/18.png)

原来是因为 debounce.js 依赖了其他模块（如 toNumber.js），toNumber.js 也依赖了其他模块（如 isObject.js）...

![16](https://image.newarea.site/20230424/16.png)

![17](https://image.newarea.site/20230424/17.png)

#### 使用 Vite

- 新建项目 lodash-es-study-vite
- 添加依赖

  ```sh
  pnpm install lodash-es
  pnpm install vite -D
  ```

- 新建文件 index.html

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <script type="module">
        import debounce from 'lodash-es'
        console.log(debounce);
      </script>
    </body>
  </html>
  ```

- 修改 package.json 文件 `script` 项
  
  ```json
  "scripts": {
    "dev": "vite"
  }
  ```

- 执行命令 `npm run dev`

![](https://image.newarea.site/2024-02-21-15-41-48.png)

![](https://image.newarea.site/2024-02-21-15-43-27.png)

![](https://image.newarea.site/2024-02-21-15-45-29.png)

如果是 Vite 项目，Vite 预构建会递归查找模块所依赖的资源，并将其打包成一个文件（node_modules/.vite/deps/lodash-es.js），从而减少 Http 请求。

### 修改依赖路径

`<script type="module">` 方式是不支持裸模块（即 "bare import"，如 `import debounce from 'lodash-es'`）引用的，Vite 会将路径改成相对路径导入

## 哪些模块会被预构建

首先是 package.json 中记录的依赖，其次是项目中有用到或者 Vite 配置文件 `optimizeDeps.include` 中显式包含的依赖


## 缓存、哪些时候会预构建

- 包管理器的锁文件内容，例如 package-lock.json，yarn.lock，pnpm-lock.yaml，或者 bun.lockb；
- 补丁文件夹的修改时间；
- vite.config.js 中的相关字段；
- NODE_ENV 的值。
- 
只有在上述其中一项发生更改时，才需要重新运行预构建。

如果出于某些原因你想要强制 Vite 重新构建依赖项，你可以在启动开发服务器时指定 --force 选项，或手动删除 node_modules/.vite 缓存目录。


## 如何解决首次进入一个新路由页面加载慢的问题

`npm i -D vite-plugin-optimize-persist vite-plugin-package-config`

```ts
// vite.config.ts
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

export default {
  plugins: [
    PkgConfig(),
    OptimizationPersist()
  ]
}
```
