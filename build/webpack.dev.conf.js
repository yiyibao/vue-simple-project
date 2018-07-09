const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const url =require('url')
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
		host: '127.0.0.1',
		port: 8808,
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
	devtool:'#eval-source-map'
})