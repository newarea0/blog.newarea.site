# rules

[官网](https://eslint.org/docs/user-guide/configuring/rules)

默认情况下 ESlint 没有启用任何规则，只用启用了规则，才有提示信息。

开启规则和发生错误时报告的等级
规则的错误等级有三种：

- 0或'off'：关闭规则。
- 1或'warn'：打开规则，并且作为一个警告（并不会导致检查不通过）。
- 2或'error'：打开规则，并且作为一个错误 (退出码为1，检查不通过)。