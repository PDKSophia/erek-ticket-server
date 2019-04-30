/**
 *
 * @desc 小程序搜索模块
 * @author PDK
 *
 * Created at     : 2019-04-30
 * Last modified  : 2019-04-30
 */

const express = require('express')
const router = express.Router()
const searchController = require('../../controllers/mini/search')

/**
 * @desc 获取飞机航班列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
router.get('/plane-line/get-all', async (req, res) => {
  try {
    const result = await searchController.retrievePlaneLine(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 获取火车班次列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
router.get('/train-line/get-all', async (req, res) => {
  try {
    const result = await searchController.retrieveTrainLine(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 获取大巴班次列表
 * @param {String} fromCity  起始城市
 * @param {String} toCity    目的城市
 * @param {String} startTime 起始时间
 */
router.get('/bus-line/get-all', async (req, res) => {
  try {
    const result = await searchController.retrieveBusLine(req)
    res.json(result)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router