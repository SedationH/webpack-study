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

