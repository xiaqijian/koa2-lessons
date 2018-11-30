const Router = require('koa-router')


// 
const User = require('../db/user')
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
}).post('/', async (ctx) => {
    const data = ctx.request.body
    let queryres = await User.queryEmail(data.email)
    console.log(queryres)
    if (queryres) {
        if(queryres[0].password === data.password) {
            ctx.body = {
                'code': 1,
                'data': queryres[0],
                'mesg': '登录成功'
            }
        }else {
            ctx.body = {
                'code': 0,
                'data': {},
                'mesg': '密码错误'
            }
        }
        
    }else {
        ctx.body = {
            'code': 0,
            'data': {},
            'mesg': '没有该用户，去注册吧'
        }
    }
})

const register = new Router()

register.get('/', async (ctx) => {
    let title = "注册"
    await ctx.render('register', {
        title
    })
}).post('/', async (ctx) => {
    const data = ctx.request.body
    let queryres = await User.queryEmail(data.email)
    if (queryres) {
        ctx.body = {
            'code': 0,
            'data': {},
            'mesg': '该邮箱已经存在哦'
        }
    }else {
        await User.save(data)
        ctx.body = {
            'code': 1,
            'data': {},
            'mesg': '保存成功'
        }
    }
   
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/register', register.routes(), register.allowedMethods())



module.exports = router