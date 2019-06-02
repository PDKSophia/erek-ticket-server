/**
 * 模块依赖
 */
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
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
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      // callback(new Error('Not allowed by CORS'))
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
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type') //预检请求使用
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS') //预检请求使用
  next()
})
/**
 * 端口
 */
app.set('port', process.env.PORT || 2442)

/**
 * cluster实现多cpu的利用
 */
if (cluster.isMaster) {
  // master start
  console.log('start master...')
  // 遍历 fork worker
  for (let i = 0; i < numCPUs; i++) {
    var worker = cluster.fork()
    worker.send('[master] ' + 'hi worker' + worker.id)
  }
  // 进行fork
  cluster.on('fork', function(worker) {
    console.log(
      `Master fork: worker , worker id=${worker.id}, worker pid=${
        worker.process.pid
      }`
    )
  })
  // worker在线
  cluster.on('online', function(worker) {
    console.log(`worker-${worker.id} online ... `)
  })
  // worker监听
  cluster.on('listening', function(worker, address) {
    console.log(
      `listening: worker pid=${worker.process.pid}, address=127.0.0.1:${
        address.port
      }`
    )
  })
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  app.listen(app.get('port'))
}
