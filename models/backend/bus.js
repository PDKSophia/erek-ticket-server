/**
 *
 * @desc 汽车模块 model
 * @author PDK
 *
 * Created at     : 2019-04-07
 * Last modified  : 2019-04-07
 */
const mysql = require('../../config/connect')

/**
 * @获取表的总数
 */
const retrieveLength = async () => {
  const sql = `SELECT * FROM bus_position ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取汽车站点列表
 * @param {Object} params
 */
const retrievePosList = async params => {
  const {pageNum, pageSize} = params
  const start = (pageNum - 1) * pageNum
  const sql = `SELECT * FROM bus_position LIMIT ${start}, ${pageSize}`
  const list = await mysql.query(sql)
  const count = await retrieveLength()
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
  const {bus_name, cityId, prefix} = payload
  const sql = `INSERT INTO bus_position(bus_name, cityId, prefix) VALUES ('${bus_name}', '${cityId}', '${prefix}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrieveLength()
  return result[0]
}

/**
 * @desc 编辑汽车站点
 * @param {Object} payload
 */
const updatePosition = async payload => {
  const {id, bus_name, cityId, prefix} = payload
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

module.exports = {
  retrievePosList,
  createPosition,
  updatePosition,
  deletePosition,
}
