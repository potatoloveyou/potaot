webpack中文官网
https://www.webpackjs.com/guides/installation/#local-installation

1.webpack中文官网-指南-安装

<!-- 强烈建议安装到本地，因为每个项目使用的各种依赖版本不一，安装全局可能不能使用 -->
npm install less 本地安装（安装到当前目录，加.g是安装到全局）
npm uninstall less 删除一个本地依赖


本地安装(注意！:文件夹名称最好不要与项目的名称相同)

(1)初始化项目，生成package.json文件，-y是默认所有配置都yes
package.json用于存放项目的配置信息，比如项目名称、版本、依赖等。
npm init -y

(2)安装webpack
(-S  --save 项目依赖
-D  --sava-dev  开发依赖)
npm install --save-dev webpack

(3)若安装的是webpack v4+，还需要安装 CLI。
npm install --save-dev webpack-cli

(4)访问本地webpack
./node_modules/.bin/webpack     或=> npx webpack




2.webpack中文官网-指南-起步
(1)在文件夹中创建一个名为src的文件夹，并在其中创建一个名为index.js的文件。
(2)剩下跟着步骤走


结论:
/scr/index.js   入口文件,webpack根据配置文件中的其他规则进行打包。
/dist/main.js   打包后的文件,webpack入口文件的打包结果。


(3)使用配置文件
webpack.config.js用于存放webpack的配置信息，比如入口文件、输出文件、loader、插件等。
根目录下新建文件webpack.config.js

const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};


3.webpack中文官网-指南-资源管理
(1)加载CSS


可以在package.json的scripts中添加一个命令，例如： "build": "webpack" ，这样就可以通过 npm run build 命令来执行webpack打包操作。


(2)使用webpack打包less(关闭less插件)
新建/src/style.less
在index.js中添加引入文件    import './style.less'
安装依赖less    npm install less less-loader --save-dev
在webpack.config.js中的   module{rules[  {xxxx}  ]}    添加依赖规则

(3)加载图像




4.webpack中文官网-指南-管理输出
index.html中添加    <script src="./print.bundle.js"></script>
在webpack.config.js中的entry入口添加    对应入口




5.(重点！！！)设置 HtmlWebpackPlugin    自动生成html插件
(1)至此，我们的dist文件夹内可永远在编译前不保留任何东西，完全靠webpack生成

(2)生成模版index.html
HtmlWebpackPlugin仓库源码
在src中创建新index.html




6.使用 source map(类似于less的map作用)
3.webpack中文官网-指南-开发环境-使用source map




7.使用观察模式(可以每次更改后不用再跑编辑)
第一种:"watch": "webpack --watch"   若是在文件夹中打开html必须要刷新一下才能更新
第二种:安装server依赖
npm install --save-dev webpack-dev-server
npm start     (让项目跑起来)
第三种:












