const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const url = require('url')
const packageConfig = require('../package.json')
const webpack = require('webpack')
const NotifierPlugin = require('webpack-notifier')
const path = require('path')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new NotifierPlugin({
      title: '编译完成...',
      alwaysNotify:true,
      contentImage: path.join(__dirname, './logo.png')
    })
  ]
})