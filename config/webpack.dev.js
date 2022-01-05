//配置开发环境，用于本地起服务
const path = require("path");
const htmlPlugin = require('html-webpack-plugin');
const { entry, entryPage, plugins } = require("./base.js");
const merge = require("webpack-merge");
const entryData = [];
entryPage.forEach((i) => {
    entryData.push(new htmlPlugin({
        chunks: [i['name']],
        filename: `${i['name']}.html`,
        template: `src/htl/${i['name']}.html`
    }))
})

module.exports = merge({ entry, plugins }, {
    mode: "development",//生产环境
    output: {
        path: path.resolve(__dirname, './src'),
        filename: 'js/[name].js'
    },//输出口
    devtool: 'inline-source-map',//bundle.js错误跟踪
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
            },
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
                        limit: 10000,
                        name: 'images/[name].[ext]',
                        // publicPath: website.publicPath + 'images'
                    }
                }],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src']//html图片输出
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }//ES6转ES5
        ]
    },//loader模块
    plugins: [
        ...entryData
    ],//插件
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        host: 'localhost',
        hot: true,
        inline: true,
        compress: true,//一切服务都启用 gzip 压缩
        open: true,
        port: 1213
    },
    watchOptions: {
        ignored: /node_modules/
    }
})

