全局安装
npm i less  -g
npm install supervisor -g
默认全局安装路径`C:\Users\xxx\AppData\Roaming\npm\node_modules`
整个电脑只有一个

本地安装 
安装到当前的项目的根目录（终端的当前目录）每个项目的同一个依赖的版本可能不一样

项目依赖
npm i vue 
npm i vue --save
npm i vue -S

开发依赖
npm i vue --save-dev
npm i vue -D


<!-- 偷懒(不正确的用法) express依赖安装到全局 -->
<!-- 只能使用 CJS引入方式 ESM不行 -->
<!-- 配置  -->
<!-- 此电脑 右键 属性 高级系统设置 环境变量-->
<!--
用户变量 新增 
NODE_PATH  
C:\Users\xxx\AppData\Roaming\npm\node_modules
-->
