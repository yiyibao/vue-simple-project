var ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
	module: {
		rules: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!sass-loader'
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'static/css/[name][hash].css',
			disable: false,
			allChunks: true
		})
	],
	devtool: '#source-map'
})