/**
 *
 * @desc 城市模块 model
 * @author PDK
 *
 * Created at     : 2019-03-27
 * Last modified  : 2019-03-27
 */
const mysql = require('../../config/connect')

/**
 * @获取表的总数
 */
const retrieveLength = async () => {
  const sql = `SELECT * FROM city ORDER BY id DESC`
  const result = await mysql.query(sql)
  return result
}

/**
 * @desc 获取status列表数据
 * @param {Object} params
 */
const retrieveStatusList = async () => {
  const status1Data = await mysql.query(
    `SELECT * FROM city WHERE city_status = '1'`
  )
  const status2Data = await mysql.query(
    `SELECT * FROM city WHERE city_status != '1'`
  )
  const total = await retrieveLength()
  let result = [
    {
      text: '省会城市',
      value: status1Data.length
    },
    {
      text: '全部城市',
      value: total.length
    },
    {
      text: '其他城市',
      value: status2Data.length
    }
  ]
  return result
}

/**
 * @desc 获取城市列表
 * @param {Object} params
 */
const retrieveCityList = async params => {
  const { pageNum, pageSize } = params
  const start = (pageNum - 1) * pageNum
  const sql = `SELECT * FROM city LIMIT ${start}, ${pageSize}`
  const list = await mysql.query(sql)
  const count = await retrieveLength()
  let result = {
    current: parseInt(pageNum),
    size: parseInt(pageSize),
    count: count.length,
    list: [...list]
  }
  return result
}

/**
 * @desc 新增城市
 * @param {Object} payload
 */
const createCity = async payload => {
  const { city_name, city_status, city_desc, city_cover } = payload
  const sql = `INSERT INTO city(city_name, city_status, city_desc, city_cover) VALUES ('${city_name}', '${city_status}', '${city_desc}', '${city_cover}')`
  await mysql.query(sql) // 执行插入语句
  const result = await retrieveLength()
  return result[0]
}

/**
 * @desc 编辑城市
 * @param {Object} payload
 */
const updateCity = async payload => {
  const { id, city_name, city_status, city_desc } = payload
  const sql = `UPDATE city SET city_name='${city_name}', city_status='${city_status}', city_desc='${city_desc}' WHERE id=${id}`
  await mysql.query(sql)
  return payload
}

/**
 * @desc 删除城市
 * @param {Number} staffId
 */
const deleteCity = async cityId => {
  const sql = `DELETE FROM city WHERE id=${cityId}`
  await mysql.query(sql)
  return null
}

module.exports = {
  retrieveStatusList,
  retrieveCityList,
  createCity,
  updateCity,
  deleteCity
}
