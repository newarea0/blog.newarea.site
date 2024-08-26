/**
 * 16进制颜色值转换成把 RGB(A) 颜色值
 * @param hex
 * @returns
 * hex2Rgb('#123')      // rgba(17,34,51,0.2)
 * hex2Rgb('#123', 0.2) // rgb(17,34,51)
 */
function hex2Rgb(hex, alpha) {
  var rgb = []
  if (/^#[0-9A-F]{3}$/i.test(hex)) { //判断传入是否为三位十六进制数
    let sixHex = '#'
    hex.replace(/[0-9A-F]/ig, function(kw) {
      sixHex += kw + kw
    })
    hex = sixHex
  }

  hex.replace(/[0-9A-F]{2}/ig, function(kw) {
    rgb.push(eval('0x' + kw)) //十六进制转化为十进制并存如数组
  })

  if (alpha === undefined) {
    return `rgb(${rgb.join(',')})`
  } else {
    rgb.push(alpha)
    return `rgba(${rgb.join(',')})`
  }
}

console.log(hex2Rgb('#123')) // rgb(17,34,51)
console.log(hex2Rgb('#123', 0.2)) // rgba(17,34,51,0.2)
