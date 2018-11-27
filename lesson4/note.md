这篇教程主要介绍koa2构建服务器，简单引用

本教程的版本：要格外注意版本号

![image.png](https://upload-images.jianshu.io/upload_images/1379609-a1e416b4facf2a89.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

案例：简单利用koa2搭建服务器
--

#### 文件夹结构：

![](https://upload-images.jianshu.io/upload_images/1379609-acd3bcd167b1b086.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码
```
// index.js

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000)

console.log('localhost:3000')

```
利用`node index.js`就可以启动了，在浏览器中输入localhost:3000

源码地址：https://github.com/xiaqijian/koa2-lessons/tree/master/lesson1

本片就结束了

推荐node项目工具
--

- 编辑器   visualstudio [下载](https://code.visualstudio.com/)
- 用yarn代替npm [下载](https://yarnpkg.com/zh-Hans/docs/install)
