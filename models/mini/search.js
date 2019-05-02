/**
 *
 * @desc 小程序搜索模块 model
 * @author PDK
 *
 * Created at     : 2019-04-30
 * Last modified  : 2019-04-30
 */
const mysql = require('../../config/connect')

/**
 * @desc 拼接sql语句
 */
const processSpliceSQL = function (arr) {
  let str = `(`
  for (let i = 0; i < arr.length; i++) {
    if (i !== arr.length - 1) {
      str = str + arr[i].id + ','
    } else {
      str = str + arr[i].id + ')'
    }
  }
  return str
}

/**
 * @desc 获取飞机航班列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
const retrievePlaneLine = async payload => {
  const { fromCity, toCity, startTime } = payload
  const prefixList = await mysql.query(`SELECT id, prefix FROM air_line`)
  let filterArary = prefixList.filter(item => {
    let prefix = JSON.parse(item.prefix)
    if (fromCity === prefix.fromCityName && toCity === prefix.toCityName) {
      return item
    }
  })
  // 没有符合条件数据
  if (filterArary.length === 0) {
    return []
  } else {
    const sqlInStr = processSpliceSQL(filterArary)
    const sql = `SELECT * FROM air_line WHERE startTime LIKE '%${startTime}%' AND id IN ${sqlInStr}`
    const list = await mysql.query(sql)
    return list
  }
}

/**
 * @desc 获取火车班次列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
const retrieveTrainLine = async payload => {
  const { fromCity, toCity, startTime } = payload
  const prefixList = await mysql.query(`SELECT id, prefix FROM train_line`)
  let filterArary = prefixList.filter(item => {
    let prefix = JSON.parse(item.prefix)
    if (fromCity === prefix.fromCityName && toCity === prefix.toCityName) {
      return item
    }
  })
  if (filterArary.length === 0) {
    return []
  } else {
    const sqlInStr = processSpliceSQL(filterArary)
    const sql = `SELECT * FROM train_line WHERE startTime LIKE '%${startTime}%' AND id IN ${sqlInStr}`
    const list = await mysql.query(sql)
    return list
  }
}

/**
 * @desc 获取大巴班次列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
const retrieveBusLine = async payload => {
  const { fromCity, toCity, startTime } = payload
  const prefixList = await mysql.query(`SELECT id, prefix FROM bus_line`)
  let filterArary = prefixList.filter(item => {
    let prefix = JSON.parse(item.prefix)
    if (fromCity === prefix.fromCityName && toCity === prefix.toCityName) {
      return item
    }
  })
  if (filterArary.length === 0) {
    return []
  } else {
    const sqlInStr = processSpliceSQL(filterArary)
    const sql = `SELECT * FROM bus_line WHERE startTime LIKE '%${startTime}%' AND id IN ${sqlInStr}`
    const list = await mysql.query(sql)
    return list
  }
}

module.exports = {
  retrievePlaneLine,
  retrieveTrainLine,
  retrieveBusLine
}
