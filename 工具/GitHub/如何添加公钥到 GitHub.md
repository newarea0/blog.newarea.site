# 如何添加公钥到 GitHub

首先本地安装了git，并且生成了公私钥：id_rsa、id_rsa.pub，然后将公钥id_rsa.pub的内容添加到 GitHub

查看是否有.ssh目录：如C:\Users\Administrator\\.ssh，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果没执行命令 `ssh-keygen -t rsa -C "youremail@example.com"` 生成

将id_rsa.pub内容配置到 GitHub

验证是否配置成功

```bash
ssh -T git@github.com
```
