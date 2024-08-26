/**
 * 乘法
 * javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果
 * @returns {number} arg1乘以arg2的精确结果
 * @example
 * console.log(0.082 * 100)        // 8.200000000000001
 * console.log(mul(0.082, 100)) // 8.2
 */
function mul(arg1, arg2) {
  let r = 0
  const a1 = arg1.toString()
  const a2 = arg2.toString()
  try { r += a1.split('.')[1].length } catch (e) {}
  try { r += a2.split('.')[1].length } catch (e) {}
  return Number(a1.replace('.', '')) * Number(a2.replace('.', '')) / 10 ** r
}

console.log(0.082 * 100)        // 8.200000000000001
console.log(mul(0.082, 100)) // 8.2
