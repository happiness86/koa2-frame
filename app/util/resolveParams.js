const { Op } = require('sequelize')
/**
 * @description 处理排序参数
 * @param {Array<{field: string,order: 'asc' | 'desc'}>} orders 
 */
const resolveSort = (orders) => {
  let sortArr = []
  if (orders) {
    orders.forEach(item => {
      sortArr.push([item.field, item.order])
    })
  }
  return sortArr
}

/**
 * @description 处理查询
 * @param {{}} orders 
 */
const resolveQueryEntity = (queryEntity) => {
  let queryArr = []
  for (const column in queryEntity) {
    const value = queryEntity[column]
    if (!value) {
      continue
    }
    if (!Number.isNaN(+value)) {
      queryArr.push({ [column]: +value })
    } else {
      queryArr.push({ [column]: { [Op.like]: `%${value}%` } })
    }
  }
  return queryArr
}

module.exports = {
  resolveSort,
  resolveQueryEntity
}