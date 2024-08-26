# 根目录和源目录

本篇笔记用到的示例项目结构：

```
blog.newarea.site                                 
├─ pages                                          
│  ├─ api-examples.md                             
│  ├─ index.md                                    
│  └─ markdown-examples.md                        
├─ public                                         
│  └─ logo.svg                                    
├─ .vitepress                                      
│  ├─ theme                                       
│  │  ├─ index.ts                                 
│  │  └─ style.css                                
│  └─ config.mts                                  
├─ components.d.ts                                
├─ eslint.config.mjs                              
├─ package.json                                   
├─ pnpm-lock.yaml                                 
└─ vite.config.ts                                       
```

当 `.vitepress/config.mts` 中不显式设置 `srcDir` 时：

- pages 目录用来存放 markdown 文档，如 `pages/api-examples.md   ` 可以通过 `pages/api-examples` 来访问。
- Vite 配置文件 `vite.config.ts`，正常生效。
- 静态资源存放目录 `public`，正常生效。

当 `.vitepress/config.mts` 中显式设置 `srcDir: './pages'`，虽然页面访问路径简化了，如 `pages/api-examples.md   ` 访问路径变成了 `/api-examples`，但：

- Vite 配置文件 `vite.config.ts`，不生效。
- 静态资源存放目录 `public`，不生效。

当时此时将文件 `vite.config.ts`、目录 `public`移动到目录 `pages` 中，Vite 配置文件 `vite.config.ts`、静态资源存放目录 `public` 均又生效了。

**由此可见，`srcDir` 不仅设置了 markdown 文件所在的文件夹，也设置了 Vite 配置文件 `vite.config.ts`、静态资源存放目录 `public` 所在文件夹。**

## 根目录

项目根目录是 VitePress 将尝试寻找 `.vitepress` 特殊目录的地方。由执行命令 `vitepress` 时的参数决定。

- 假如 `package.json` 中脚本是这样：

  ```json
  "scripts": {
    "dev": "vitepress dev",
    //...
  },
  ```

  当在终端中执行 `pnpm dev` 时，VitePress 将使用当前工作目录（即 `blog.newarea.site`）作为项目根目录。

- 假如 `package.json` 中脚本是这样：

  ```json
  "scripts": {
    "dev": "vitepress dev docs",
    //...
  },
  ```

  当在终端中执行 `pnpm dev` 时，VitePress 将使用 `blog.newarea.site/docs`（在本示例项目中，该目录不存在）作为项目根目录。

## 源目录

源目录是 Markdown 源文件、Vite 配置文件 `vite.config.ts`、静态资源存放目录 `public`所在的位置。

默认情况下，它与**项目根目录**相同。但是，可以通过 `srcDir` 配置选项对其进行配置。

注意配置 `srcDir` 时，其值相对的是上面的**项目跟目录**。
