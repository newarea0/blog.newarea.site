# DNS

DNS（域名服务器）

![](https://image.newarea.site/2024-01-27-17-24-00.png)

主机记录（域名的前缀）

- `www` 是指域名前带 `www` 的，以百度为例：www.baidu.com

- `@` 是指前面不带任何【主机名】的，以百度为例：baidu.com

- `*` 是指泛解析（利用通配符 `*` 星号来做子域名解析，实现所有子级域名指向相同网站空间），指除已添加的解析记录以外的所有主机都以此为准，以百度为例：`*baidu.com`，解析对应 ip 指向生效后当访问者无论是输入“123.baidu.com”还是“abc.baidu.com”抑或者“123.abc.baidu.com”甚至是任意字符组成的子域名均会指向到对应 IP 地址

域名 | 记录类型 | 记录值
:--|:--|:--
www.newarea.site | A | 122.51.210.64

不使用域名 | 使用域名
:--|:--
`http://122.51.210.64` | `http://www.newarea.site`
`http://122.51.210.64:9090` | `http://www.newarea.site:9090`