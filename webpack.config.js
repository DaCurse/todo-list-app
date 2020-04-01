const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, use: 'babel-loader' },
			{
				test: /\.s?(a|c)?ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
