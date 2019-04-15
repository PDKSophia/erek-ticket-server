/**
 *
 * @desc 飞机模块
 * @author PDK
 *
 * Created at     : 2019-04-11
 * Last modified  : 2019-04-11
 */

const express = require('express')
const router = express.Router()
const airController = require('../../controllers/backend/air')

/**
 * @desc 分页获取飞机机场列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 页大小
 */
router.get('/position/get-all', async (req, res) => {
  try {
    const response = await airController.retrievePosList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增飞机机场
 * @param {Object} jsondata
 */
router.post('/position/add', async (req, res) => {
  try {
    const response = await airController.createPosition(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑飞机机场
 * @param {Object} jsondata
 */
router.put('/position/update', async (req, res) => {
  try {
    const response = await airController.updatePosition(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除飞机机场
 * @param {Number} posId
 */
router.delete('/position/delete-id', async (req, res) => {
  try {
    const response = await airController.deletePosition(req, req.query.posId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})


/**
 * @desc 分页获取飞机航班列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 页大小
 */
router.get('/line/get-all', async (req, res) => {
  try {
    const response = await airController.retrieveLineList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增飞机航班
 * @param {Object} jsondata
 */
router.post('/line/add', async (req, res) => {
  try {
    const response = await airController.createLine(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑飞机航班
 * @param {Object} jsondata
 */
router.put('/line/update', async (req, res) => {
  try {
    const response = await airController.updateLine(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除飞机航班
 * @param {Number} lineId
 */
router.delete('/line/delete-id', async (req, res) => {
  try {
    const response = await airController.deleteLine(req, req.query.lineId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
