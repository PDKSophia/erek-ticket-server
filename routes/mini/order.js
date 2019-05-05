/**
 *
 * @desc 小程序订单模块
 * @author PDK
 *
 * Created at     : 2019-05-03
 * Last modified  : 2019-05-05
 */

const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/mini/order')

/**
 * @desc 新增飞机订单
 * @param {Number} typeId       飞机航班的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
router.post('/plane/add', async (req, res) => {
  try {
    const result = await orderController.createPlaneOrder(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增火车订单
 * @param {Number} typeId       飞机航班的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
router.post('/train/add', async (req, res) => {
  try {
    const result = await orderController.createTrainOrder(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增大巴订单
 * @param {Number} typeId       飞机航班的id
 * @param {String} type         类型type
 * @param {String} description  描述
 * @param {String} record       数据
 * @param {String} prefix       保留字段
 */
router.post('/bus/add', async (req, res) => {
  try {
    const result = await orderController.createBusOrder(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 获取当前用户飞机所有订单
 */
router.get('/plane/get-all', async (req, res) => {
  try {
    const result = await orderController.retrieveOrderPlane(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 获取当前用户火车所有订单获
 */
router.get('/train/get-all', async (req, res) => {
  try {
    const result = await orderController.retrieveOrderTrain(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 获取当前用户大巴所有订单获
 */
router.get('/bus/get-all', async (req, res) => {
  try {
    const result = await orderController.retrieveOrderBus(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
