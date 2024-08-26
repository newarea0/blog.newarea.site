# 源码结构

代码结构
----

![](https://image.newarea.site/20230528/25.png)

源码位置是在package文件件内，实际上源码主要分为两部分，编译器和运行时环境。

-   编译器
    -   compiler-core 核心编译逻辑
        -   基本类型解析
        -   AST
    -   compiler-dom 针对浏览器的编译逻辑
        -   v-html
        -   v-text
        -   v-model
        -   v-clock
-   运行时环境
    -   runtime-core 运行时核心
        -   inject
        -   生命周期
        -   watch
        -   directive
        -   component
    -   runtime-dom 运行时针对浏览器的逻辑
        -   class
        -   style
    -   runtime-test 测试环境仿真

        > 主要为了解决单元测试问题的逻辑 在浏览器外完成测试比较方便

-   reactivity 响应式逻辑

-   template-explorer 模板解析器 可以这样运行

    ```
    yarn dev template-explorer
    复制代码
    ```

    ![](https://image.newarea.site/20230528/26.png)

    ![](https://image.newarea.site/20230528/27.png)

    然后打开index.html

    ![](https://image.newarea.site/20230528/28.png)

-   vue 代码入口

    > 整合编译器和运行时

    ![](https://image.newarea.site/20230528/29.png)

-   server-renderer 服务器端渲染（TODO）

-   share 公用方法

转载自 [尝鲜Vue3之五：源码结构](https://juejin.cn/post/6844903976391950343)
