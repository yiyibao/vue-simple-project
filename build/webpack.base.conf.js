const {
	resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const publicPath = ''

module.exports = {
	entry: {
		vendor: './src/vendor',
		index: ['babel-polyfill', './src/main.js']
	},
	output: {
		path: resolve(__dirname, '../dist'),
		filename: 'static/js/[name][hash].js',
		chunkFilename: '[id].js?[chunkhash]',
		publicPath: publicPath
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader',
						sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
				}
			},
			{
				test: /\.js$/,
				use: [
					'babel-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						root: resolve(__dirname, 'src'),
						attrs: ['img:src', 'link:href']
					}
				}]
			},
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src'), resolve('test')],
				options: {
					// formatter: require('eslint-friendly-formatter'),
					// 不符合Eslint规则时只警告(默认运行出错)
					// emitWarning: !config.dev.showEslintErrorsInOverlay
				}
			},
			{
				test: /favicon\.png$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]'
					}
				}]
			},
			{
				test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				exclude: /favicon\.png$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'static/img/[name].[ext]?[hash]'
					}
				}]
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	externals: { // 抽离第三方库
		/* "vue":"window.Vue",
		  "vue-router":"window.VueRouter"*/
	},
	resolve: {
		alias: {
			'~': resolve(__dirname, '../src/components')
		}
	}

}