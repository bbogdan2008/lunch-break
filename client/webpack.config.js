const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, "src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        }, "eslint-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    publicPath: "http://localhost:3000",
    hotOnly: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      title: "Lunch break"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
