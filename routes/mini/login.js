/**
 *
 * @desc 小程序登陆模块
 * @author PDK
 *
 * Created at     : 2019-04-12
 * Last modified  : 2019-04-12
 */

const express = require('express')
const router = express.Router()
const loginController = require('../../controllers/mini/login')

/**
 * @desc 通过code换取openId，返回token
 * @param {Object} code
 */
router.post('/oauth-code', async (req, res) => {
  try {
    const result = await loginController.retrieveCode(req)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
})


/**
 * @desc 根据token获取用户信息
 * @param {String} email
 */
router.get('/get-info', async (req, res) => {
  try {
    const result = await loginController.retrieveUser(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 修改用户的prefix
 * @param {String} prefix
 */
router.put('/update-field', async (req, res) => {
  try {
    const result = await loginController.updateUserField(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})



module.exports = router
