/**
 *
 * @desc 小程序city模块
 * @author PDK
 *
 * Created at     : 2019-04-20
 * Last modified  : 2019-04-20
 */

const express = require('express')
const router = express.Router()
const cityController = require('../../controllers/mini/city')

/**
 * @desc 获取当季旅游地城市列表
 * @param {String} email
 */
router.get('/travel/get-all', async (req, res) => {
  try {
    const result = await cityController.retrieveTravelList(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})
/**
 * @desc 获取热门推荐城市列表
 * @param {String} email
 */
router.get('/recommend/get-all', async (req, res) => {
  try {
    const result = await cityController.retrieveRecommendList(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})
/**
 * @desc 获取旅游主题城市列表
 * @param {String} email
 */
router.get('/style/get-all', async (req, res) => {
  try {
    const result = await cityController.retrieveStyleList(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
