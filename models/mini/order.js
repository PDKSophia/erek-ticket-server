/**
 *
 * @desc 小程序订单模块 model
 * @author PDK
 *
 * Created at     : 2019-05-03
 * Last modified  : 2019-05-03
 */
const mysql = require('../../config/connect')
const sd = require('silly-datetime')
const createTokenString = require('../../utils').createTokenString

/**
 * @desc 获取航班表的总数
 */
const retrieveOrderLength = async type => {
  const sql = `SELECT * FROM order_line WHERE type = '${type}' ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 新增飞机订单
 * @param {Number} typeId       飞机航班的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
const createPlaneOrder = async (payload) => {
  const { typeId, type, description, record, prefix } = payload
  var createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
  var status = 10
  const order_code = createTokenString()
  const sql = `INSERT INTO order_line(typeId, type, description, createTime, status, record, order_code, prefix) VALUES ('${typeId}', '${type}', '${description}', '${createTime}', '${status}', '${record}', '${order_code}', '${prefix}' )`
  try {
    await mysql.query(sql)
    const list = await retrieveOrderLength('plane')
    return list[0]
  } catch (err) {
    return null
  }
}

/**
 * @desc 新增火车订单
 * @param {Number} typeId       火车车次的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
const createTrainOrder = async (payload) => {
  const { typeId, type, description, record, prefix } = payload
  var createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
  var status = 10
  const order_code = createTokenString()
  const sql = `INSERT INTO order_line(typeId, type, description, createTime, status, record, order_code, prefix) VALUES ('${typeId}', '${type}', '${description}', '${createTime}', '${status}', '${record}', '${order_code}', '${prefix}' )`
  try {
    await mysql.query(sql)
    const list = await retrieveOrderLength('train')
    return list[0]
  } catch (err) {
    return null
  }
}

/**
 * @desc 新增大巴订单
 * @param {Number} typeId       大巴车次的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
const createBusOrder = async (payload) => {
  const { typeId, type, description, record, prefix } = payload
  var createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
  var status = 10
  const order_code = createTokenString()
  const sql = `INSERT INTO order_line(typeId, type, description, createTime, status, record, order_code, prefix) VALUES ('${typeId}', '${type}', '${description}', '${createTime}', '${status}', '${record}', '${order_code}', '${prefix}' )`
  try {
    await mysql.query(sql)
    const list = await retrieveOrderLength('bus')
    return list[0]
  } catch (err) {
    return null
  }
}

module.exports = {
  createPlaneOrder,
  createTrainOrder,
  createBusOrder
}