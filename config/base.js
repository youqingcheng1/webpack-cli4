//配置公共入口和内置模块providePlugin
const webpack = require('webpack');

module.exports = {
    //打包多页面
    entry: {
        main: [
            './src/js/main.js'
        ],
        index: [
            './src/js/index.js'
        ],
        test: [
            './src/js/test.js'
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            // template: 'art-template/lib/template-web.js',
            fullpage: 'fullpage.js/dist/jquery.fullpage.js',
        })//自动加载模块，而不必到处 import 或 require
    ]
}