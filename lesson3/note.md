这篇教大家如何使用模板引擎

这里我们使用ejs模板引擎做 个例子，你们自己选择自己熟练的模板引擎

使用的版本：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-7a3616b7f9a29042.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

文件夹目录结构：

![image.png](https://upload-images.jianshu.io/upload_images/1379609-3f92e43bc0b2e007.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.编写index.js
--

```
const Koa = require('koa')
const views =  require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
  }))
  
app.use( async ( ctx ) => {
    let title = 'hello koa2'
    await ctx.render('index', {
      title,
    })
})

app.listen(3000, () => {
  console.log('localhost:3000')
})

```

2.编写/views/index.ejs
--
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>index</title>
</head>
<body>
    <h2>views index</h2>
    <h1><%= title %></h1>
</body>
</html>
```
3.启动服务
--

```
node index.js
```
4.打开浏览器
--
![image.png](https://upload-images.jianshu.io/upload_images/1379609-ffca1174809dd73d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们想要的结果就出来了

后记
--
- koa-views 源码及文档：https://github.com/queckezz/koa-views
- koa-views 支持模板引擎列表：https://github.com/tj/consolidate.js#supported-template-engines


