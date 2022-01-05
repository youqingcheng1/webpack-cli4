//配置公共入口和内置模块providePlugin
const webpack = require('webpack');
const path = require('path');
const entryData = {};
const entryPage = [
    {
        name:'main',
        main:'./src/js/main.js',
    },
    {
        name:'index',
        index:'./src/js/index.js',
    },
    {
        name:'test',
        test:'./src/js/test.js',
    }
]
entryPage.forEach((i)=>{
    for(let r in i){
        if(r!=='name'){
            entryData[r] = i[r]
        }
    }
})

function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
    //打包多页面
    entry: entryData,
    entryPage,
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            fullpage: 'fullpage.js/dist/jquery.fullpage.js', //全屏滚动插件
            pluginData:[resolve('../src/js/pluginData.js'),'default'] //以插件形式注入数据
        })//自动加载模块，而不必到处 import 或 require
    ]
}