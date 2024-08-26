# 对象存储 COS

## 用作图床

之前博客中使用的图片都是放在项目中，这种方式有以下缺点：

- 当图片很多时，会导致项目体积很大。
- 假如把图片集中存放到 Public  目中（对于 VuePress，默认的 Public 目录是 `.vuepress/public`），如：

  ```plain
  └─ docs
    ├─ .vuepress
    |  └─ public
    |     └─ images
    |        └─ hero.png  # <- Logo 文件
    └─ guide
        └─ assets.md       # <- 我们在这里
  ```

  我们可以这样在当前页面引用 Logo ：

  ```md
  ![VuePress Logo](/images/hero.png)
  ```

  但是，上述只能在开启开发服务器或者打包部署后才能显示图片，而无法直接通过 VSCode 预览 markdown 文件的形式查看图片。

使用图床刚好可以解决以上缺点，使用图床，将图片等静态资源与代码分开，可以大大减小项目体积，当使用编辑器编辑项目时，可以提高编辑器运行流畅度。

使用图床后，图片是通过 http 或 https 的方式引用的，不管是开发、生产还是直接预览markdown 文件，都可以正常显示图片（前提是要有网络）。

## 使用 PicGo

PicGo 极大方便了将资源上传到腾讯云 COS，例如通过右键菜单上传。

在 PicGo 中设置腾讯云COS（对象存储），步骤如下：

1. 下载并安装 PicGo。
2. 进入 PicGo 【图床设置】-【腾讯云COS】中配置腾讯云COS相关信息，其中
   - AppId：在腾讯云“访问管理 / 访问密钥 / API密钥访问”中查看。
   - SecretId：在腾讯云“访问管理 / 访问密钥 / API密钥访问”中查看。
   - SecretKey：SecretId 对应的 SecretKey，注意腾讯云关闭了查询 SecretKey 的功能，仅支持在创建时查看，请及时保存 SecretKey。
   - Bucket：腾讯云COS中创建的存储桶名称。
   - 存储区域：存储桶所在的地域，例如 ap-guangzhou。
3. 之后就可以通过右键上传资源文件了。

## 如何使用自定义域名

### 查看默认域名

默认域名，即 COS 源站域名，是创建存储桶时，由系统根据存储桶名称和地域自动生成的，默认域名很长、很难看。在存储桶概览中可查看默认域名：

![](https://image.newarea.site/2024-01-31-22-12-04.png)

### 新增域名解析

![](https://image.newarea.site/2024-01-31-22-17-48.png)

### 开启自定义源站域名

![](https://image.newarea.site/2024-01-31-22-40-38.png)

自此就可以使用自定义域名替换默认域名来访问资源了。

## 如何使用 https 请求

替域名`image.newarea.site`申请免费 SSL 证书：

![](https://image.newarea.site/2024-01-31-22-34-21.png)

绑定证书:

![](https://image.newarea.site/2024-01-31-22-37-17.png)