var path = require('path');
var webpack = require('webpack');

module.exports = {
	devServer: {
		inline: true,
		contentBase: './html',
		port: 3000
	},
	devtool: 'source-map',
	entry: ['./dev/ts/index.tsx', './dev/scss/index.scss'],
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.scss']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
	output: {
		path: 'html',
		filename: 'js/bundle.min.js'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"jquery": "jQuery",
		"redux": "Redux",
		"react-redux": "ReactRedux",
		"bootstrap": "Bootstrap"
	}
};