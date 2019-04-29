/**
 *
 * @desc 火车模块 model
 * @author PDK
 *
 * Created at     : 2019-04-10
 * Last modified  : 2019-04-10
 */
const mysql = require('../../config/connect')

/**
 * @desc 获取班次表的总数
 */
const retrievePosLength = async () => {
  const sql = `SELECT * FROM train_position ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取火车站点列表
 * @param {Object} params
 */
const retrievePosList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageSize
  const sql = `SELECT * FROM train_position LIMIT ${startCount}, ${endCount}`
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
 * @desc 新增火车站点
 * @param {Object} payload
 */
const createPosition = async payload => {
  const { train_name, cityId, prefix } = payload
  const sql = `INSERT INTO train_position(train_name, cityId, prefix) VALUES ('${train_name}', '${cityId}', '${prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrievePosLength()
  return result[0]
}

/**
 * @desc 编辑火车站点
 * @param {Object} payload
 */
const updatePosition = async payload => {
  const { id, train_name, cityId, prefix } = payload
  const sql = `UPDATE train_position SET train_name='${train_name}', cityId='${cityId}', prefix='${prefix}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除火车站点
 * @param {Number} posId
 */
const deletePosition = async posId => {
  const sql = `DELETE FROM train_position WHERE id=${posId}`
  await mysql.query(sql)
  return null
}

/**
 * @desc 获取班次表的总数
 */
const retrieveLineLength = async () => {
  const sql = `SELECT * FROM train_line ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 分页获取火车班次列表
 * @param {Object} params
 */
const retrieveLineList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageSize
  const sql = `SELECT * FROM train_line LIMIT ${startCount}, ${endCount}`
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
 * @desc 新增火车班次
 * @param {Object} payload
 */
const createLine = async payload => {
  const { name, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, prefix } = payload
  const sql = `INSERT INTO train_line (name, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, prefix) VALUES ('${name}', '${fromCityId}', '${toCityId}', '${fromPosId}', '${toPosId}', '${startTime}', '${arriveTime}', '${prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrieveLineLength()
  return result[0]
}

/**
 * @desc 编辑火车班次
 * @param {Object} payload
 */
const updateLine = async payload => {
  const { id, name, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, prefix } = payload
  const sql = `UPDATE train_line SET name='${name}', fromCityId='${fromCityId}', toCityId='${toCityId}', fromPosId='${fromPosId}', toPosId='${toPosId}', startTime='${startTime}', arriveTime='${arriveTime}', prefix='${prefix}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除火车班次
 * @param {Number} lineId
 */
const deleteLine = async lineId => {
  const sql = `DELETE FROM train_line WHERE id=${lineId}`
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
