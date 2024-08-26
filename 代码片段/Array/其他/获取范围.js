/**
 * 获取数据范围
 * @param { Array } a 范围临界值组成的数组
 * @param { number } s 需要知道范围的数字
 * @returns 
 */
function getRange(a, s) {
  let n = -1
  for (let i = 0; i < a.length; i++) {
    if (a[i] > s) continue
    n = i
  }
  if (n === -1) return `(-∞, ${a[0]})`
  else if (n === (a.length - 1)) return `[${a[a.length - 1]}, +∞]`
  else return `[${a[n]}, ${a[n+1]})`
}

let input = [100, 300, 400]

console.log(getRange(input, 350)) // [300, 400)