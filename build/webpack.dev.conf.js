const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const url =require('url')
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
var ICON = path.join(__dirname, 'logo.png')

const config={
  host: '127.0.0.1',
  port:8808
}


module.exports = merge(baseWebpackConfig, {
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
		host: config.host,
    port: config.port,
    quiet:true,
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
  plugins:[
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${config.host}:${config.port}`],
        notes: []
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        const filename = error.file && error.file.split('!').pop()
        notifier.notify({
          title: "Webpack error",
          message: severity + ': ' + error.name,
          subtitle: filename || '',
          icon: ICON
        });
      }
    })
  ],
	devtool:'#eval-source-map'
})