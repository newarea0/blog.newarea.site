# requestAnimationFrame

`requestAnimationFrame` 是浏览器提供的一个用于高效执行动画更新的方法。它告诉浏览器——"在下一次重绘（render）前执行某个函数"，这个机制比传统的 `setTimeout` / `setInterval` 更适合做动画，因为它具有以下几个优势：

---

### 📌 基本用法

```javascript
function update() {
  // 更新动画逻辑
  // ...

  requestAnimationFrame(update) // 递归调用下一帧
}

requestAnimationFrame(update)
```

### ✅ 优点

1. **更平滑的动画**

   * `requestAnimationFrame` 会在浏览器“刷新率”合适的时机执行（通常是每秒 60 次，即每 16.67ms），能提供平滑的视觉效果。

2. **节省资源**

   * 当标签页不在激活状态时，浏览器会自动暂停 `requestAnimationFrame`，节省 CPU 和电池资源。
   * 而 `setTimeout` 则会继续执行，占用资源。

3. **与浏览器同步**

   * 它的回调会在浏览器下一帧绘制前调用，避免不必要的中间帧，提高性能。

### 🔄 与 `setTimeout` 的对比

| 特性       | `setTimeout` | `requestAnimationFrame` |
| -------- | ------------ | ----------------------- |
| 时间控制     | 固定间隔         | 根据屏幕刷新率自动调整             |
| 节能       | 否            | 是（页面不活跃时暂停）             |
| 是否掉帧     | 容易掉帧         | 更少掉帧                    |
| 推荐用法（动画） | ❌            | ✅                       |

### 📂 应用场景

* 页面中的 DOM 动画（比如滚动、淡入淡出、移动等）
* 游戏循环
* canvas 渲染
* 手动执行过渡或帧率控制

### 🧠 一个简单的例子：移动小方块

```html
<canvas id="myCanvas" width="400" height="100"></canvas>
<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  let x = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
    ctx.fillStyle = "blue";
    ctx.fillRect(x, 20, 50, 50); // 画一个方块
    x += 2; // 每次移动2个像素
    if (x < canvas.width) {
      requestAnimationFrame(draw); // 继续下一帧
    }
  }

  draw(); // 启动动画
</script>
```

### 🔁 取消动画

如果需要取消一个动画：

```javascript
const id = requestAnimationFrame(draw)
cancelAnimationFrame(id)
```
