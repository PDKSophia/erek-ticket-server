/**
 * 模块依赖
 */
const express = require('express')
const session = require('express-session')
const client = require('./config/redis')
const RedisStore = require('connect-redis')(session)
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

const whitelist = [
  'http://localhost:2442',
  'http://localhost:2345',
  'http://localhost:2346',
  'http://localhost:2347',
  'http://localhost:2348',
  'http://localhost:2349',
  'http://localhost:6969'
]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/**
 * 中间件
 */
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
let redisOptions = {
  client: client,
  host: '127.0.0.1',
  port: 6379
}
app.use(
  session({
    secret: 'ticket2019',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000,
      secure: false
    },
    store: new RedisStore(redisOptions)
  })
)
app.use(bodyParser.json())
app.use(cors({ credentials: true }))
app.options('*', cors())

app.use('/', cors(corsOptions))
routes(app)
/**
 * 跨域
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type') //预检请求使用
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') //预检请求使用
  next()
})
/**
 * 端口
 */
app.set('port', process.env.PORT || 2442)
app.listen(app.get('port'), function () {
  console.log('Express server is running at : ' + app.get('port'))
})
