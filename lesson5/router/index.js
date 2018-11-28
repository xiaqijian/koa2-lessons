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