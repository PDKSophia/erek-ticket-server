/**
 *
 * @desc 火车模块
 * @author PDK
 *
 * Created at     : 2019-04-10
 * Last modified  : 2019-04-10
 */

const express = require('express')
const router = express.Router()
const trainController = require('../../controllers/backend/train')

/**
 * @desc 分页获取火车站点列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 页大小
 */
router.get('/position/get-all', async (req, res) => {
  try {
    const response = await trainController.retrievePosList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增火车站点
 * @param {Object} jsondata
 */
router.post('/position/add', async (req, res) => {
  try {
    const response = await trainController.createPosition(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑火车站点
 * @param {Object} jsondata
 */
router.put('/position/update', async (req, res) => {
  try {
    const response = await trainController.updatePosition(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除火车站点
 * @param {Number} posId
 */
router.delete('/position/delete-id', async (req, res) => {
  try {
    const response = await trainController.deletePosition(req, req.query.posId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})


/**
 * @desc 分页获取火车班次列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 页大小
 */
router.get('/line/get-all', async (req, res) => {
  try {
    const response = await trainController.retrieveLineList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增火车班次
 * @param {Object} jsondata
 */
router.post('/line/add', async (req, res) => {
  try {
    const response = await trainController.createLine(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑火车班次
 * @param {Object} jsondata
 */
router.put('/line/update', async (req, res) => {
  try {
    const response = await trainController.updateLine(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除火车班次
 * @param {Number} lineId
 */
router.delete('/line/delete-id', async (req, res) => {
  try {
    const response = await trainController.deleteLine(req, req.query.lineId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
