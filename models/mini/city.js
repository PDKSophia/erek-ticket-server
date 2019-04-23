/**
 *
 * @desc 城市模块 model
 * @author PDK
 *
 * Created at     : 2019-04-20
 * Last modified  : 2019-04-20
 */
const mysql = require('../../config/connect')

/**
 * @desc 获取当季旅游地城市列表
 * @param {Object} params
 */
const retrieveTravelList = async () => {
  const sql = `SELECT * FROM city WHERE city_type = "20"`
  const list = await mysql.query(sql)
  let result = {
    list: [...list]
  }
  return result
}

/**
 * @desc 获取热门推荐城市列表
 * @param {Object} params
 */
const retrieveRecommendList = async () => {
  const sql = `SELECT * FROM city WHERE city_type = "10"`
  const list = await mysql.query(sql)
  let result = {
    list: [...list]
  }
  return result
}

/**
 * @desc 获取旅游主题城市列表
 * @param {Object} params
 */
const retrieveStyleList = async () => {
  const sql = `SELECT * FROM city WHERE city_type = "30"`
  const list = await mysql.query(sql)
  let result = {
    list: [...list]
  }
  return result
}

module.exports = {
  retrieveTravelList,
  retrieveRecommendList,
  retrieveStyleList
}
