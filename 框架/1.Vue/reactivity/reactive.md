# reactive

`function reactive<T extends object>(target: T): UnwrapNestedRefs<T>`

通过 `toRaw` “解包”，类似 `unref`。

## 1 递归 reactive
reactive **递归** 遍历 target 的属性，当属性值为一个对象或数组时，会将该属性值也转换为 reactive


```js
import { reactive, isReactive } from 'vue'

const info = reactive({
  name: 'Jack',
  father: {
    name: 'Tom'
  },
  friends: ['Marry', 'Bob']
})

Object.keys(obj).forEach(item => {
  console.log(item, isReactive(obj[item]), obj[item])
})

// 打印：
// name false Jack
// father true Proxy {name: 'Tom'}
// friends true Proxy {0: 'Marry', 1: 'Bob'}
```

若要避免深层响应式转换，只想保留对这个对象顶层次访问的响应性，请使用 shallowReactive() 作替代。（注意区别单词 shallow 和 shadow，前者表示浅的，后者表示阴影）

## 2 递归解包

reactive 也将递归解包所有 ref 的属性

```js
import { ref, reactive } from 'vue'

const city = ref('sz')

const info = reactive({
  // 写法1
  city: city.value,
  // 写法2
  //city: city
})
console.log(info.city)
```

上面两种写法是有区别的，对于写法1，`city` 和 `info.city` 没有连写，任何一个改变，不影响另外一个，写法2则相反，`city` 和 `info.city` 有联系，改变一个，另外一个也改变。

## 3 简版手写

```js
// 定义一个reactive函数，传入一个目标对象
function reactive(target) {
  // 判断当前的目标对象是不是object类型(对象/数组)
  if (target && typeof target === 'object') {
    // 对数组或者是对象中所有的数据进行reactive的递归处理
    // 先判断当前的数据是不是数组
    if (Array.isArray(target)) {
      // 数组的数据要进行遍历操作0
      target.forEach((item, index) => {
        // 如果数组中还有数组
        // 使用递归
        target[index] = reactive(item);
      });
    } else {
      // 再判断当前的数据是不是对象
      // 对象的数据也要进行遍历的操作
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key]);
      });
    }
    return new Proxy(target, reactiveHandler);
  }
  // 如果传入的数据是基本类型的数据，那么就直接返回
  return target;
}

// 定义一个reactiveHandler处理对象
const reactiveHandler = {
  // 获取属性值
  get(target, prop) {
    if (prop === '_is_reactive') return true;
    const result = Reflect.get(target, prop);
    console.log('拦截了读取数据', prop, result);
    return result;
  },
  // 修改属性值或者是添加属性
  set(target, prop, value) {
    const result = Reflect.set(target, prop, value);
    console.log('拦截了修改数据或者是添加属性', prop, value);
    return result;
  },
  // 删除某个属性
  deleteProperty(target, prop) {
    const result = Reflect.deleteProperty(target, prop);
    console.log('拦截了删除数据', prop);
    return result;
  }
}
```
