const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const url = require('url')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const packageConfig = require('../package.json')
const path = require('path')
const notifier = require('node-notifier')
var ICON = path.join(__dirname, 'logo.png')

var host = '0.0.0.0'; 

const prot = 8080

var interfaces = require('os').networkInterfaces();  

for(var devName in interfaces){  
    var iface = interfaces[devName];  
    for(var i=0;i<iface.length;i++){  
       var alias = iface[i];  
       if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
      host = alias.address;  
       }  
    }  
}


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
    host: '0.0.0.0',
    port: prot,
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
  devtool: '#source-map',
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://0.0.0.0:${prot}`],
        notes: [`Your application is also running here: http://${host}:${prot}`]
      },
      clearConsole: true,
      onErrors: (severity, errors) => {}
    })
  ]
})
