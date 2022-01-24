const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { title } = require("process");
const { template } = require("lodash");
const { inject } = require("async");
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    host: "localhost",
    port: 8000,
    open: true,
    watchFiles: "index.html",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard",
      template: "./index.html",
      inject: "body",
      favicon: "./favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
