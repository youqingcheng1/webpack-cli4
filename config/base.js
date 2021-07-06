//配置公共入口和内置模块providePlugin
const webpack = require('webpack');

module.exports = {
    //打包多页面
    entry: {
        main: [
            // 'fullpage.js/dist/fullpage.js',
            './src/css/main.css',
            './src/js/main.js'
        ],
        index: [
            './src/css/index.scss',
            './src/js/index.js'
        ],
        test: [
            './src/css/test.css',
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