const webpack = require('webpack');
const merge = require('webpack-merge');
const prodConfig = require('./webpack.config');

module.exports = merge(prodConfig, {
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:'"development"',
                release: '"test"'
            }
        })//即时设定路径值
    ]
})