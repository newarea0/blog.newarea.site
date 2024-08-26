/**
 * 获取一个随机十六进制颜色值
 */
const getRandomHexColor = () => {
  let rgb = []
  for (let i =0; i<3; i++){
    let color = Math.floor(Math.random()*256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color.toUpperCase())
  }
  return '#' + rgb.join('')
}

console.log(getRandomHexColor()) // #07E5FA
