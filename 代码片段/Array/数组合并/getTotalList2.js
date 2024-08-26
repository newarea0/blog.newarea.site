/**
 * @param {array} array
 * @example console.log(getTotalList2(arr13))
 */
const getTotalList2 = (array) => {
  let obj = {}
  let res = array.reduce((result, item) => {
    if (!obj[item.date]) {
      const o = {
        date: item.date,
        list: [item]
      }
      result.push(o)
      obj[item.date] = true
    } else {
      result.forEach(rItem => {
        if (rItem.date === item.date) rItem.list.push(item)
      })
    }
    return result
  }, [])
  return res
}

var input = [
  { date: '2019-05-03', activity: '篮球' },
  { date: '2019-03-01', activity: '音乐' },
  { date: '2019-04-01', activity: '电影' },
  { date: '2019-04-20', activity: '书法' },
  { date: '2019-05-03', activity: '羽毛球' },
  { date: '2019-05-03', activity: '乒乓球' },
]

console.log(getTotalList2(input))

const output = [
  {
    'date': '2019-05-03',
    'list': [
      { 'date': '2019-05-03', 'activity': '篮球' },
      { 'date': '2019-05-03', 'activity': '羽毛球' },
      { 'date': '2019-05-03', 'activity': '乒乓球' }
    ]
  },
  {
    'date': '2019-03-01',
    'list': [
      { 'date': '2019-03-01', 'activity': '音乐' }
    ]
  },
  {
    'date': '2019-04-01',
    'list': [
      { 'date': '2019-04-01', 'activity': '电影' }
    ]
  },
  {
    'date': '2019-04-20',
    'list': [
      { 'date': '2019-04-20', 'activity': '书法' }
    ]
  }
]
