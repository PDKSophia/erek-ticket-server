/**
 *
 * @desc 城市模块
 * @author PDK
 *
 * Created at     : 2019-03-27
 * Last modified  : 2019-03-27
 */

const express = require('express')
const router = express.Router()
const cityController = require('../../controllers/backend/city')

/**
 * @desc 获取城市status状态
 */
router.get('/get-status', async (req, res) => {
  try {
    const response = await cityController.retrieveStatusList(req)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 分页获取城市列表
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 页大小
 */
router.get('/get-all', async (req, res) => {
  try {
    const response = await cityController.retrieveCityList(req, req.query)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 新增城市
 * @param {Object} jsondata
 */
router.post('/add', async (req, res) => {
  try {
    const response = await cityController.createCity(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 编辑城市
 * @param {Object} jsondata
 */
router.put('/update', async (req, res) => {
  try {
    const response = await cityController.updateCity(req, req.body)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

/**
 * @desc 删除城市
 * @param {Number} cityId
 */
router.delete('/delete-id', async (req, res) => {
  try {
    const response = await cityController.deleteCity(req, req.query.cityId)
    res.json(response)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
