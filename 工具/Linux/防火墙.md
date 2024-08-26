# 防火墙

> 环境：CentOS 7.8 64bit、firewalld 0.6.3

## 防火墙管理

```sh
# 开启防火墙
[root@VM-4-9-centos ~]# systemctl start firewalld

# 关闭防火墙
[root@VM-4-9-centos ~]# systemctl stop firewalld

# 重启防火墙，等同于 firewall-cmd --reload
[root@VM-4-9-centos ~]# systemctl restart firewalld

# 查看防火墙运行状态，running 运行、not running 未运行
[root@VM-4-9-centos ~]# firewall-cmd --state
```

```sh
# 查看命令帮助信息
[root@VM-4-9-centos ~]# firewall-cmd --help
```

## 端口管理

```sh
# 查看当前的默认区域
[root@VM-4-9-centos ~]# firewall-cmd --get-default-zone
public

# 放开 8080 端口
[root@VM-4-9-centos ~]# firewall-cmd --permanent --zone=public --add-port=8080/tcp

# 关闭 8080 端口
[root@VM-4-9-centos ~]# firewall-cmd --permanent --zone=public --remove-port=8080/tcp

# 查看 public 区域的端口
[root@VM-4-9-centos ~]# firewall-cmd --zone=public --list-ports
20/tcp 21/tcp 22/tcp 80/tcp 443/tcp 8888/tcp 39000-40000/tcp 8880/tcp 1234/tcp

# 查看 public 区域的永久端口
[root@VM-4-9-centos ~]# firewall-cmd --permanent --zone=public --list-ports
20/tcp 21/tcp 22/tcp 80/tcp 443/tcp 8888/tcp 39000-40000/tcp 8880/tcp
```

如果命令中不加 `--zone=区域名`， 那么都是在默认区域中进行操作。

如果命令中不加 `--permanent`， 那么重启防火墙，将恢复原先配置。
