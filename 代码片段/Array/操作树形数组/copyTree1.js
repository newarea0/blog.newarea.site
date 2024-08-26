/**
 * @param {*} arr
 */
const copyTree2 = (arr) => {
  let tem = []
  arr.forEach(item => {
    let obj = {
      place: item.name,
    }
    if(item.children && item.children.length){
      obj.children = copyTree2(item.children)
    }
    tem.push(obj)
  })
  return tem
}

var input = [
  {
    name: 'china',
    children: [
      {
        name: 'hubei',
        children: [
          {
            name: 'huangshi',
          }
        ]
      }

    ]
  },
  {
    name: 'japan',
    children: [
      {
        name: 'tokyo',
      }
    ]
  }
]

console.log(copyTree2(input))
