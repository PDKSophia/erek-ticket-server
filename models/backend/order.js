/**
 *
 * @desc 订单模块 model
 * @author PDK
 *
 * Created at     : 2019-05-19
 * Last modified  : 2019-05-19
 */
const mysql = require('../../config/connect')

/**
 * @desc 获取当前用户飞机所有订单
 * @param {String} token 用户token
 */
const retrieveAllOrder = async () => {
  const sql = `SELECT * FROM order_line ORDER BY id DESC`
  try {
    const list = await mysql.query(sql)
    return {
      list
    }
  } catch (err) {
    return []
  }
}

/**
 * @desc 获取当前用户飞机所有订单
 * @param {String} code 用户code
 */
const retrieveSearchOrder = async code => {
  const sql = `SELECT * FROM order_line WHERE order_code = '${code}'`
  try {
    const data = await mysql.query(sql)
    if (data.length !== 0) {
      return data[0]
    } else {
      return []
    }
  } catch (err) {
    return []
  }
}

module.exports = {
  retrieveAllOrder,
  retrieveSearchOrder
}
