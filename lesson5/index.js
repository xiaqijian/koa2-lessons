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

