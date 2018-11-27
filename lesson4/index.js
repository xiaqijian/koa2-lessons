const Koa = require('koa')
const Router =  require('koa-router')
const app = new Koa()


// 子路由1
const home = new Router()

home.get('/', async (ctx) => {
    ctx.body = "home pages"
})


// 子路由2
const page = new Router()

page.get('/404', async (ctx) => {
    ctx.body = '404 pages'
})


const login = new Router()

login.get('/', async (ctx) => {
    ctx.body = 'login pages'
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())



app.listen(3000, () => {
    console.log('localhost:3000')
})

