/**
 * 获取一个随机 RGB 颜色值
 */
function getRandomRgbColor() {
  const r = Math.floor( Math.random() * 256 )
  const g = Math.floor( Math.random() * 256 )
  const b = Math.floor( Math.random() * 256 )
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

console.log(getRandomRgbColor()) // rgb(98, 177, 67)
