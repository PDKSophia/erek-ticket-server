## 介绍

> 毕业设计的后端代码，采用 Node + Express + Mysql 进行开发，代码简陋，适合初学者观看

> 所有版权均归博主 : 彭道宽

## 简单说明

```javascript
1. 使用 node + express 框架开发

2. 通过 mysql 进行数据库管理

3. 采用 MVC 设计模式 (可能还是有缺陷)

4. 通过 nodemailer 进行邮箱验证码发放
```

## 使用

算了，还是别用了，你们还要改数据库的各种，然后还要建表等事情，麻烦的一匹，如果是跟我一样，只是用 node 简单做个后端，那就看看，稳妥～

## 遇到的一些小问题

### 邮箱验证码

- 报错 501

  - 这个错误的原因是: 你的邮件发送地址和 SMTP 验证的用户名不对应
  - 检查一下 config 配置的 auth.user 和你的 mailOption.from 是否一样

- 报错 454

  - 账号未设置该服务
  - 解决方案: QQ 邮箱 -> 设置 -> 帐户 -> 开启服务：POP3/SMTP 服务

### express-session 无效

验证码通过 session 缓存，登陆的时候进行验证码校验，但是死活就是获取不到 session 缓存的 code ，然后去 github 看了一下文档，发现了一句话

> Please note that secure: true is a recommended option. However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies. If secure is set, and you access your site over HTTP, the cookie will not be set. If you have your node.js behind a proxy and are using secure: true, you need to set "trust proxy" in express:

不用我翻译了吧，大概意思就是 如果启用了 `secure`，但是是用 HTTP 进行的访问，那么 cookie 不会发送给客户端

也就是说，如果你采用 http 访问，那么你的 secure 应该设为 false

然后我 google 了一下，发现很多文章都是这样配置，然后就设置值，再取值

```javascript
var express = require('express')
var app = express()
var session = require('express-session')

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      secure: false
    }
  })
)

// code ...

// 设置值
req.session.user_id = req.body.user_id

// 取值
const user_id = req.session.user_id
```

然后你们看下我代码 ?? app.js 中长得一样，就看如何使用..

```javascript
// 存session，正常可以存
async function retrieveCode(req, payload) {
  try {
    // code ...

    req.session.email_code = code
    console.log('缓存code : ', req.session.email_code) // 缓存code 49167

    // ...
  } catch (error) {}
}

// 取session，取不到
async function retrieveToken(req) {
  // code...
  console.log('从缓存session中取code : ', req.session.email_code) // undefined

  // ...
}
```

> ⚠️ 同一个浏览器发出的请求会覆盖 session

