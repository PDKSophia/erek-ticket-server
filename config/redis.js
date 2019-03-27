/**
 *
 * @desc redis config
 * @author PDK
 *
 * Created at     : 2019-03-22
 * Last modified  : 2019-03-22
 */
const redis = require('redis')

var client = redis.createClient(6379, '127.0.0.1', {
  password: '123'
})

module.exports = client
