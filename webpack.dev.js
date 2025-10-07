const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      // Переопределяем обработку CSS для разработки
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "src"), // ← отдаём статику из src/
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 8080,
    hot: true, // HMR встроен в Webpack 5, плагин не нужен
  },
  // HotModuleReplacementPlugin НЕ нужен в Webpack 5!
});
