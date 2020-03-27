const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    // 即使HMR没有成功，也不要自动刷新页面
    hotOnly: true
  },
  module: {
    rules: [
      {
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
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          "presets": [
            ["@babel/preset-env", {
              "targets": {
                "chrome": "67"
              },
              "useBuiltIns": "usage"
            }]
          ]
        }
      }]
  },
  output: {
    // 会根据entry中main： ‘文件’的main来作为name，[name]是占位符
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}