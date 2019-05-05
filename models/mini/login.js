/**
 *
 * @desc 小程序登陆模块 model
 * @author PDK
 *
 * Created at     : 2019-04-12
 * Last modified  : 2019-04-12
 */
const mysql = require('../../config/connect')

/**
 * @desc 查看数据库是否存在openId
 * @param {String} openId
 */
const retrieveOpenId = async openId => {
  const sql = `SELECT * FROM user WHERE openId = "${openId}"`
  try {
    const data = await mysql.query(sql)
    return data
  } catch (err) {
    return null
  }
}
/**
 * @desc 新增一条openId及token
 * @param {String} openId
 * @param {String} token
 * @param {String} nickname
 * @param {String} avatar
 */
const createOpenIdToken = async (nickname, avatar, openId, token) => {
  const sql = `INSERT INTO user(nickname, avatar, openid, token, score, money, prefix) VALUES ('${nickname}', '${avatar}', '${openId}', '${token}', '1000', '0', '' )`
  try {
    await mysql.query(sql)
    return {
      token: token
    }
  } catch (err) {
    return null
  }
}
/**
 * @desc 根据openId更新token
 * @param {String} openId
 * @param {String} token
 */
const updateUserInfo = async (openId, token) => {
  const sql = `UPDATE user SET token='${token}' WHERE openId = "${openId}"`
  try {
    await mysql.query(sql)
    return {
      token: token
    }
  } catch (err) {
    return null
  }
}

/**
 * @获取用户信息
 */
const retrieveUser = async token => {
  const sql = `SELECT * FROM user WHERE token = "${token}"`
  return await mysql.query(sql)
}
module.exports = {
  retrieveOpenId,
  createOpenIdToken,
  updateUserInfo,
  retrieveUser
}
