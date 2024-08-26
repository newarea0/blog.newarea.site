/**
 * 把 RGB 颜色值转换成16进制颜色值
 * @param rgb rgb格式的颜色值
 * @example
 * rgbToHex('rgb(255, 180, 0)') // #FFB400
 */
function rgbToHex(rgb) {
  var arr = rgb.split(',')
  var hex = '#'
  arr.forEach(item => {
    const tem = parseInt(item.replace(/[^\d]/gi, '')).toString(16)
    hex += tem.length === 1 ? '0' + tem : tem
  })
  hex = hex.toUpperCase()
  return hex
}

console.log(rgbToHex('rgb(98, 177, 67)')) // #62B143
