这篇是将前几天的内容做个综合，运用koa静态文件处理，路由，模板引擎

我的版本：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-ce22f1ab09c0a3a5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

项目结构是这样子的：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-a6ce25608fc27873.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.写路由控制
--
```
// router/index.js

const Router = require('koa-router')


// 子路由1
const home = new Router()

home.get('/', async (ctx) => {
    let title = '首页'
    await ctx.render('index', {
        title
    })
})


// 子路由2
const page = new Router()

page.get('/404', async (ctx) => {
    let title = "404"
    await ctx.render('err', {
        title
    })
})


const login = new Router()

login.get('/', async (ctx) => {
    let title = "登录"
    await ctx.render('login', {
        title
    })
})

const register = new Router()

register.get('/', async (ctx) => {
    let title = "注册"
    await ctx.render('register', {
        title
    })
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())

module.exports = router
```
2.写ejs
--

这个自个写就可以，随意，想看我写的，可以看开头的源码地址

![image.png](https://upload-images.jianshu.io/upload_images/1379609-47b09258132c4adf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3.index.js编写
--
```
// index.js

const Koa = require('koa')
const views = require('koa-views')
const statics =  require('koa-static')
const path = require('path')
const router =  require('./router')
const app = new Koa()

const staticPath = './static'

app.use(statics(
  path.join(__dirname, staticPath)
))

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
  }))

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())



app.listen(3000, () => {
    console.log('localhost:3000')
})

```
4.启动服务
--
```
node index.js
```
打开浏览器：localhost:3000

![image.png](https://upload-images.jianshu.io/upload_images/1379609-d8d2a2301ffc96c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### `localhost:3000/login`

![](https://upload-images.jianshu.io/upload_images/1379609-01785ca71280533e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### `localhost:3000/register`

![image.png](https://upload-images.jianshu.io/upload_images/1379609-3ba5cf92b82973e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这篇就结束了，下一篇文章，将利用MongoDB，综合起来，实现一个登陆注册功能


