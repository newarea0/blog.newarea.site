/**
 * @description 千分位表示法（每三位加逗号），也可以直接使用数字的toLocaleString来实现该功能
 * @param {string} num 要进行格式化的数字
 * @example
 * toThousands(12345) // 12,345
 */
export const toThousands = (num) => {
  num = num.toString()
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    // slice 返回指定索引之间的字符串（包头不包尾），num.length - 1 表示最后一个字符的索引，num.length - 1 表示倒数第3个字符的索引
    num = num.slice(0, num.length - 3)
  }
  if (num) result = num + result
  return result
}

/**
 * 上述功能的另一种写法
 * @param {*} num
 * @returns
 */
export const toThousands1 = (num) => {
  num = num + ''
  const i = num.length % 3
  return (i ? num.slice(0, i) + ',' : '') +
    num.slice(i).replace(/(\d{3})(?=\d)/g, '$1' + ',')
}

/**
 * @description 格式化货币，保留两位小时、整数部分千分位表示法（每三位加逗号）、添加货币标志，也可以直接使用数字的toLocaleString来实现该功能
 * var num = 123456789
 * //格式化千分位输出
 * num.toLocaleString()
 * //格式化为千分位带$符号输出
 * num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
 * //格式化为带￥符号输出
 * num.toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })
 * @param number {number|string} 要格式化的数字或字符串
 * @param places {number} 保留的小位数，默认保留两位
 * @param symbol {string} 表示货币的标志，默认￥
 * @returns {string}
 * @example
 * formatMoney(123)       // ¥123.00
 * formatMoney(1234.456)  // ¥1,234.46
 * formatMoney(12345.32)  // ¥12,345.32
 * formatMoney(-123456)   // ¥-123,456.00
 */
export const formatMoney = (number, places = 2, symbol = '¥') => {
  // negative表示如果钱是负数有就显示'-'，如果不是负数就不显示负号
  const negative = number < 0 ? '-' : ''
  number = Math.abs(+number || 0).toFixed(places)
  // 获取的整数部分
  const i = parseInt(number, 10) + ''
  const j = i.length > 3 ? i.length % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + ',' : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') +
    (places ? '.' + Math.abs(number - i).toFixed(places).slice(2) : '')
}

/**
 * @description 将大数字转为以万、亿、万亿为单位
 * @param num 待转换数字
 * @returns {*}
 * @example
 * transform(1233)           // 1233
 * transform(12456)          // 1.25万
 * transform(1234532)        // 123.45万
 * transform(1234562)        // 123.46万
 * transform(12345324)       // 1234.53万
 * transform(1232123456)     // 12.32亿
 * transform(12321234566)    // 123.21亿
 */
export const transform = (num) => {
  var param = {}
  var k = 10000
  var size = ['', '万', '亿', '万亿']
  var i
  if (num < k) {
    param.value = num
    param.unit = ''
  } else {
    i = Math.floor(Math.log(num) / Math.log(k))
    param.value = ((num / Math.pow(k, i))).toFixed(2)
    param.unit = size[i]
  }
  return param.value + param.unit
}

/**
 * 格式化文件大小，根据文件大小选择合适的单位，方便易读
 * 返回结果中数字和单位间留有一个空格，数字去掉了小数点后无用的0
 * @param {number | string} size 需要格式化的文件大小
 * @returns {string}
 * @example
 * formatFileSize(200) // 200 B
 * formatFileSize(1024) // 1 KB
 * formatFileSize(2000) // 1.95 KB
 */
export const formatFileSize = (size) => {
  let value = Number(size)
  if (size && !isNaN(value)) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
    let index = 0
    while (value >= 1024 && index < units.length - 1) {
      value = value / 1024
      index++
    }
    return `${parseFloat(value.toFixed(2))} ${units[index]}`
  }
  return '-'
}
