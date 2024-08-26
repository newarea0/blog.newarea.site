# stash

用于临时保存工作目录的更改，以便稍后可以恢复这些更改而不影响当前的工作状态。可以使用 git stash 将当前的工作目录状态保存起来，让你的工作目录变成干净的状态。

![](https://image.newarea.site/2024-07-08-19-56-50.png)

## Stash

【Stash】 将当前的改动（包括暂存、未暂存）保存到一个新的临时保存中。

【Stash (Include Untracked)】 将当前的改动（包括暂存、未暂存、未跟踪的）保存到一个新的临时保存中。

【Stash Staged】仅临时保存暂存的改动。

## Apply

【Apply Latest Stash】将最近保存的 stash 应用到当前工作目录中，但不会从 stash 列表中删除该条目。

【Apply Stash...】VSCode 会打开一个对话框，询问你要应用哪一个 stash。

## Pop

【Pop latest Stash】将最近保存的 stash 应用到当前工作目录中，并从 stash 列表中删除该条目。
【Pop Stash...】VSCode 会打开一个对话框，询问你要应用哪一个 stash，并从 stash 列表中删除该条目。

## Drop

【Drop Stash...】VSCode 会打开一个对话框，询问你要删除哪一个 stash。
【Drop All Stashes...】VSCode 会打开一个对话框，询问你要删除全部 stash。

## View Shash...

查看某个 stash 具有哪些改动。
