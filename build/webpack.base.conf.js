const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const publicPath = '/'
const enterdir = process.argv.splice(2)[0]

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
module.exports = {
	entry: {
		index: ['webpack-hot-middleware/client?noInfo=true&reload=true', './module/' + enterdir + '/main.js'],
		vendor: ['webpack-hot-middleware/client?noInfo=true&reload=true', './module/' + enterdir + '/vendor.js']
	},
	output: {
		path: resolve(`dist/${enterdir}`),
		filename: `static/js/[name][hash].js`,
		chunkFilename: `static/js/[id][chunkhash].js`,
		publicPath: publicPath
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				include: [resolve('src'), resolve('test'), resolve('module')],
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
				include: [resolve('src'), resolve('test'), resolve('module')],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						root: resolve('/'),
						attrs: ['img:src', 'link:href']
					}
				}]
			},
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src'), resolve('test'), resolve('module')],
				exclude: /node_modules/,
				options: {
					formatter: require('eslint-friendly-formatter'),
					//不符合Eslint规则时只警告(默认运行出错)
					emitWarning: true
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
						name: `static/img/[name].[ext]?[hash]`
					}
				}]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: `media/[name].[ext]?v=[hash:7]`
				}
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.SplitChunksPlugin({
			chunks: "all",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolve(`module/${enterdir}/index.html`),
			inject: true
		}),
		new VueLoaderPlugin()
	],
	externals: { // 抽离第三方库
		"vue": "window.Vue",
		"vue-router": "window.VueRouter"
	},
	resolve: {
		alias: {
			'~': resolve('module/Test/components')
		},
		extensions: [' ', '.js', '.vue', '.json', '.html'],
	}


}