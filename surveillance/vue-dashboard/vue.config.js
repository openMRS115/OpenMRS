const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Timestamp = new Date().getTime();

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				path.resolve(__dirname, 'src/assets/css/index.less'), //全局引入的less文件
			],
		})
}

module.exports = {
	configureWebpack: {
		output: {
			filename: `js/[name].${Timestamp}.js`,
			chunkFilename: `js/[name].${Timestamp}.js`
		},
		externals: {
			'vue' : 'Vue',
			'vue-router':'VueRouter',
			'element-ui': 'ELEMENT'
		}
	},

	filenameHashing: false,
	lintOnSave: true,
	// 是否使用包含运行时编译器的Vue核心的构建
	runtimeCompiler: false,
	// 默认情况下 babel-loader 忽略其中的所有文件 node_modules
	transpileDependencies: [],
	// 生产环境 sourceMap
	productionSourceMap: false,
	// All options for webpack-dev-server are supported
	// https://webpack.js.org/configuration/dev-server/
	devServer: {
		open: false,
		host: '0.0.0.0',
		port: 8088,
		https: false,
		hotOnly: true,
		overlay: {
			warnings: true,
			errors: false
		},
		disableHostCheck: true,
		proxy: "http://localhost:8080", 
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:8080',
		// 		ws: true,
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'^/api': '/'
		// 		}
		// 	}
		// }
	},
	css: {
		extract: false
	},
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
	},

	configureWebpack: {
		// Object.assign(config, {
		// 开发生产共同配置
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@c': path.resolve(__dirname, './src/components'),
			} // 别名配置
		},
		plugins: [
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			// 下面是下载的插件的配置
			new CompressionWebpackPlugin({
				algorithm: 'gzip',
				test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
				threshold: 10240,
				minRatio: 0.8
			}),
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 20,
				minChunkSize: 100
			})
		]
		// })
	}

};
