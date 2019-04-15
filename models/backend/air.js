/**
 *
 * @desc 飞机模块 model
 * @author PDK
 *
 * Created at     : 2019-04-11
 * Last modified  : 2019-04-11
 */
const mysql = require('../../config/connect')

/**
 * @desc 获取航班表的总数
 */
const retrievePosLength = async () => {
  const sql = `SELECT * FROM air_position ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取飞机站点列表
 * @param {Object} params
 */
const retrievePosList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageNum * pageSize
  const sql = `SELECT * FROM air_position LIMIT ${startCount}, ${endCount}`
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
 * @desc 新增飞机站点
 * @param {Object} payload
 */
const createPosition = async payload => {
  const { air_name, cityId, prefix } = payload
  const sql = `INSERT INTO air_position(air_name, cityId, prefix) VALUES ('${air_name}', '${cityId}', '${prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrievePosLength()
  return result[0]
}

/**
 * @desc 编辑飞机站点
 * @param {Object} payload
 */
const updatePosition = async payload => {
  const { id, air_name, cityId, prefix } = payload
  const sql = `UPDATE air_position SET air_name='${air_name}', cityId='${cityId}', prefix='${prefix}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除飞机站点
 * @param {Number} posId
 */
const deletePosition = async posId => {
  const sql = `DELETE FROM air_position WHERE id=${posId}`
  await mysql.query(sql)
  return null
}

/**
 * @desc 获取航班表的总数
 */
const retrieveLineLength = async () => {
  const sql = `SELECT * FROM air_line ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 分页获取飞机航班列表
 * @param {Object} params
 */
const retrieveLineList = async params => {
  const { pageNum, pageSize } = params
  var startCount = pageNum === 1 ? 0 : (pageNum - 1) * pageSize
  var endCount = pageNum * pageSize
  const sql = `SELECT * FROM air_line LIMIT ${startCount}, ${endCount}`
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
 * @desc 新增飞机航班
 * @param {Object} payload
 */
const createLine = async payload => {
  const { name, air_company, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, record, prefix } = payload
  const sql = `INSERT INTO air_line (name, air_company, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, record, prefix) VALUES ('${name}', '${air_company}', '${fromCityId}', '${toCityId}', '${fromPosId}', '${toPosId}', '${startTime}', '${arriveTime}', '${record}', '${prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrieveLineLength()
  return result[0]
}

/**
 * @desc 编辑飞机航班
 * @param {Object} payload
 */
const updateLine = async payload => {
  const { id, name, fromCityId, toCityId, fromPosId, toPosId, startTime, arriveTime, prefix } = payload
  const sql = `UPDATE air_line SET name='${name}', fromCityId='${fromCityId}', toCityId='${toCityId}', fromPosId='${fromPosId}', toPosId='${toPosId}', startTime='${startTime}', arriveTime='${arriveTime}', prefix='${prefix}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除飞机航班
 * @param {Number} lineId
 */
const deleteLine = async lineId => {
  const sql = `DELETE FROM air_line WHERE id=${lineId}`
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
