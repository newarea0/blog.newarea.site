# 定时任务

[linux定时任务](https://blog.csdn.net/antch620/article/details/88976473)

`crontab -l` 列出当前用户所有的定时任务。对于root用户，即列出/var/spool/cron/root文件（默认存在）中的定时任务。对于非root用户，如usertest，默认不存在/var/spool/cron/usertest文件，执行该命令会报no crontab for usertest，

`crontab -e` 编辑某个用户的crontab文件，如root用户，相当于`vim /var/spool/cron/root`

/var/spool/cron的文件属性默认是rwx------

## 1 添加任务

如当前用户usertest，新建/home/usertest/test/shell/hello.sh文件。内容：

```sh
#!/bin/bash
echo "Hello World!" >> /home/usertest/test/shell/result
```

表示添加Hello World!到/home/usertest/test/shell/result文件。

执行`chmod +x hello.py`给文件hello.py添加可执行权限

`crontab -e`编辑当前用户的corntab文件。在编辑界面添加

```
#会每分钟向/home/usertest/test/shell/result文件添加Hello World!
*/1 * * * * /home/usertest/test/shell/hello.sh
```

保存并退出。保存完定时任务即生效，会每分钟向/home/usertest/test/shell/result文件添加Hello World!

如果usertest用户第一次添加定时任务，会在/var/spool/cron目录下生成usertest文件，内容为

```
#会每分钟向/home/usertest/test/shell/result文件添加Hello World!
*/1 * * * * /home/usertest/test/shell/hello.sh
```

## 2 修改任务

`crontab -e` 编辑crontab文件，修改相应的定时任务，保存退出后即生效。

## 3 删除任务

`crontab -e` 删除相应的定时任务，保存退出后即生效。


## 4 注意

- 在每一条定时任务上方加上解释作用的注释

- `R`键紧邻`E`键，执行`crontab -e`时要小心，不要输入成了`crontab -r`，这会删除crontab文件

- 系统执行定时任务的日志存放在/var/log/cron，权限rw-------，日积月累，日志信息会非常大，可能会影响系统的正常运行，因此要定期清理日志文件`tail -f /var/log/cron `
