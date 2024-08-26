# npm link

在发布 npm 包前最好进行本地测试

`npm link` 将需要被测试的包软连接到全局 nmp 中

**全局 nmp 的位置可以通过 `npm config ls -l` 来查看**

![05](https://image.newarea.site/20230719/05.png)

或者通过 `npm root -g` 来查看

## 1 将包 npm-test-zbx 软连接到全局 npm 中

```sh
cd npm-test-zbx
npm link
```

![02](https://image.newarea.site/20230719/02.png)

![03](https://image.newarea.site/20230719/03.png)

## 2 在项目 test 中使用 npm-test-zbx

```sh
cd test
npm link npm-test-zbx
```

![04](https://image.newarea.site/20230719/04.png)

## 3 从项目 test 中卸载 npm-test-zbx

```sh
cd test
npm unlink npm-test-zbx
```

![06](https://image.newarea.site/20230719/06.png)

## 4 将包 npm-test-zbx 从全局 npm 中卸载

```sh
cd npm-test-zbx
npm unlink
```