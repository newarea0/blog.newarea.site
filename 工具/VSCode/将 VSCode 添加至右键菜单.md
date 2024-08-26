# 将 VSCode 添加至右键菜单

在安装 VSCode 时如果忘记勾选，右键是不会显示 VSCode 快捷键的。此时如果想要右键出现 VSCode 快捷键，需要手动修改注册表。

通过`.reg`文件可以快速修改注册表。在桌面新建一个`.reg`文件，文件名随便，如`vsCodeOpenFolder.reg`，编辑内容如下：

```shell
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
@="\"D:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%1\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="\"D:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%1\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
@="\"D:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe\" \"%V\""
```

注意其中`D:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe`因人而异，为vs code安装目录下的Code.exe文件路径。编辑完后保存，然后双击`vsCodeOpenFolder.reg`文件，一路确定即可。

仔细观察注册表文件可以发现其由类似的3部分组成

- `HKEY_CLASSES_ROOT\*\shell\VSCode` 设置在文本文件上的右键菜单
- `HKEY_CLASSES_ROOT\Directory\shell\VSCode` 设置在文件夹上的右键菜单
- `HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode` 设置在桌面空白区的右键菜单

同理如果要将 WebStorm 添加到右键菜单：

```shell
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\WebStrom]
@="Edit with WebStorm"
"Icon"="C:\\Program Files\\JetBrains\\WebStorm 2021.1.1\\bin\\webstorm64.exe"

[HKEY_CLASSES_ROOT\*\shell\WebStrom\command]
@="\"C:\\Program Files\\JetBrains\\WebStorm 2021.1.1\\bin\\webstorm64.exe\" \"%1\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\shell\WebStrom]
@="Edit with WebStorm"
"Icon"="C:\\Program Files\\JetBrains\\WebStorm 2021.1.1\\bin\\webstorm64.exe"

[HKEY_CLASSES_ROOT\Directory\shell\WebStrom\command]
@="\"C:\\Program Files\\JetBrains\\WebStorm 2021.1.1\\bin\\webstorm64.exe\" \"%1\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\WebStrom]
@="Edit with WebStorm"
"Icon"="C:\\Program Files\\JetBrains\\WebStorm 2021.1.1\\bin\\webstorm64.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\WebStrom\command]
@="\"C:\\Program Files\\JetBrains\\WebStorm 2021.1.1\\bin\\webstorm64.exe\" \"%V\""
```
