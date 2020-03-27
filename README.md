## Webpack是什么&环境搭建

是模块打包工具，对于不同的JS模块引入方式，Webpack都可以识别和翻译

开始的Webpack只能对js进行处理，现在已经能对很多文件进行处理了

[关于JS模块化](https://juejin.im/post/5c17ad756fb9a049ff4e0a62)



```bash
# 安装webpack & cli
yarn add webpack webpack-cli -D
# 使用npx查看当前环境的webpck版本
npx webpack -v
```



## 初步使用

```js
// index.js
import Content from './content'
import Header from './header'

new Content()
new Header()

// header.js
export default function header() {
  const dom = document.getElementById('root')
  const ele = document.createElement('div')
  ele.innerText = 'header'
  dom.append(ele)
}

// content.js
export default function Content() {
  const dom = document.getElementById('root')
  const ele = document.createElement('div')
  ele.innerText = 'content'
  dom.append(ele)
}
```



通过webpack进行打包

`npx webpack index.js`

![image-20200319205726424](http://picbed.sedationh.cn/image-20200319205726424.png)

## 使用Webpack的配置文件

```js
// webpack.config.js

const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  }
}
```

![image-20200319210633710](http://picbed.sedationh.cn/image-20200319210633710.png)

`path: path.resolve(__dirname, 'bundle')`使得输出文件夹为web pack.config.js所在文件夹中的bundle文件夹



如果需要指定用其他的配置文件来进行打包如other.config.js

则使用`npx webpack --config other.config.js`即可



另外，在package.json 中的 script中添加 默认调用了npx可以使用node_modules中的相关指令

![image-20200319212304847](http://picbed.sedationh.cn/image-20200319212304847.png)

后，可以在命令行使用`yarn bundle` 进行快速打包

![image-20200319212402230](http://picbed.sedationh.cn/image-20200319212402230.png)

### 补充

![image-20200319213912654](http://picbed.sedationh.cn/image-20200319213912654.png)

要解决这个，添加mode即可 dev & pro 只是压缩与否的区别

```js
// webpack.config.js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

![image-20200319214221051](http://picbed.sedationh.cn/image-20200319214221051.png)

提示中main的由来看enrty的完全书写形式



## Loader

对于除了js文件以外的文件导入，如果还需要导入其他类型文件，就需要在config中配置Loader

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.png$/,
      use: {
        loader: 'file-loader'
      }
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

![image-20200320102054821](http://picbed.sedationh.cn/image-20200320102054821.png)



### file-loader

https://webpack.js.org/loaders/file-loader/



如果想要对打包生成的文件名字进行配置,产生文件的位置配置	

```js
module: {
    rules: [{
      test: /\.png$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images'
        }
      }
    }]
  },
```

![image-20200320104457376](http://picbed.sedationh.cn/image-20200320104457376.png)

其他具体看文档

### url-loader

Url-loader可以实现file-loader的所有功能，并加强

图片可以被转化为base64不需要再进行图片文件请求，但是js文件变大了

![image-20200320110011348](http://picbed.sedationh.cn/image-20200320110011348.png)

权衡下

对于图片文件的导入可以设置limit限制图片大小，如小于20kb，进行base64转换，否者正常文件导入

```js
module: {
    rules: [{
      test: /\.png$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
          limit: 20480
        }
      }
    }]
  },
```



### 通过loader引入样式

config中有配置

注意，loader的配置是有顺序的，**从下到上，从右到左**

```js
module: {
    rules: [{
      test: /\.png$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
          limit: 20480
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
```

css-loader帮助我们合并相互@import的css文件为一个文件，style-loader将这个文件挂载到head上

![image-20200320112756359](http://picbed.sedationh.cn/image-20200320112756359.png)



如果我们要使用sass

https://webpack.js.org/loaders/sass-loader/

![image-20200320120054121](http://picbed.sedationh.cn/image-20200320120054121.png)



## plugin使用

可以让webpack运行在某个时刻自动执行，插件放的顺序无所谓



### HtmlWebpackPlugin

https://webpack.js.org/plugins/html-webpack-plugin/



可以按照需要自动在dist目录中生成index,可以在参数中配置生成文件的模版，再在模版的基础上添加`<script src="bundle"></script>`



### Clean plugin for webpack

https://github.com/johnagan/clean-webpack-plugin



把原来的文件先清除再生成



## SourceMap

https://webpack.js.org/configuration/devtool/#devtool

Choose a style of [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) to enhance the debugging process. These values can affect build and rebuild speed dramatically.



简单来说，source-map是用来建立文件映射的（src文件与dist文件），方便在进行代码纠错



通过

![image-20200325165141061](http://picbed.sedationh.cn/image-20200325165141061.png)

可以控制source-map的模式

常见的前缀与其含义

1. 无前缀 'source-map'  同级生成'main.js.map'文件进行映射关系构建
2. inline 'inline-source-map' 不生产map文件，直接在main.js通过加入base64直接构建映射关系
3. cheap 'cheap-inline-source-map' 
   1. 不需要告诉我在哪一列出了问题，只用告诉我行数
   2. 不需要告诉我出了src业务代码之外的问题(第三方使用，loader，etc.)
4. modlue 'cheap-module-inline-source-map' 告诉我src+以外的问题
5. eveal 'eveal' 在导出文件中通过eveal语句构建映射   =>  比较快，可能会出问题



![image-20200325170141530](http://picbed.sedationh.cn/image-20200325170141530.png)



❤️❤️❤️最佳实践



if dev => `eval-cheap-module-source-map`

If pro => `cheap-module-source-map`





## 实现打包自动化与文件变动监控

### 方法一  Command Line Interface

https://webpack.js.org/api/cli/#watch-options



![image-20200326154714932](http://picbed.sedationh.cn/image-20200326154714932.png)



这样修改了源文件，在浏览器中进行刷新即可，不需要再进行手动bundle



### 方法二 Node Interface

https://webpack.js.org/api/node/



通过与express搭配，在node中自己实现热更新



参考代码

在`webpack.config.js`同级目录下创建

server.js

```js
const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware("webpack-dev-middleware")
const config = require("./webpack.config.js")
const compier = webpack(config)

const app = express()

app.use(webpackDevMiddleware(compier));

app.listen(3000,() => {
  console.log('server start at port 3000')
})
```



### 方法三 DevServer (推荐)❤️

https://webpack.js.org/configuration/dev-server/



先要安装，然后配置

```json
"scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server"
  },
```



⚠️没有dist文件生成了，直接放在了内存里，加快了打包速度



在`webpack.config.js`中进行进一步的配置

![image-20200326160749894](http://picbed.sedationh.cn/image-20200326160749894.png)



## Hot Module Replacement 热模块更新



### 应用场景一 CSS样式调试，防止页面频繁刷新

在更改css文件后，因为文件更改，webpack会自动刷新整个页面，但是使用HMR

![image-20200326164810215](http://picbed.sedationh.cn/image-20200326164810215.png)

### 应用场景二 模块化开发JS

改变Num的值，不会影响已经因为点击修改的上方数字的值

![image-20200326171618592](http://picbed.sedationh.cn/image-20200326171618592.png)



### 具体配置

在`webpack.config.js`中

```js
// 引入包
+const webpack = require('webpack')

devServer: {
    port: 3000,
    open: true,
+   hot: true,
    // 即使HMR没有成功，也不要自动刷新页面
+    hotOnly: true
  },
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
+   new webpack.HotModuleReplacementPlugin()
  ]
```



其实css的HMR也需要进行配置，不过因为相关loader在底层自己实现了，react也是类似的

## Babel 配置

### 正常业务场景（影响全局环境）

https://babeljs.io/setup#installation



```
yarn add -D babel-loader @babel/core @babel/preset-env
```

前两个是bable转换的基础 第三个是一个对于ES2015+转换的预设

相关的配置

1. 要么在webpack中,对module -》 rules添加新的test规则

```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    "presets": [
      ["@babel/preset-env", {
        "targets": {
        	// 如果高于这个浏览器版本就让浏览器自己支持，不进行转换
          "chrome": "67"
        },
        "useBuiltIns": "usage"
      }]
    ]
  }
}
```

2. 要么在webpack.config.js同级目录下创建`.babelrc`文件

```
{
  "presets": ["@babel/preset-env"]
}
```



注意到，对于balel中presets的设置，是把预设变为[a preset,{}]再在后面的对象里进行配置



这个时候，箭头函数等等之类的就会变成function...



但是map、 Promise之类的还是没有变,引入**polyfill**来解决

https://babeljs.io/docs/en/babel-polyfill

```
yarn add @babel/polyfill
```



再在index.js中`import "@babel/polyfill";`

通过`"useBuiltIns": "usage"`可以按需求倒入



这是不按需的

![image-20200327162143751](http://picbed.sedationh.cn/image-20200327162143751.png)



按需的



![image-20200327162229496](http://picbed.sedationh.cn/image-20200327162229496.png)



### 开发第三方库、类库、UI组件库的时候，闭包注入



https://babeljs.io/docs/en/babel-plugin-transform-runtime



```
yarn add -D @babel/plugin-transform-runtime
```

因为cores : 2

```
yarn add @babel/runtime-corejs2
```



配置

.babelrc

```
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
        "version": "7.0.0-beta.0",
      }
    ]
  ]
}
```

