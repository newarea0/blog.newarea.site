# 查看命令位置

之所以能在命令行中快捷的使用 Windows 命令，是因为配置了环境变量 `Path`。想要查看命令所在路径，可以使用 `where.exe` 命令。

```bash
where.exe mysql

# 返回
# D:\mysql-8.0.18-winx64\bin\mysql.exe
```