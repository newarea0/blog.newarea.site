/**
 * 将二维数组转换为对象数组，对象的属性名来自二维数组的第一项，值来自二维数组的第二项
 * @param arr 一个二维数组
 * @returns {*} 一个对象数组
 * @example
 * const arr = [
 *   ['a', 'b'],
 *   [1, 2],
 *   [3, 4],
 *   [5, 6],
 * ]
 * return
 * [
 *   { a: 1, b: 2 },
 *   { a: 3, b: 4 },
 *   { a: 5, b: 6 }
 * ]
 */
function generateObjectArray(arr) {
  const propNames = arr.slice(0, 1)[0] // 注意这里要加上索引0
  const vals = arr.slice(1)
  return vals.reduce((acc, item, index) => {
    const temObj = {}
    item.forEach((itm, idx) => {
      temObj[propNames[idx]] = itm
    })
    acc.push(temObj)
    return acc
  }, [])
}

const input = [
  ['a', 'b'],
  [1, 2],
  [3, 4],
  [5, 6],
]

console.log(generateObjectArray(input))

const output = [
  { a: 1, b: 2 },
  { a: 3, b: 4 },
  { a: 5, b: 6 }
]
