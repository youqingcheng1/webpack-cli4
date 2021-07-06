//配置公共入口和内置模块providePlugin
const webpack = require('webpack');
const { entryPage } = require('./entrydata');

const entryData = {};
entryPage.forEach((i)=>{
    for(let r in i){
        if(r!=='name'){
            entryData[r] = i[r]
        }
    }
})

module.exports = {
    //打包多页面
    entry: entryData,
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            // template: 'art-template/lib/template-web.js',
            fullpage: 'fullpage.js/dist/jquery.fullpage.js',
        })//自动加载模块，而不必到处 import 或 require
    ]
}