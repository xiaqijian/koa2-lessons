这个主要结合前几天的内容，做个实际案例的效果

版本：

![](https://upload-images.jianshu.io/upload_images/1379609-59b55747f236c79b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

项目结构：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-54e83f7b7a5933e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

前几天，我们把注册和登录的页面demo实现了，今天我们主要实现这么几个内容

- 注册新用户
- 判断该邮箱是否注册过
- 登录判断是否注册过
- 登录时的密码的正确

本文代码地址：https://github.com/xiaqijian/koa2-lessons/tree/master/lesson6

明天，我们将利用session实现登录状态判断

今天的这篇是在之前的代码基础上添加的，我们就晒主要的代码

1.编辑user.js
--

```
// db/user.js
const mongoose = require('./db')
const Schema = mongoose.Schema;

const ceshiSchema = new Schema({
  email: String,
  name: String,
  password: String
});

const MyModel = mongoose.model('User', ceshiSchema);


class Userdb {
  constructor () {

  }
// 查询
  query (obj = {}) {
     return new Promise((resolve, reject) => {
       MyModel.find(obj, (err, res) => {
         if(err) {
           reject(err)
         }
         resolve(res)
       })
     })
  }
queryEmail (em) {
   return new Promise((resolve, reject) => {
     MyModel.find({email: em}, (err, res) => {
       if(err) {
         reject(err)
       }
       const len = res.length
       if(len >= 1){
         // 存在
         resolve(res)
       }else {
         // 不存在
         resolve(null)
       }
     })
   })
}
// 保存
  save (obj) {
     const m = new MyModel(obj)
     return new Promise((resolve, reject)=> {
       m.save((err, res) => {
         if (err) {
           reject(err)
         }
         resolve(res)
         console.log(res)
       })
     })
     
  }
}
module.exports = new Userdb()
```
上面主要查询用户，和保存用户

2.编辑 登录注册路由
--

```
// router/index.js

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
```
3.编辑index.js
--

```
const Koa = require('koa')
const views = require('koa-views')
const statics =  require('koa-static')
const bodyparser = require('koa-bodyparser')
const path = require('path')
const router =  require('./router')
const app = new Koa()

const staticPath = './static'

app.use(statics(
  path.join(__dirname, staticPath)
))
app.use(bodyparser())

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
这个和之前的内容增加了`koa-bodyparser`对post数据的解析，利用`ctx.request.body`获取

4.启动服务
--
```
node index.js
```
打开浏览器localhost:3000

尝试去登录注册一下，打开控制台，就可以看得到相关后台返回的数据

![image.png](https://upload-images.jianshu.io/upload_images/1379609-fdb1aa4430014b81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1379609-7791eef0165bbad8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


本文结束，下次文章利用session对登录状态的判断

本文代码地址：https://github.com/xiaqijian/koa2-lessons/tree/master/lesson6







