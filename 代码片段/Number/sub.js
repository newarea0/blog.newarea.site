/**
 * 减法
 * javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果
 * @returns {string} arg1减去arg2的精确结果
 * @example
 * console.log(1.1 - 1.05)        // 0.050000000000000044
 * console.log(sub(1.1, 1.05)) // 0.05
 */
function sub(arg1, arg2) {
  let r1 = 0
  let r2 = 0
  try { r1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { r2 = arg2.toString().split('.')[1].length } catch (e) {}
  const m = 10 ** Math.max(r1, r2)
  const n = Math.max(r1, r2)
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

console.log(1.1 - 1.05)
console.log(sub(1.1, 1.05))
