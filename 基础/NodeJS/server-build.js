const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const path = require('path')

const jsonPlaceholderProxy = createProxyMiddleware({
  // 登录接口调不通（鸿景）
  // target: 'http://10.202.218.7:8080',
  // 可以用的环境（鸿景）
  // target: 'http://10.202.218.5:32872',
  // 已有集群（远哥）
  // target: 'http://10.202.218.7:33536',
  // 远哥布的环境
  target: 'http://10.202.218.7:34533',
  // 全新，用于创建集群（鸿景）
  // target: 'http://10.202.218.4:33008',
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logger: console,
});

const app = express();
// ambari-web
app.use(express.static(path.resolve(__dirname, '../ambari-web/public')));

// ambari-admin
app.use('/views/ADMIN_VIEW/2.7.5.0/INSTANCE', express.static(path.resolve(__dirname, '../ambari-admin/src/main/resources/ui/admin-web/dist')));

// YARN Query Manager
app.use('/views/CAPACITY-SCHEDULER/1.0.0/AUTO_CS_INSTANCE', express.static(path.resolve(__dirname, '../contrib/views/capacity-scheduler/src/main/resources/ui/public')));

// Files view
app.use('/views/FILES/1.0.0/AUTO_FILES_INSTANCE', express.static(path.resolve(__dirname, '../contrib/views/files/src/main/resources/ui/dist')));


app.use('/api/v1', jsonPlaceholderProxy);

app.listen(8880);
