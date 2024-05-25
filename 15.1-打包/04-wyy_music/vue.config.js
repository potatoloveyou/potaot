const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 可以使用cmd打开vue ui 配置publicPath(打包后的文件夹路径)和outputDir(打包后的文件夹名)
  publicPath: './',
  outputDir: 'xxx'
})
