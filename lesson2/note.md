这篇主要介绍koa2处理静态文件的中间件

用到的版本：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-24f483b95d83c29e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

项目的结构：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-644bf9d77c0e79ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

大家可以往static文件夹里面添加点东西

编辑index.js
--

```
const Koa = require('koa')
const statics = require('koa-static')
const path = require('path')
const app = new Koa()

const staticPath = './static'

app.use(statics(
  path.join(__dirname, staticPath)
))

app.use(async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000)

console.log('localhost:3000')
```

启动服务器
--
```
node index.js

```

然后在浏览器访问：http://localhost:3000/images/node.png

可以看到：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-380e521725c69916.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

或者访问其他静态文件，都可以访问了

源码地址：[https://github.com/xiaqijian/koa2-lessons/tree/master/lesson2](https://github.com/xiaqijian/koa2-lessons/tree/master/lesson2)


