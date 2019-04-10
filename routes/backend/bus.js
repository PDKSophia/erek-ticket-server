/**
 *
 * @desc 汽车模块
 * @author PDK
 *
 * Created at     : 2019-04-07
 * Last modified  : 2019-04-07
 */

const express = require('express')
const router = express.Router()
const busController = require('../../controllers/backend/bus')

/**
 * @desc 分页获取汽车站点列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 页大小
 */
router.get('/position/get-all', async (req, res) => {
  try {
    const response = await busController.retrievePosList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增汽车站点
 * @param {Object} jsondata
 */
router.post('/position/add', async (req, res) => {
  try {
    const response = await busController.createPosition(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑汽车站点
 * @param {Object} jsondata
 */
router.put('/position/update', async (req, res) => {
  try {
    const response = await busController.updatePosition(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除汽车站点
 * @param {Number} posId
 */
router.delete('/position/delete-id', async (req, res) => {
  try {
    const response = await busController.deletePosition(req, req.query.posId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})


/**
 * @desc 分页获取汽车班次列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 页大小
 */
router.get('/line/get-all', async (req, res) => {
  try {
    const response = await busController.retrieveLineList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增汽车班次
 * @param {Object} jsondata
 */
router.post('/line/add', async (req, res) => {
  try {
    const response = await busController.createLine(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑汽车班次
 * @param {Object} jsondata
 */
router.put('/line/update', async (req, res) => {
  try {
    const response = await busController.updateLine(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除汽车班次
 * @param {Number} lineId
 */
router.delete('/line/delete-id', async (req, res) => {
  try {
    const response = await busController.deleteLine(req, req.query.lineId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
