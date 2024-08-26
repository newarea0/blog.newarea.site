# 常见问题

## 1 开发时，使用非localhost（域名、ip）访问页面时，页面不断刷新

[代理静态资源到本地后，一直 restart 刷新页面](https://umijs.org/docs/introduce/faq#%E4%BB%A3%E7%90%86%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E5%88%B0%E6%9C%AC%E5%9C%B0%E5%90%8E%E4%B8%80%E7%9B%B4-restart-%E5%88%B7%E6%96%B0%E9%A1%B5%E9%9D%A2)

解决办法：

先安装 cross-env：

```sh
pnpm i 8000 cross-env
```

修改 package.json 中的启动脚本

```json
"scripts": {
  // 修改前
  // "dev": "max dev",
  // 修改后，8000 为开发时的端口
  "dev": "cross-env SOCKET_SERVER=http://127.0.0.1:8000 max dev"
},
```
