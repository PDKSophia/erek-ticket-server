/**
 *
 * @desc 订单模块
 * @author PDK
 *
 * Created at     : 2019-05-19
 * Last modified  : 2019-05-19
 */

const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/backend/order')

/**
 * @desc 获取所有订单
 */
router.get('/get-all', async (req, res) => {
  try {
    const result = await orderController.retrieveAllOrder(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 根据订单号搜索订单
 */
router.post('/search', async (req, res) => {
  try {
    const result = await orderController.retrieveSearchOrder(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
