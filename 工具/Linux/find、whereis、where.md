# find、whereis、where

## 1 find

find是最常见和最强大的查找命令，你可以用它找到任何你想找的文件，类似Window中的Everything。

用法：`find <指定目录> <指定条件> <指定动作>`

例子：

`find . -name "python*"` 搜索当前目录（含子目录，以下同）中，所有文件名以python开头的文件。

`# find /root -name "python*"` 搜索/root目录（含子目录）中，所有文件名以python开头的文件。

`# find . -name "*.py"` 搜索当前目录（含子目录）中，所有文件扩展名为py的文件。

## 2 whereis

whereis命令只能用于程序名的搜索，而且只搜索二进制文件（参数-b）、man说明文件（参数-m）和源代码文件（参数-s）。如果省略参数，则返回所有信息。

```sh
[root@ecs-s6-medium-2-linux-20200125191715 ~]# whereis java
java: /usr/local/java /usr/share/java /usr/local/java/jdk1.8.0_241/bin/java
[root@ecs-s6-medium-2-linux-20200125191715 ~]# whereis nginx
nginx: /usr/sbin/nginx /usr/lib64/nginx /etc/nginx /usr/share/nginx /usr/share/man/man3/nginx.3pm.gz /usr/share/man/man8/nginx.8.gz
```

## 3 which

which命令的作用是，在PATH变量指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。

```sh
[root@ecs-s6-medium-2-linux-20200125191715 ~]# which java
/usr/local/java/jdk1.8.0_241/bin/java
[root@ecs-s6-medium-2-linux-20200125191715 ~]# which nginx
/usr/sbin/nginx
[root@ecs-s6-medium-2-linux-20200125191715 ~]# which redis-server
/usr/bin/which: no redis-server in (/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/local/java/jdk1.8.0_241/bin:/usr/local/python3/bin:/usr/local/nodejs/bin:/root/bin)
```