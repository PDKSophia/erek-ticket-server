/**
 *
 * @desc 文件上传模块
 * @author PDK
 *
 * Created at     : 2019-03-27
 * Last modified  : 2019-03-27
 */

const express = require('express')
const router = express.Router()
const fileController = require('../../controllers/global/upload')

/**
 * @desc 上传文件
 */
router.post('/upload', async (req, res) => {
  try {
    await fileController.upload(req, res)
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
