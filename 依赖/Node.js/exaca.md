[execa](https://github.com/sindresorhus/execa) 是更好的子进程管理工具（A better child_process）。本质上就是衍生一个 shell，传入的 command 字符串在该 shell 中直接处理。

```js
const execa = require('execa');
    execa("ls").then(result => {
    console.log(result);
    console.log(result.stdout);
});
```

![01](https://image.newarea.site/20230719/15.png)

### API

execa(file, [arguments], [options])：执行一个文件，集成了 child_process.execFile 和 child_process.spawn 的功能。返回一个增强版的 child_process，增加了 stdout 和 stderr 属性。

execa.sync(file, [arguments], [options])：同步执行一个文件，返回值同 child_process.spawnSync，如果出错会抛出异常。

execa.stdout(file, [arguments], [options])：如果只想要 stdout，可以用这个方法替换 execa

execa.stderr(file, [arguments], [options])：如果只想要 stderr，可以用这个方法替换 execa

execa.shell(command, [options])：通过 shell 执行 command。同 execa，但推荐使用 execa，因为它更快更安全。

execa.shellSync(file, [options])：同步通过 shell 执行 command，返回值同 child_process.spawnSync。

#### options

API 都接收 options 对象，支持以下属性：

cwd：string型，当前child_process的工作目录，默认为process.cwd()

env：object型，Environment 值，默认为process.env。不想要的话，将 extendEnv 设为 false

extendEnv：bool型，默认为true，见上

stdio：string数组，默认为pipe，stdio的配置项

stdin：string | number | Stream | undefined | null型，默认pipe。同stdio

stdout：string | number | Stream | undefined | null型，默认pipe。同stdio

stderr：string | number | Stream | undefined | null型，默认pipe。同stdio

uid：number型，进程的用户标识

gid：number型，进程的群组标识

argv0：string型，设置child_process的argv[0]。如果没有指定，默认为command或file

preferLocal：bool型，默认true。在寻找要执行的二进制文件时，首选本地安装的二进制文件，例如npm install foo, 可以execa('foo')

localDir：string型，默认process.cwd()。与preferLocal一起使用，首选查找本地安装的二进制文件的路径。

input：string | Buffer | stream.Readable型。将输入写入stdin。（当使用同步方法时，不能使用stream）

reject：bool型，默认true。设为false时，promise返回error，而不是rejecting

cleanup：bool型，默认true。跟踪生成的进程，并在父进程退出时杀死它。

detached：bool型，子进程独立于其父进程运行。具体的行为取决于平台。

killSignal：number型，默认SIGTERM。当生成的进程将被终止时，使用该信号

encoding：string | null型，默认utf8。指定stdout和stderr输出的字符编码。
如果设置为null，stdout和stderr将是一个Buffer，而不是string

timeout：number型，默认为0。设置后，如果子进程运行超时，父进程将发送由killSignal属性标识的信号（默认为SIGTERM）

buffer：bool型，默认ture。缓冲进程的输出，
当缓冲被禁用时，您必须消费stdout和stderr流的输出，因为在promise完成前，它们不会被resolved/rejected

maxBuffer：number型，默认10000000（10MB）。stdout或stderr上允许的最大字节数。

stripFinalNewline：bool型，默认true。删除输出最后的换行符。

shell：bool型，为true，则在shell中运行命令。在UNIX上使用/bin/sh，在Windows上使用cmd.exe。
可以指定不同的shell。shell应该理解UNIX上的-c开关或Windows上的/d /s /c开关。默认false

windowsVerbatimArguments：bool型，默认false。如果为真，则在Windows上不需要引用或转义参数。在其他平台上被忽略。
当shell选项为真时，它被自动设置为true。

本质上就是强化版的child_process，一些基本用法同node。例如：

```js
(async () => {
// 将 child_process 的 stdout 输出到主进程的 stdout
execa('echo', ['unicorns111']).stdout.pipe(process.stdout);    // unicorns111

    // Run a shell command
    const {stdout} = await execa.shell('echo unicorns222');
    console.log(stdout);                                           // unicorns222

    // Catching an error
    try {
        await execa.shell('exit 3');
    } catch (error) {
        console.log(error);
        // {
        //     message: 'Command failed: /bin/sh -c exit 3'
        //     killed: false,
        //     code: 3,
        //     signal: null,
        //     cmd: '/bin/sh -c exit 3',
        //     stdout: '',
        //     stderr: '',
        //     timedOut: false
        // }
    }
})();
```

例如实时打印出子进程的信息，并作为变量保存下来：

```js
const getStream = require('get-stream');

const stream = execa('echo', ['foo']).stdout;
stream.pipe(process.stdout);                // 实时输出 foo

getStream(stream).then(value => {
  console.log('child output:', value);    // child output: foo
});
```

[转载](https://zxljack.com/2019/02/execa/)
