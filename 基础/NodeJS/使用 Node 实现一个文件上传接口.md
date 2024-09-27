# 使用 Node 实现一个文件上传接口

```sh
pnpm install express multer
```

```js
const express = require('express')
const multer = require('multer')

// 设置存储配置
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/') // 确保这个文件夹已经存在
  },
  filename(req, file, cb) {
    console.log(1, file)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

const app = express()

// 设置跨域访问
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// 单个文件上传的接口
// app.post('/upload', upload.single('file'), (req, res) => {
app.post('/upload', upload.array('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.')
  }

  res.send('File uploaded successfully')
})

const port = 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
```
