const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const webpack = require("webpack")
const path = require("path")
const Dotenv = require("dotenv-webpack")
let exclude = [/node_modules/, /dist/]
let webExclude = [...exclude, /server.tsx/, /routes/]

module.exports = [
  {
    target: "web",
    entry: "./index",
    mode: "production",
    node: {__dirname: false, fs: "empty"},
    output: {filename: "script.[hash:8].js", chunkFilename: "script.[hash:8].js", path: path.resolve(__dirname, "./dist")},
    resolve: {extensions: [".js", ".jsx", ".ts", ".tsx"], alias: {"react-dom$": "react-dom/profiling", "scheduler/tracing": "scheduler/tracing-profiling"}},
    performance: {hints: false},
    optimization: {minimize: true, minimizer: [new TerserJSPlugin({extractComments: false}), new OptimizeCSSAssetsPlugin()], namedModules: true},
    module: {
      rules: [
        {test: /\.(jpe?g|png|gif|webp|svg|mp3|wav|mp4|webm|ttf|otf|pdf)$/, exclude: webExclude, use: [{loader: "file-loader", options: {name: "[path][name].[ext]"}}]},
        {test: /\.(txt|sql)$/, exclude: webExclude, use: ["raw-loader"]},
        {test: /\.html$/, exclude: webExclude, use: [{loader: "html-loader", query: {minimize: false}}]},
        {test: /\.css$/, exclude: webExclude, use: [{loader: MiniCssExtractPlugin.loader, options: {hmr: true}}, "css-loader"]},
        {test: /\.less$/, exclude: webExclude, use: [{loader: MiniCssExtractPlugin.loader, options: {hmr: true}}, "css-loader", {loader: "less-loader"}]},
        {test: /\.(tsx?|jsx?)$/, exclude: webExclude, use: [{loader: "ts-loader", options: {transpileOnly: true}}]}
      ]
    },
    plugins: [
      new Dotenv(),
      new ForkTsCheckerWebpackPlugin({typescript: {memoryLimit: 8192}}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles.[hash:8].css",
        chunkFilename: "styles.[hash:8].css"
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./index.html"),
        minify: false
      })
    ]
  }, 
  {
  target: "node",
    entry: "./server",
    mode: "production",
    node: {__dirname: false},
    externals: [nodeExternals()],
    output: {filename: "server.js", chunkFilename: "server.js", path: path.resolve(__dirname, "./dist")},
    resolve: {extensions: [".js", ".jsx", ".ts", ".tsx"]},
    performance: {hints: false},
    optimization: {minimize: true, minimizer: [new TerserJSPlugin({extractComments: false})], namedModules: true},
    module: {
      rules: [
        {test: /\.(jpe?g|png|webp|gif|svg|mp3|wav|mp4|webm|ttf|otf|pdf)$/, exclude, use: [{loader: "file-loader", options: {name: "[path][name].[ext]"}}]},
        {test: /\.(txt|sql)$/, exclude, use: ["raw-loader"]},
        {test: /\.html$/, exclude, use: [{loader: "html-loader", query: {minimize: false}}]},
        {test: /\.css$/, exclude, use: [{loader: MiniCssExtractPlugin.loader, options: {hmr: true}}, "css-loader"]},
        {test: /\.less$/, exclude, use: [{loader: MiniCssExtractPlugin.loader, options: {hmr: true}}, "css-loader", {loader: "less-loader"}]},
        {test: /\.(tsx?|jsx?)$/, exclude, use: [{loader: "ts-loader", options: {transpileOnly: true}}]}
      ]
    },
    plugins: [
      new Dotenv(),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles.[hash:8].css",
        chunkFilename: "styles.[hash:8].css"
      })
    ]
  }
]