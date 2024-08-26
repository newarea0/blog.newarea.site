# source、export

## source

Shell 可以类比 Java、Python、JavaScript，是一门语言，它的执行都需要解释器。和 Python、JavaScript 一样，都有命令行交互模式和脚本模式。用户登录到 Linux 系统后，即进入 Shell 命令行交互模式。

运行 Shell 脚本程序时，系统将创建一个子 Shell。此时，系统中将有两个 Shell，一个是登录时系统启动的 Shell，另一 个是系统为运行脚本程序创建的 Shell。当一个脚本程序运行完毕，它的脚本Shell将终止，可以返回到执行该脚本之前的 Shell。

Shell 脚本的执行方式通常有如下三种：

- `./test.sh`
  `test.sh` 为可执行文件（修改相关权限命令 `chmod a+x ./test.sh`）。

- `sh test.sh`

  如果 `test.sh`没有可执行权限（即文件权限属性x位为`-`号），或者脚本文件开头没有指定解释器时需要使用的方式。

- `source test.sh`

  读入脚本并执行脚本，即在当前 Shell 中执行 `source`，加载并执行的相关脚本文件的命令及语句，而不是产生一个子 Shell 来执行文件中的命令。

**例子：**

在当前目录（`/root/`）下新建文件 `test.sh`，内容如下：

```sh
name='Jack'
echo 'hello'
```

```
# 直接执行，报错：权限拒绝。
[root@VM-4-9-centos ~]# ./test.sh
-bash: ./test.sh: Permission denied

# 使用 sh 命令可以执行成功。
[root@VM-4-9-centos ~]# sh ./test.sh
hello, Jack
# 变量 $name 输出为空，因为 echo 是在当前 Shell 环境中执行的，而变量是定义在子 Shell 环境中的。
[root@VM-4-9-centos ~]# echo $name

# 使用 source 可以成功输出变量 $name。
[root@VM-4-9-centos ~]# source ./test.sh
hello, Jack
[root@VM-4-9-centos ~]# echo $name
Jack
```

## export var

用 `export` 定义的变量不仅对该 Shell 有效，对子 Shell 也有效

编辑 `/etc/profile` 文件来修改环境变量：

```sh
...
export PATH=...
```
执行脚本：

`source /etc/profile`

`source` 作用是在当前 Shell 中执行 `/etc/profile`，而不是新建子Shell。用 `export` 定义 PATH 变量，使该变量对子 Shell 也有效。因为所有脚本模式中的子 Shell 都是登录 Linux 后进入的用户 Shell 的子 Shell，结合使用 `source` 和 `export`，上述修改可以使PATH变量在用户 Shell 和子 Shell 中生效。

## 类比 JavaScript 命令行交互模式来说明

```
node-demo
├─index.js
└package.json
```
