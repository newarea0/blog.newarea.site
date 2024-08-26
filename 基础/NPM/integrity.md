# 完整性

查看 npm 包的基本信息：
```
npm info packageA
npm info packageA@x.x.x
```

如：

![](https://image.newarea.site/20230820/01.png)

其中几个属性的含义：

- tarball: npm 包的下载地址。
- shasum: 1。
- integrity: 用于校验 npm 包的完整性，防止文件被篡改，由哈希算法名称、npm 包经哈希算法加密计算后得到的哈希值组成。

本地也可以手动计算 npm 包的 integrity 值：

- 根据 tarball 下载 npm 包 ignore-5.1.4.tgz
- 打开 Git Bash 终端进入 ignore-5.1.4.tgz 所在目录，执行 `openssl dgst -sha512 -binary ignore-5.1.4.tgz | openssl base64 -A `，控制台会输出哈希值 `MzbUSahkTW1u7JpKKjY7LCARd1fU5W2rLdxlM4kdkayuCwZImjkpluF9CM1aLewYJguPDqewLam18Y6AU69A8A==`
- 拼接哈希算法名和哈希值得到 integrity 值 `sha512-MzbUSahkTW1u7JpKKjY7LCARd1fU5W2rLdxlM4kdkayuCwZImjkpluF9CM1aLewYJguPDqewLam18Y6AU69A8A==`

