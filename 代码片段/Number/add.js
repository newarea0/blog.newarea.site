/**
 * 加法
 * javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果
 * @returns {number} arg1加上arg2的精确结果
 * @example
 * console.log(1.1 + 1.05)        // 2.1500000000000004
 * console.log(add(1.1, 1.05)) // 2.15
 */
function add(arg1, arg2) {
  let r1 = 0
  let r2 = 0
  try { r1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { r2 = arg2.toString().split('.')[1].length } catch (e) {}
  const m = 10 ** Math.max(r1, r2)
  return (arg1 * m + arg2 * m) / m
}

console.log(1.1 + 1.05) // 2.1500000000000004
console.log(add(1.1, 1.05)) // 2.15
