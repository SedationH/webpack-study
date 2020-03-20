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
    },{
      test: /\.scss$/,
      use: ['style-loader','css-loader','sass-loader']
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}