# 部署

## 背景

之前部署流程是先在本地打包，压缩后传到服务器临时目录，然后放到目标目录。

1. 将前端包（`dist.zip`）丢到服务器临时目录。

2. 进入存放前端包的文件夹。

    ```sh
    cd /app/nginx/nginx1.16.0/html/log_spider
    ```

3. 删除以往压缩包。

    ```sh
    rm dist.zip
    ```

4. 从临时目录将最新前端包放入当前目录。

    ```sh
    cp /tmp/log_spider/dist.zip ./
    ```

5. 备份当前前端包（`mv dist dist_月日_时分`），此时 dist 文件夹没了，如：

    ```sh
    mv dist dist_0620_1808
    ```

6. 解压当前目录。

    ```sh
    unzip dist.zip
    ```

这一套流程下来，不仅耗时长，而且容易出错。

## 使用可执行脚本

### 创建脚本

在临时目录 `/tmp/log_spider` 新建部署脚本 `touch deploy.sh`，内容如下：

```sh
#!/bin/bash

# 1. 进入存放前端包的文件夹
cd /app/nginx/nginx1.16.0/html/log_spider
echo "1. 进入目录 /app/nginx/nginx1.16.0/html/log_spider"

# 2. 删除以往压缩包
# 检查 dist.zip 文件是否存在
if [ -f "dist.zip" ]; then
    # 如果存在，则删除该文件
    echo "2. 删除 dist.zip 文件..."
    rm "dist.zip"
else
    echo "2. dist.zip 文件不存在，无需删除。"
fi

# 3. 从临时目录将最新前端包放入当前目录
cp /tmp/log_spider/dist.zip ./
echo "3. 放入前端包 dist.zip"

# 4. 备份当前前端包
# 获取当前日期和时间的格式化字符串，格式为月日时分，例如0808_1622
timestamp=$(date +"%m%d_%H%M")
# 原始目录名
original_dir="dist"
# 新目录名，包括日期时间后缀
new_dir="dist_${timestamp}"
# 执行重命名操作
mv "${original_dir}" "${new_dir}"
# 输出结果
echo "4. 目录 ${original_dir} 已重命名为 ${new_dir}"

# 5. 解压当前目录
unzip dist.zip
echo "5. 解压成功"
```

### 赋予脚本可执行权限

```sh
chmod +x deploy.sh
```

### 执行脚本文件

在当前目录执行，如果脚本文件在当前目录，直接使用 `./` 前缀执行它。

```sh
./deploy.sh
```
