const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const url = require('url')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const packageConfig = require('../package.json')
const path = require('path')
const notifier = require('node-notifier')
var ICON = path.join(__dirname, 'logo.png')

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
  devServer: {
    host: '127.0.0.1',
    port: 8808,
    quiet: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        // secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse('/assets/').pathname
    }
  },
  devtool: '#eval-source-map',
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://127.0.0.1:8808`],
        notes: []
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const filename = error.file && error.file.split('!').pop()
        notifier.notify({
          title: "Webpack error",
          message: severity + ': ' + error.name,
          subtitle: filename || '',
          icon: ICON
        });
      }
    })
  ]
})