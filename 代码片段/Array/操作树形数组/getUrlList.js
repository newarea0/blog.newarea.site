/**
 * 获取树状结构数据中的某一个属性值
 * @param {array} targetArr
 */
const getUrlList = (targetArr) => {
  let arr = []
  targetArr.forEach(item => {
      item.url && arr.push(item.url) // 此例子中要符合url为真值的条件
      if (item.childMenus && item.childMenus.length) {
        arr = arr.concat(getUrlList(item.childMenus))
      }
  })
  return arr
}

let input = [
  {
    url: '',
    childMenus: [
      {
        url: '',
        childMenus: [
          {
            url: '/111',
            childMenus: []
          },
          {
            url: '/112',
            childMenus: []
          },
          {
            url: '/113',
            childMenus: []
          },
          {
            url: '/114',
            childMenus: []
          }
        ]
      },
      {
        url: '',
        childMenus: [
          {
            url: '/121',
            childMenus: []
          },
          {
            url: '/122',
            childMenus: []
          },
          {
            url: '/123',
            childMenus: []
          },
          {
            url: '/124',
            childMenus: []
          }
        ]
      }
    ]
  },
  {
    url: '',
    childMenus: [
      {
        url: '',
        childMenus: [
          {
            url: '/211',
            childMenus: []
          },
          {
            url: '/212',
            childMenus: []
          },
          {
            url: '/213',
            childMenus: []
          },
          {
            url: '/214',
            childMenus: []
          }
        ]
      },
      {
        url: '',
        childMenus: [
          {
            url: '/221',
            childMenus: []
          },
          {
            url: '/222',
            childMenus: []
          },
          {
            url: '/223',
            childMenus: []
          },
          {
            url: '/224',
            childMenus: []
          }
        ]
      }
    ]
  }
]

console.log(getUrlList(input))

const output = [
  "/111",
  "/112",
  "/113",
  "/114",
  "/121",
  "/122",
  "/123",
  "/124",
  "/211",
  "/212",
  "/213",
  "/214",
  "/221",
  "/222",
  "/223",
  "/224"
]
