# UV

[uv](https://docs.astral.sh/uv/) 是由 Astral（Ruff 团队）用 Rust 编写的 **Python 包与项目管理器**。它把过去需要多个工具才能完成的工作收敛到一条 CLI 里，速度通常比 `pip` 快 10–100 倍。

## 是什么、能替代什么

uv 试图在一个工具里覆盖常见 Python 工作流：

| 传统工具 | uv 对应能力 |
| :---- | :---- |
| `pip` / `pip-tools` | `uv pip`、`uv add`、`uv sync` |
| `venv` / `virtualenv` | `uv venv` |
| `pyenv` | `uv python install` / `pin` |
| `pipx` | `uvx` / `uv tool` |
| `poetry`（部分场景） | `uv init`、`uv add`、`uv lock` |

核心特点：

- **快**：依赖解析与安装由 Rust 实现，冷启动和大量依赖场景优势明显。
- **自带 Python**：无需系统预装 Python，即可 `uv python install` 下载并管理版本。
- **统一锁文件**：项目模式生成 `uv.lock`，可复现安装。
- **跨平台**：支持 macOS、Linux、Windows。

## 安装

macOS / Linux：

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Windows（PowerShell）：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

安装后重启终端，验证：

```shell
uv --version
```

升级 uv

```shell
uv self update
```

## 管理 Python 版本

uv 可以像 `pyenv` 一样安装、切换 Python，且 **多数命令会在需要时自动下载** 对应版本，不必每次都先 `install`。

### 安装 Python

```shell
# 安装最新版本
uv python install

# 安装指定版本
uv python install 3.12

# 一次安装多个版本
uv python install 3.10 3.11 3.12

# 安装精确补丁版本
uv python install 3.12.3
```

安装后的可执行文件一般在 `~/.local/bin`（如 `python3.12`）。若希望同时提供 `python` / `python3` 命令：

```shell
uv python install 3.12 --default
```

### 查看与查找

```shell
# 已安装 / 可安装的版本
uv python list

# 查找满足条件的解释器
uv python find 3.12
```

### 为项目固定版本

在项目根目录执行，会写入 `.python-version`：

```shell
uv python pin 3.12
```

之后在该目录下的 `uv venv`、`uv run` 等会优先使用该版本。

### 卸载

```shell
uv python uninstall 3.10
```

## 虚拟环境

### 创建

```shell
# 默认在当前目录创建 .venv
uv venv

# 指定目录名
uv venv myenv

# 指定 Python 版本（不存在时会自动下载）
uv venv --python 3.12
uv venv --python 3.11.6
```

### 激活与退出

macOS / Linux：

```shell
source .venv/bin/activate
```

Windows（PowerShell）：

```powershell
.venv\Scripts\Activate.ps1
```

Windows（cmd）：

```cmd
.venv\Scripts\activate.bat
```

退出虚拟环境：

```shell
deactivate
```

### 不激活也能用

uv 的项目命令和 `uv run` 会自动识别项目下的 `.venv`，**很多时候不必手动 `activate`**。

## 项目管理（pyproject.toml）

适合长期维护的应用或库，类似 Poetry 的现代工作流。

### 初始化项目

```shell
# 新建目录并初始化
uv init myapp
cd myapp

# 或在当前目录初始化
uv init
```

会生成 `pyproject.toml`，若目录下尚无 `.venv`，后续 `uv sync` / `uv run` 通常会帮你建好环境。

### 依赖管理

```shell
# 添加运行时依赖（写入 pyproject.toml 并安装）
uv add requests

# 开发依赖
uv add pytest --dev

# 移除依赖
uv remove requests

# 按 lock 文件同步环境（CI / 新机器常用）
uv sync

# 仅更新 lock，不安装
uv lock

# 查看依赖树
uv tree
```

### 运行命令

```shell
# 在项目环境中执行（自动用 .venv）
uv run python main.py
uv run pytest

# 若 pyproject.toml 里配置了 scripts，也可直接
uv run myapp
```

### 构建与发布

```shell
uv build
uv publish
```

## 单文件脚本

适合临时脚本、小工具，依赖可写在脚本内（PEP 723）或旁边。

```shell
# 直接运行（按需解析环境）
uv run example.py

# 为脚本添加依赖
uv add --script example.py httpx

# 从脚本移除依赖
uv remove --script example.py httpx
```

脚本内联依赖示例：

```python
# /// script
# requires-python = ">=3.11"
# dependencies = ["httpx"]
# ///

import httpx

print(httpx.get("https://example.com").status_code)
```

## 工具命令（类似 pipx）

临时运行工具，不污染全局环境：

```shell
# uvx 是 uv tool run 的简写
uvx ruff check .
uvx black --check .

# 用户级安装工具
uv tool install ruff
uv tool list
uv tool uninstall ruff
```

## pip 兼容接口

沿用 `requirements.txt`、已有 pip 工作流时可用。

```shell
# 创建环境
uv venv

# 安装（需已激活环境，或 uv 能发现 .venv）
uv pip install requests
uv pip install -r requirements.txt

# 查看 / 导出
uv pip list
uv pip freeze
uv pip tree

# 卸载
uv pip uninstall requests

# 从 requirements 编译锁文件（类似 pip-compile）
uv pip compile requirements.in -o requirements.txt

# 按锁文件同步环境
uv pip sync requirements.txt
```

注意：`uv pip` 与原生 `pip` 在边缘行为上可能略有差异，复杂场景可参考官方 [pip 兼容性说明](https://docs.astral.sh/uv/pip/compatibility/)。

## 高频场景速查

| 场景 | 命令 |
| :---- | :---- |
| 新同事克隆项目后装依赖 | `uv sync` |
| 快速起一个 Python 3.12 环境 | `uv venv --python 3.12` |
| 给项目加依赖并写进配置 | `uv add <pkg>` |
| 跑测试但不想手动 activate | `uv run pytest` |
| 临时用一次格式化工具 | `uvx ruff format .` |
| 机器上没有 Python，先装再建环境 | `uv python install 3.12` → `uv venv` |
| 锁定团队统一 Python 版本 | `uv python pin 3.12` |
| 从旧项目 requirements 迁移 | `uv pip install -r requirements.txt` 或逐步改为 `uv add` |
| 清缓存腾磁盘 | `uv cache prune` / `uv cache clean` |

## 常用命令对照

| 你想做的事 | uv 命令 |
| :---- | :---- |
| 安装 / 升级 uv | 见上文安装节；`uv self update` |
| 安装 Python | `uv python install <version>` |
| 固定项目 Python | `uv python pin <version>` |
| 创建虚拟环境 | `uv venv [--python x.y]` |
| 初始化项目 | `uv init` |
| 加依赖 | `uv add <pkg>` |
| 删依赖 | `uv remove <pkg>` |
| 同步依赖 | `uv sync` |
| 运行脚本 / 命令 | `uv run <cmd>` |
| 临时跑 CLI 工具 | `uvx <tool>` |
| pip 式安装 | `uv pip install <pkg>` |

## 与 pip + venv 的典型对比

**传统方式：**

```shell
python -m venv .venv
source .venv/bin/activate   # Windows 另见上文
pip install -r requirements.txt
python main.py
```

**uv 方式（项目已有 pyproject.toml）：**

```shell
uv sync
uv run python main.py
```

**uv 方式（只有 requirements.txt）：**

```shell
uv venv
uv pip install -r requirements.txt
uv run python main.py
```

## 参考

- 官方文档：[https://docs.astral.sh/uv/](https://docs.astral.sh/uv/)
- 功能概览：[Features](https://docs.astral.sh/uv/getting-started/features/)
- Python 版本：[Python versions](https://docs.astral.sh/uv/concepts/python-versions/)
