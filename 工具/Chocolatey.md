# Chocolatey

## 1. Chocolatey 介绍

Chocolatey 是 Windows 平台上的包管理器，类似于 Linux 上的 `apt`（Debian/Ubuntu）或 `yum`（CentOS）。它可以用于自动化安装、更新、配置和卸载软件。

### 1.1 Chocolatey 特点

- **自动化管理**：可通过命令行安装、更新和卸载软件。
- **丰富的软件库**：提供大量已打包的软件。
- **支持 PowerShell**：可以与 PowerShell 脚本集成，适用于 DevOps 场景。
- **便捷的依赖管理**：能自动安装相关依赖。
- **企业级支持**：提供更高级的安全性和管理能力。

## 2. Chocolatey 安装

[官网](https://chocolatey.org/install#individual)

### 2.1 安装前准备

- 需要 **Windows 7 及以上版本**（推荐 Windows 10/11）。
- 需要管理员权限运行命令行。
- 需要安装 `.NET Framework 4+` 和 `PowerShell 3+`。

### 2.2 使用 PowerShell 安装

1. **以管理员身份运行 PowerShell**（Win + X → Windows PowerShell（管理员））。
2. 运行以下命令安装 Chocolatey：

   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; \
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; \
   iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

3. 安装完成后，运行以下命令验证是否成功安装：

   ```powershell
   choco -v
   ```

   若成功安装，将显示 Chocolatey 的版本号。

## 3. Chocolatey 使用示例

### 3.1 安装软件

使用 `choco install` 命令安装软件，例如安装 Google Chrome：

```powershell
choco install googlechrome -y
```

`-y` 选项表示自动确认安装。

### 3.2 卸载软件

```powershell
choco uninstall googlechrome -y
```

### 3.3 更新软件

```powershell
choco upgrade googlechrome -y
```

### 3.4 搜索软件

可以使用 `choco search` 命令查找可用的软件包，例如查找 VS Code：

```powershell
choco search vscode
```

### 3.5 安装多个软件

可以一次安装多个软件，例如：

```powershell
choco install git vscode nodejs -y
```

### 3.6 查看已安装的软件

```powershell
choco list --localonly
```

### 3.7 导出已安装软件清单

```powershell
choco list --localonly > installed_packages.txt
```

### 3.8 通过软件清单安装

如果想在新电脑上安装相同的软件，可以使用：

```powershell
choco install $(Get-Content installed_packages.txt) -y
```

## 4. 进阶用法

### 4.1 创建自定义 Chocolatey 包

如果需要打包自己的软件，可以使用以下步骤：

```powershell
choco new mypackage
```

然后修改 `mypackage.nuspec` 文件，并运行：

```powershell
choco pack
choco push mypackage.nupkg -s https://push.chocolatey.org/
```

### 4.2 配置全局软件安装路径

默认情况下，Chocolatey 软件安装在 `C:\ProgramData\chocolatey`。
如果想更改默认安装路径，可以编辑环境变量 `ChocolateyInstall`。

### 4.3 使用 Chocolatey GUI

如果不喜欢命令行，可以安装 Chocolatey GUI：

```powershell
choco install chocolateygui -y
```

安装后，可以在 Windows 搜索栏输入 `Chocolatey GUI` 运行图形化界面。

## 5. 总结

Chocolatey 是一个强大的 Windows 包管理工具，可以大幅提升软件安装和管理的效率。掌握基本命令后，可以结合 PowerShell 自动化任务，提高 Windows 开发环境的可维护性。
