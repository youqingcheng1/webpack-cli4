//配置生产环境，用于线上
const path = require("path");
const merge = require("webpack-merge");//合并文件
const base = require("./base");
const uglify = require("uglifyjs-webpack-plugin");//打包js
const htmlPlugin = require("html-webpack-plugin");//;打包html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取单独css
const CleanWebpackPlugin = require('clean-webpack-plugin');//删除重复打包的文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css
const { entryPage } = require('./entrydata');
const entryData = [];
entryPage.forEach((i) => {
    entryData.push(new htmlPlugin({
        minify: {
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            collapseWhitespace: true
        },
        chunks: [i['name']],
        filename: i['name'] === 'index' ? `index.html` : i['name'] === 'main' ? `m/index.html` : `m/landscape/index.html`,
        template: `src/htl/${i['name']}.html`
    }))
})

//cdn资源路径
var website = {
    publicPath: process.env.NODE_ENV === 'production' ? 'https://mnweb.mini1.cn/activity/minishopping/404/' : "http://mall-test.miniworldstory.com/404/"
}

module.exports = merge(base, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash].js',
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import')(),
                                require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] })
                            ]
                        }
                    }
                ]
            },//打包css，加后缀
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,// 小图转成base64
                        name: 'images/[name].[hash].[ext]',
                    }
                }],
            },//打包图片
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },//ES6转ES5
            {
                test: /\.(htm|html)$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-original', ':src']
                    }
                }
            },//自定义打包html图片
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",//输出文件的名
            chunkFilename: "css/[name].[contenthash].css",
        }),//提取单独css文件包
        new CleanWebpackPlugin({
            root: path.join(__dirname, "../"),
            verbose: false,
            dry: false
        }),//清除release
        new uglify({
            test: /\.js(\?.*)?$/i,
            // extractComments: true,//开启注释
            sourceMap: true,
        }),//提取js文件包，但webpack4，内部自提取
        // new htmlPlugin({
        //     minify: {
        //         minifyCSS: true,
        //         minifyJS: true,
        //         removeComments: true, //移除HTML中的注释
        //         collapseWhitespace: true // 删除空白符与换行符
        //     },
        //     chunks: ['main'],
        //     filename: 'htl/main.html',//输出的html名，也可以直接配置带有子目录。
        //     template: 'src/htl/main.html'//为新生成的index.html指定模版
        // }),//提取html包，可配置多个页面
        ...entryData,
        new OptimizeCssAssetsPlugin()
    ]

})