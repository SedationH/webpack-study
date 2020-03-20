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



