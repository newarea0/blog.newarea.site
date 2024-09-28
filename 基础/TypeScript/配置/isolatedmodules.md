# isolatedModules

[你不知道的 「 import type 」](https://cloud.tencent.com/developer/article/1820475)

确保每个文件在不依赖其他导入下能被安全编译

---

## **什么是「 仅仅导入 / 导出声明 」**

为了能导入类型，TypeScript 重用了 JavaScript 的导入语法。

例如，在下面的这个例子中，我们确保 JavaScript 的值 doThing 以及 TypeScript 类型 Options 一同被导入:

```javascript
// ./foo.ts
interface Options {
  // ...
}

export function doThing(options: Options) {
  // ...
}

// ./bar.ts
import { doThing, Options } from './foo.js';

function doThingBetter(options: Options) {
  // do something twice as good
  doThing(options);
  doThing(options);
}
```

这是很方便的。

遗憾的是，这仅是因为一个被称之为「导入省略」的功能在起作用。

当 TypeScript 输出一个 JavaScript 文件时，TypeScript 会识别出 Options 仅仅是当作了一个类型来使用，它将会删除 Options。

```javascript
// ./foo.js
export function doThing(options: Options) {
  // ...
}

// ./bar.js
import { doThing } from './foo.js';

function doThingBetter(options: Options) {
  // do something twice as good
  doThing(options);
  doThing(options);
}
```

在通常情况下，这种行为都是比较好的，但是它会导致一些其他问题。

首先，在一些场景下，TypeScript 会混淆导出的究竟是一个类型还是一个值。

比如在下面的例子中， MyThing 究竟是一个值还是一个类型？

```javascript
import { MyThing } from './some-module.js';

export { MyThing };
```

如果单从这个文件来看，我们无从得知答案。

如果 Mything 仅仅是一个类型，Babel 和 TypeScript 使用的 transpileModule API 编译出的代码将无法正确工作，并且 TypeScript 的 isolatedModules 编译选项将会提示我们，这种写法将会抛出错误。

问题的关键在于，没有一种方式能识别它仅仅是个类型，以及是否应该删除它，因此「导入省略」并不够好。

同时，这也存在另外一个问题，TypeScript 导入省略将会去除只包含用于类型声明的导入语句。

对于含有副作用的模块，这造成了明显的不同行为。

于是，使用者将会不得不添加一条额外的声明语句，来确保有副作用。

```javascript
// This statement will get erased because of import elision.
import { SomeTypeFoo, SomeOtherTypeBar } from './module-with-side-effects';

// This statement always sticks around.
import './module-with-side-effects';
```

一个我们看到的具体例子是出现在 Angularjs（1.x）中， services 需要在全局在注册（它是一个副作用），但是导入的 services 仅仅用于类型声明中。

```javascript
// ./service.ts
export class Service {
  // ...
}
register('globalServiceId', Service);

// ./consumer.ts
import { Service } from './service.js';

inject('globalServiceId', function(service: Service) {
  // do stuff with Service
});
```

结果 ./service.js 中的代码不会被执行，导致在运行时会被中断。

在 TypeScript 3.8 版本中，我们添加了一个`仅仅导入/导出` 声明语法来作为解决方式。

```javascript
import type { SomeThing } from "./some-module.js";

export type { SomeThing };
```

import type 仅仅导入被用于类型注解或声明的声明语句，它总是会被完全删除，因此在运行时将不会留下任何代码。

与此相似，export type 仅仅提供一个用于类型的导出，在 TypeScript 输出文件中，它也将会被删除。

值得注意的是，类在运行时具有值，在设计时具有类型。它的使用与上下文有关。

当使用 import type 导入一个类时，你不能做类似于从它继承的操作。

```javascript
import type { Component } from "react";

interface ButtonProps {
    // ...
}

class Button extends Component<ButtonProps> {
    //               ~~~~~~~~~
    // error! 'Component' only refers to a type, but is being used as a value here.

    // ...
}
```

如果在之前你使用过 `Flow`，它们的语法是相似的。

一个不同的地方是我们添加了一个新的限制条件，来避免可能混淆的代码。

```javascript
// Is only 'Foo' a type? Or every declaration in the import?
// We just give an error because it's not clear.

import type Foo, { Bar, Baz } from "some-module";
//     ~~~~~~~~~~~~~~~~~~~~~~
// error! A type-only import can specify a default import or named bindings, but not both.
```

与 import type 相关联，我们提供来一个新的编译选项：`importsNotUsedAsValues`，通过它可以来控制没被使用的导入语句将会被如何处理，它的名字是暂定的，但是它提供来三个不同的选项。

- `remove`，这是现在的行为 —— 丢弃这些导入语句。这仍然是默认行为，没有破坏性的更改
- `preserve`，它将会保留所有的语句，即使是从来没有被使用。它可以保留副作用。
- `error`，它将会保留所有的导入（与 preserve 选项相同）语句，但是当一个值的导入仅仅用于类型时将会抛出错误。如果你想确保没有意外导入任何值，这会是有用的，但是对于副作用，你仍然需要添加额外的导入语法。

对于该特性的更多信息，参考该 PR。

## **Babel 和 TypeScript 是如何一起工作的**

### **TypeScript 做了两件事**

1. 将静态类型检查添加到 JavaScript 代码中。
2. 将 TS + JS 代码转换为各种JS版本。

Babel 也做第二件事。

Babel的方法（特别是transform-typescript插件时）是: `先删除类型，然后进行转换`。

这样，就即可以使用 Babel 的所有优点，同时仍然能够提供 ts 文件。

看个例子：

babel 编译前：

```javascript
// example.ts
import { Color } from "./types";
const changeColor = (color: Color) => {
  window.color = color;
};
```

babel 编译后：

```javascript
// example.js
const changeColor = (color) => {
  window.color = color;
};
```

在这里，babel 不能告诉 example.ts 那个 Color 实际上是一个类型。

因此，babel 也被迫错误地将此声明保留了转换后的代码中。

为什么会这样？

Babel在转译过程中一次明确地处理一个文件。

大概是因为 babel 团队并不想像 TypeScript 那样， 在相同的类型解析过程中进行构建，只是为了删除这些类型吧。

## **isolatedModules**

### **isolatedModules 是什么**

isolatedModules是TypeScript编译器选项，旨在充当保护措施。

tsc 做类型检查时，当监测到 `isolatedModules` 是开启的，就会报类型错误。

如果错误未解决，将影响独立处理文件的编译工具（babel）。

From TypeScript docs:

> Perform additional checks to ensure that separate compilation (such as with transpileModule or @babel/plugin-transform-typescript) would be safe.

From Babel docs:

> \--isolatedModules This is the default Babel behavior, and it can't be turned off because Babel doesn't support cross-file analysis.

换句话说，每个 ts 文件都必须能够独立进行编译。

该 `isolatedModules` 标志可防止我们引入模棱两可的 import。

下面看两个具体的例子看几个例子，了解 isolatedModules 标记的重要性。

### **1\. 混合导入， 混合导出**

在这里，我们采用在 `types.ts` 文件中定义的类型，然后从中重新导出它们。

打开 isolatedModules 时，此代码不会 通过类型检查。

```javascript
// types.ts
export type Playlist = {
  id: string;
  name: string;
  trackIds: string[];
};

export type Track = {
  id: string;
  name: string;
  artist: string;
  duration: number;
};

// lib-ambiguous-re-export.ts
export { Playlist, Track } from "./types";
export { CreatePlaylistRequestParams, createPlaylist } from "./api";
```

Babel 转换后：

```javascript
// dist/types.js
--empty--

// dist/lib-ambiguous-re-export.js
export { Playlist, Track } from "./types";
export { CreatePlaylistRequestParams, createPlaylist } from "./api";
```

报错：

![](https://image.newarea.site/20230713/11.png)

一些理解：

- Babel 从我们的types模块中删除了所有内容，它仅包含类型。
- Babel 没有对我们的 lib 模块进行任何转换。Playlist 并且 Track 应该由 Babel 移除。从Node 的角度来看，Node 做模块解析时，会发现 types.js 中引入的文件是`空的`，报错：文件不存在。
- 如截图所示，tsc 类型检查过程立即将这些模糊的重新导出报告为错误。

### 2. 显式类型导入，显式类型导出

这次，我们明确地将中的类型重新导出lib-import-export.ts。

打开 isolatedModules时，此代码将通过 tsc 类型检查。

编译前：

```javascript
// types.ts
export type Playlist = {
  id: string;
  name: string;
  trackIds: string[];
};

// lib-import-export.ts
import {
  Playlist as PlaylistType,
  Track as TrackType,
} from "./types";

import {
  CreatePlaylistRequestParams as CreatePlaylistRequestParamsType,
  createPlaylist
} from "./api";

export type Playlist = PlaylistType;
export type Track = TrackType;
export type CreatePlaylistRequestParams = CreatePlaylistRequestParamsType;
export { createPlaylist };
```

编译后：

```javascript
// dist/types.js
--empty-- TODO or does babel remove it all together?

// lib-import-export.js
import { createPlaylist } from "./api";
export { createPlaylist };
```

此时：

- Babel仍输出一个空 types.js 文件。但这没关系，因为我们编译的lib-import-export.js器没再引用它。

## **TypeScript 3.8**

如先前介绍， TypeScript 3.8 引入了新的语法 -- 「 仅仅导入 / 导出声明 」。

该语法在使用时为类型解析过程增加了确定性。

现在，编译器（无论是tsc，babel还是其他）都将能够查看单个文件，并取消导入或导出（如果它是TypeScript类型）。

`import type ... from`让编译器知道您要导入的内容绝对是一种类型。

`export type ... from`一样， 仅用作导出。

```javascript

// src/lib-type-re-export.ts
export type { Track, Playlist } from "./types";
export type { CreatePlaylistRequestParams } from "./api";
export { createPlaylist } from "./api";

// 会被编译为：

// dist/lib-type-re-export.js
export { createPlaylist } from "./api";
```
