# 忽略已被 Git 管理的文件

如果某个文件已经被 Git 管理，并且你将其添加到 .gitignore 文件中，但发现 .gitignore 不起作用，可能是由于 Git 已经跟踪（track）了这个文件的缘故。即使将文件添加到 .gitignore 中，Git 仍会继续跟踪已经被 track 的文件。

要让 .gitignore 文件生效并忽略已经被 Git 跟踪的文件，可以按照以下步骤操作：

1. 首先，确保将需要忽略的文件从 Git 中移除跟踪（untrack），但是不删除物理文件。可以使用以下命令：

    ```sh
    git rm --cached <file>
    ```

    这样可以将文件从 Git 跟踪列表中移除，但是保留在工作目录中。

2. 然后，提交这个修改：

    ```sh
    git commit -m "Remove <file> from tracking"
    ```

3. 最后，再次编辑 .gitignore 文件，添加需要忽略的文件，并提交 .gitignore 文件的修改。

这样一来，Git 将会遵循 .gitignore 文件中指定的规则，不再跟踪被忽略的文件。请记住，在对已经被 Git 跟踪的文件进行上述操作时，务必小心，以免意外删除重要文件。

通过以上步骤，你可以确保 .gitignore 文件中的规则生效，并成功忽略已经被 Git 跟踪的文件。
