# 查看系统信息 CPU、内存信息

[Linux下查看CPU型号,内存大小,硬盘空间的命令(详解)](https://blog.csdn.net/qq_37960324/article/details/82704576)

## 1 CPU

- `cat /proc/cpuinfo | grep "physical id" | uniq | wc -l` 查看CPU个数。uniq命令：删除重复行;wc –l命令：统计行数

- `cat /proc/cpuinfo | grep "cpu cores" | uniq` 查看CPU核数

- `cat /proc/cpuinfo | grep 'model name' | uniq` 查看CPU型号

![](https://image.newarea.site/2023-12-02-23-16-06.png)

总结：1个1核CPU，型号Intel(R) Xeon(R) Gold 6278C CPU @ 2.60GHz

## 2 内存

- `cat /proc/meminfo | grep MemTotal` 查看总的内存大小

## 3 电脑和操作系统的相关信息

[uname命令](https://www.jianshu.com/p/e7d8f5a650f1)


## 4 磁盘空间

`df -hl`，以下是查看刚购买的云服务器磁盘剩余空间，可以发现Linux操作系统占用的空间才几G而已，并不大

![](https://image.newarea.site/2023-12-02-23-16-07.png)
