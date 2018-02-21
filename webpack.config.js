'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, '/client/entry.js'),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
	},
  module: {
    rules: [{
      test: /(\.js$|\.jsx$)/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              'env'
            ],
          },
        }
      ]
    }, {
      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      use: 'file-loader',
    }, {
      test: /\.(mp4|webm)$/,
      use: 'url?limit=10000'
    }, {
      test: /(\.scss$|\.css$)/,
      use: [
        "style-loader",
        "css-loader?modules&importLoaders=1" + "&localIdentName=[path][local]__[hash:base64:5]",
        "sass-loader"
      ]
    }],
  }
};
