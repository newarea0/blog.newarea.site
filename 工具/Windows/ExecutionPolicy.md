# ExecutionPolicy

![](https://image.newarea.site/2025-05-21_00-43-52.png)

要解决这个问题，你可以尝试修改PowerShell的执行策略。以下是具体的步骤：

1. 以管理员身份运行PowerShell：

    在Windows搜索栏中输入“PowerShell”，右键点击“Windows PowerShell”，选择“以管理员身份运行”。

2. 查看当前执行策略（可选）：

    在PowerShell窗口中，输入以下命令并按回车：
    ```
    Get-ExecutionPolicy
    ```

3. 修改执行策略：

    输入以下命令并按回车：
    ```
    Set-ExecutionPolicy RemoteSigned
    ```
    这个命令会将执行策略设置为允许运行本地脚本和远程签名的脚本，但阻止未签名的本地脚本。

4. 确认更改：

    系统可能会提示你确认更改执行策略。如果看到提示，请输入Y并按回车键确认。

5. 重新尝试运行npm命令：

    在修改执行策略后，重新尝试运行你之前失败的npm命令。
