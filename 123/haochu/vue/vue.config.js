// 跨域配置
module.exports = {
    devServer: {
        port: 80,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:9090',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    }
}
