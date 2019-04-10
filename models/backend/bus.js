/**
 *
 * @desc 汽车模块 model
 * @author PDK
 *
 * Created at     : 2019-04-07
 * Last modified  : 2019-04-10
 */
const mysql = require('../../config/connect')

/**
 * @desc 获取班次表的总数
 */
const retrievePosLength = async () => {
  const sql = `SELECT * FROM bus_position ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取汽车站点列表
 * @param {Object} params
 */
const retrievePosList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageNum * pageSize
  const sql = `SELECT * FROM bus_position LIMIT ${startCount}, ${endCount}`
  const list = await mysql.query(sql)
  const count = await retrievePosLength()
  let result = {
    posPageNum: parseInt(pageNum),
    posPageSize: parseInt(pageSize),
    posTotal: count.length,
    posList: [...list],
  }
  return result
}

/**
 * @desc 新增汽车站点
 * @param {Object} payload
 */
const createPosition = async payload => {
  const { bus_name, cityId, prefix } = payload
  const sql = `INSERT INTO bus_position(bus_name, cityId, prefix) VALUES ('${bus_name}', '${cityId}', '${prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrievePosLength()
  return result[0]
}

/**
 * @desc 编辑汽车站点
 * @param {Object} payload
 */
const updatePosition = async payload => {
  const { id, bus_name, cityId, prefix } = payload
  const sql = `UPDATE bus_position SET bus_name='${bus_name}', cityId='${cityId}', prefix='${prefix}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除汽车站点
 * @param {Number} posId
 */
const deletePosition = async posId => {
  const sql = `DELETE FROM bus_position WHERE id=${posId}`
  await mysql.query(sql)
  return null
}

/**
 * @desc 获取班次表的总数
 */
const retrieveLineLength = async () => {
  const sql = `SELECT * FROM bus_line ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取汽车班次列表
 * @param {Object} params
 */
const retrieveLineList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageNum * pageSize
  const sql = `SELECT * FROM bus_line LIMIT ${startCount}, ${endCount}`
  const list = await mysql.query(sql)
  const count = await retrieveLineLength()
  let result = {
    linePageNum: parseInt(pageNum),
    linePageSize: parseInt(pageSize),
    lineTotal: count.length,
    lineList: [...list],
  }
  return result
}

/**
 * @desc 新增汽车班次
 * @param {Object} payload
 */
const createLine = async payload => {
  const { name, price, count, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, prefix } = payload
  const sql = `INSERT INTO bus_line (name, price, count, sell, surplus, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, prefix) VALUES ('${name}', '${price}', '${count}', '0', '${count}', '${fromCityId}', '${toCityId}', '${fromPosId}', '${toPosId}', '${startTime}', '${arriveTime}', '${prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrieveLineLength()
  return result[0]
}

/**
 * @desc 编辑汽车班次
 * @param {Object} payload
 */
const updateLine = async payload => {
  const { id, name, price, count, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, prefix } = payload
  const sql = `UPDATE bus_line SET name='${name}', price='${price}', count='${count}', fromCityId='${fromCityId}', toCityId='${toCityId}', fromPosId='${fromPosId}', toPosId='${toPosId}', startTime='${startTime}', arriveTime='${arriveTime}', prefix='${prefix}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除汽车班次
 * @param {Number} lineId
 */
const deleteLine = async lineId => {
  const sql = `DELETE FROM bus_line WHERE id=${lineId}`
  await mysql.query(sql)
  return null
}

module.exports = {
  retrievePosList,
  createPosition,
  updatePosition,
  deletePosition,
  retrieveLineList,
  createLine,
  updateLine,
  deleteLine,
}
