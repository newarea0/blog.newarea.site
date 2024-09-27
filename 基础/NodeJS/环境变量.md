# 环境变量

## 1 含义

process.env 属性返回一个包含用户环境信息的对象，该对象中的属性都是**环境变量**。如在 Windows 中打印 process.env，`console.log(process.env)`，返回的信息如下：

```js
{
  USERNAME: 'xxx', // 用户名
  PWD: 'E:/01-front-end/test/30tailwindcss/tailwind-test' // 当前目录
  OS: 'Windows_NT', // 操作系统
  PATH: '...' // 一个可执行程序的目录集合
  // ...
}
```

process 是 Node 中的一个全局变量，可以直接使用，无需使用 require()。

## 2 配置环境变量

### 2.1 Windows 系统

#### 2.1.1 临时配置

打开一个 cmd 窗口，

![01](https://image.newarea.site/20230719/16.png)

![02](https://image.newarea.site/20230719/17.png)

![04](https://image.newarea.site/20230719/19.png)

![05](https://image.newarea.site/20230719/20.png)

另外再打开一个 cmd 窗口，查看环境变量 HELLO，发现并不存在，说明上述设置方式是**临时的**。

此时新建一个文件 test.js

```js
console.log(process.env)
```

执行 `node test.js`，打印的对象中包含属性 HELLO。

![03](https://image.newarea.site/20230719/18.png)

#### 2.1.2 永久配置

右键(此电脑) -> 属性(R) -> 高级系统设置 -> 环境变量(N)...

### 2.2 Linux 系统

#### 2.2.1 临时配置

```sh
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在
echo $NODE_ENV
#如果不存在则添加环境变量
export NODE_ENV=production
#环境变量追加值
export path=$path:/home/download:/usr/local/
#某些时候需要删除环境变量
unset NODE_ENV
#某些时候需要显示所有的环境变量
env
```

#### 2.2.2 永久配置

打开配置文件所在

```sh
# 所有用户都生效
vim /etc/profile
# 当前用户生效
vim ~/.bash_profile
```

在文件末尾添加类似如下语句进行环境变量的设置或修改

```sh
# 在文件末尾添加如下格式的环境变量
export path=$path:/home/download:/usr/local/
export NODE_ENV = product
```

最后修改完成后需要运行如下语句令系统重新加载

```sh
# 修改/etc/profile文件后
source /etc/profile
# 修改~/.bash_profile文件后
source ~/.bash_profile
```