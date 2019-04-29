/**
 *
 * @desc 登陆模块
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-03-23
 */

const express = require('express')
const router = express.Router()
const loginController = require('../../controllers/backend/login')

/**
 * @desc 根据email发送验证码
 * @param {String} email
 */
router.post('/email-code', async (req, res) => {
  try {
    const response = await loginController.retrieveCode(req, req.body)
    console.log('咋回事啊？？', response)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 获取token
 * @param {String} email
 */
router.post('/get-token', (req, res) => {
  try {
    loginController.retrieveToken(req).then(result => {
      res.json(result)
    })
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 根据token获取用户信息
 * @param {String} email
 */
router.get('/oauth-token', async (req, res) => {
  try {
    const result = await loginController.retrieveUser(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
