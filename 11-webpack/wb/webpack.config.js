const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry入口
  entry: {
    // 文件名:路径
    index: './src/index.js',
    print: './src/print.js',
  },
  // map地图
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    // open: {
    //   app: {
    //     name: 'chrome'
    //   }, // 指定浏览器打开，可设置为'firefox'等浏览器名称。
    // },
    // port: 5005, // 指定端口号。
  },
  // plugins插件
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Custom template',
      // template模板   可根据此文件夹src下的index.html模版生成html
      template: "./src/index.html",
      title: 'Development',
      browser: 'chrome',
    }),
  ],
  // output出口
  output: {
    // 修改出口文件名
    // filename: 'xxx.js',
    // filename: 'main.js',

    // 这里的[name]会自动对成入口的的文件名
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // clean打扫    每次编译前都会清理dist
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};