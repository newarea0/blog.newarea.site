# docker commit

`docker commit` 命令用于将容器的当前状态保存为一个新的镜像。这对于创建一个包含容器修改内容（如安装的软件包、配置更改等）的新镜像非常有用。简单来说，它是从现有容器创建一个新的自定义镜像。

## 命令格式：

```bash
docker commit [OPTIONS] CONTAINER_ID IMAGE_NAME[:TAG]
```

- `CONTAINER_ID`：你要创建镜像的容器的 ID 或名称。
- `IMAGE_NAME`：你希望为新镜像指定的名称。
- `TAG`：镜像的标签（可选，默认为 `latest`）。标签通常用于标识镜像的不同版本。

## 示例：

假设你有一个正在运行的容器 `my_container`，并且你想保存当前状态为一个新的镜像 `my_custom_image`，可以使用以下命令：
```bash
docker commit my_container my_custom_image
```

如果你想为镜像指定版本标签，例如 `v1`，可以这样做：
```bash
docker commit my_container my_custom_image:v1
```

## 常用选项：

- `-a`：设置镜像的作者信息。
  ```bash
  docker commit -a "Your Name" my_container my_custom_image:v1
  ```
- `-m`：为提交添加一条提交信息（类似 Git 提交说明）。
  ```bash
  docker commit -m "Added new software to container" my_container my_custom_image:v1
  ```
- `-p`：如果容器正在运行，将会暂停容器，完成提交后再恢复。

## 典型使用场景：

1. **基于修改的容器创建镜像**：例如，你在容器内安装了一些新的软件包，或者修改了配置文件，想要保存这些更改作为一个新的镜像。
2. **从容器派生新镜像**：你可以基于某个容器创建一个新镜像，然后再从这个镜像启动新容器。

## 注意：

- `docker commit` 创建的是容器的快照，包含容器内的文件系统的变化，但不会记录容器的运行时状态（如环境变量、网络设置等）。
- 如果你修改了容器中的某些内容（例如：安装软件、编辑配置文件等），这些修改会被包含在新的镜像中，但对于其他的容器配置（如端口映射、挂载的卷等）则需要在创建新的容器时指定。

总结来说，`docker commit` 是将容器的更改保存为镜像的一种方式，适用于你想要以当前容器状态为基础创建一个新的镜像并用于未来的部署或分发。
