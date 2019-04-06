/**
 *
 * @desc 数据库连接
 * @author PDK
 *
 * Created at     : 2019-03-20
 * Last modified  : 2019-03-20
 */
var mysql = require('mysql')
var config = require('./default')

var pool = mysql.createPool({
  host: config.database.HOST, // 主机
  user: config.database.USER, // 用户
  password: config.database.PASSWORD, // 密码
  database: config.database.DATABASE, // 数据库
  port: config.port, // 端口
  debug: true // 是否开启debug
})

var query = (sql, value) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      console.log("111111111")
      if (err) {
        console.log("err:", err)
        reject(err)
      } else {
        console.log("22222222")
        connection.query(sql, value, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { pool, query }
