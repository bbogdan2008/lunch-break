const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3000,
    publicPath: 'http://localhost:3000',
    hotOnly: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Lunch break'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};