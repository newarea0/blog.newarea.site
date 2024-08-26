/**
 * 上述方法的另外一种实现形式
 * @param {array} itemList 结构是对象数组
 */
const transfrom = (itemList) => {
  const itemListNew = itemList.map(item => {
    let tem = {
      test: false,
      structureName: item.structureName,
      structureId: item.structureId,
      children: []  //没有子代有两种形式，一种children: []，一种直接没有children这项。
    }
    if(item.children && item.children.length){
      tem.children = transfrom(item.children)
    }
    return tem
  })
  return itemListNew
}

var input = [
  {
    structureName: '首页',
    structureId: 1,
    children: [
      {
        structureName: '国内',
        structureId: 2,
      },
      {
        structureName: '国外',
        structureId: 3,
      }
    ]
  },
  {
    structureName: '体育',
    structureId: 4,
  }
]

console.log(transfrom(input))