what❓ 为什么我就不 ok❓ 我贼心不死，看了不下 10 篇，发现都是一模一样？炸了，然后我就去 github 上看 [express-session](https://github.com/expressjs/session) 文档，看官方给的例子，ok，我跟它长得已经一模一样了，但是就是拿不到值，我已经蒙圈了 😠

ok，稳住，我又去 issues 搜一下，有没有出现跟我一样的大哥，发现  大哥们好像都没遇到和我一样的问题啊，但是还是找到一些可以参考的 issue : [Express session object getting removed](https://github.com/expressjs/session/issues/571) 、 [Sessions In API's](https://github.com/expressjs/session/issues/161) ... 哭了，我还是没能看到解决方法，why，why I can't get `req.session.email_code`

继续找，发现了两个 issues，[Cookie less version?](https://github.com/expressjs/session/issues/317)、[Cookieless Session](https://github.com/expressjs/session/issues/543)，我甚至怀疑是不是我版本问题，于是我就去把 `express-session` 版本升级了一下，发现并不是，gg，又凉了

一直怀疑，会不会是我的 req 是不同的???，于是，我把 req 打印了一下，然后去看了 session 的部分，发现...

```javascript
async function retrieveCode(req, payload) {
  try {
    req.session.email_code = code
    console.log('打印第一次req: ', req) // 缓存code 49167
    // sessionID: 'Y11FsZ0vgcJFPyJIftuEItLQn8P4rVg-',
    // session:
    //  Session {
    //    cookie:
    //     { path: '/',
    //       _expires: null,
    //       originalMaxAge: null,
    //       httpOnly: true },
    //    email_code: '71704' },
    // ...
  } catch (error) {}
}

async function retrieveToken(req) {
  // code...
  console.log('第二次打印req : ', req)
  // sessionID: 'MvoJQR8BSQZA6zcfuJFYuJltQH5ZU1rS',
  // session:
  //   Session {
  //     cookie:
  //      { path: '/',
  //        _expires: null,
  //        originalMaxAge: null,
  //        httpOnly: true } },
  // ...
}
```

到这里我们就知道，通过 `sessionID` 我就明白，原来已经不是同一个东西了，那该如何解决？

我们先知道 session 中的每一个字段含义吧，[session 配置项详解](https://www.jb51.net/article/115048.htm)，然后看完，仍然不 ok，找了好多文章阅读，发现有那么一句话...

> express-session 在服务端默认会使用 MemoryStore 存储 Session，这样在进程重启时会导致 Session 丢失，且不能多进程环境中传递。在生产环境中，应该使用外部存储，以确保 Session 的持久性。

哭了，这次我真的哭了，介于 session 没持久化的玩意，我决定，采用 redis 了.

## 使用环境

因为从 mac 切换到了 window... (因为离职了), 那么项目从 github clone 下来之后，安装各种依赖, 包括 redis，可以看这两个 [redis 安装](https://blog.csdn.net/jason_m_ho/article/details/80007330)、[新手在 node 中使用 redis](https://segmentfault.com/a/1190000015882650)，[node 中使用 redis 缓存 session](https://www.cnblogs.com/lhyxq/p/9698914.html)

> ⚠️ 记得去 redis.conf 把密码改为 123，如果设置了新密码，需要在 config/redis 中把密码修改成新的。

1. 启动 redis

```javascript
redis - cli
```

2. 登陆

```javascript
127.0.0.1:6379> auth 123
```

然后通过 redis 、connect-redis、express-session 实现 redis 缓存 session 的骚气操作

但是你会发现，居然在 redis 中有两个 session，卧槽，这又是什么鬼，我去把 [express-session 源码](https://github.com/expressjs/session/blob/master/index.js#L405)看了一下，有这么一段代码

```javascript
if (!req.sessionID) {
  debug('no SID sent, generating session')
  generate()
  next()
  return
}
```

然后在 generate() 里边做了这个操作

```javascript
store.generate = function(req) {
  req.sessionID = generateId(req)
  req.session = new Session(req)
  req.session.cookie = new Cookie(cookieOptions)

  if (cookieOptions.secure === 'auto') {
    req.session.cookie.secure = issecure(req, trustProxy)
  }
}
```

猜测，是不是每次它都给我生成了一个新的 sessionID，不然的话，然后继续去找问题答案，在 issues 看到了这么一个问题，[generating new sessions with an asynchronous store](https://github.com/expressjs/session/issues/52) ,  嗯，了解，继续找... 然后我发现这么一个 issue !!! [Cookies disabled results in loss of session (no workaround via Header)](https://github.com/expressjs/session/issues/185), 没错，翻译过来就是 : 禁用 cookies 结果就是使得 session 丢失，进去，看看什么情况

然后看到了这么一个 comment，是这么说的:

> I have been thinking about this kind of problem recently on my own projects, I know this might not be what you are looking for but it may help others. If you have a login page which users login then send the post request to /login then on success they are sent a cookie and redirected to ie: /bounce and if their session or cookie doesn't exist redirect them to your oh no you don't have cookies enabled if they have a valid session then they are sent to the default home page...

大概意思就是，如果你有一个用户登录的登录页面，然后发送邮件请求 `/login`， 那么成功后他们会被发送一个 cookie 并重定向到 ie `/bounce`， 如果他们的会话或 cookie 不存在，ok，gg ～ 刚讲到了 IE 浏览器，于是我去写了个 demo 测试了一下，发现，谷歌浏览器不能获取和设置 cookie，IE 可以获取和设置，但是这好像不是重点，于是继续往下走

### 其他链接

- [NodeJS+Redis 实现分布式 Session 方案](https://blog.csdn.net/leeandmins/article/details/50477084)
