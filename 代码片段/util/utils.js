/**
 * 删除字符串str的首尾空格
 * @method trim
 * @param { String } str 需要删除首尾空格的字符串
 * @return { String } 删除了首尾的空格后的字符串
 * @example
 * var str = " UEdtior ";
 * str.length // 9
 * trim(str).length // 7
 */
export const trim = (str) => {
  return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '')
}

/**
 * 参数过滤函数,除去obj中参数值为null的项（如果参数值是对象或者数组，会继续除去其中的null项）
 * @param {object} obj
 */
export const filterNull = (obj) => {
  for (let i in obj) {
    if (obj[i] === null) {
      delete obj[i]
    }
    if (toType(obj[i]) === 'string') {
      obj[i] = obj[i].trim()
    } else if (toType(obj[i]) === 'object') {
      obj[i] = this.filterNull(obj[i])
    } else if (toType(obj[i]) === 'array') {
      obj[i] = this.filterNull(obj[i])
    }
  }
  return o
}

/**
 * js中生成唯一id的方法
 */
export const genId = () => {
  return Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36)
}

/**
* RFC4122 version 4 compliant unique id creator.
*
* Added by by https://github.com/tufanbarisyildirim/
*
* @returns {String}
*/
export const newGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r =  Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 阶乘
 * @param {number} n
 * @example
 * factorial(4) // 24
 */
export const factorial = (n) => {
  return n < 2 ? n : n * this.factorial(n-1) // 递归
}

/** --------- 4 ---------
 * 检测类型
 * @param {*} obj
 */
 export const toType = (obj) => {
  return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}