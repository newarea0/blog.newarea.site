/**
 * 除法
 * javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果
 * @returns {number} arg1除以arg2的精确结果
 * @example
 * console.log(6.03 / 2.01)        // 3.0000000000000004
 * console.log(div(6.03, 2.01)) // 3
 */
function div(arg1, arg2) {
  let r1 = 0
  let r2 = 0
  try { r1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { r2 = arg2.toString().split('.')[1].length } catch (e) {}
  const m = Number(arg1.toString().replace('.', ''))
  const n = Number(arg2.toString().replace('.', ''))
  return (m / n) * 10 ** (r2 - r1)
}

console.log(6.03 / 2.01)        // 3.0000000000000004
console.log(div(6.03, 2.01)) // 3
