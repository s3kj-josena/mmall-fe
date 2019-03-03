'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name){
    return {
        // 目标文件是dist/view/[name].html
        filename : 'view/'+name+'.html',
        // 模板的路径
        template : './src/view/'+name+'.html',
        // 自动注入
        inject : true,
        hash : true,
        chunks : ['common',name]
    }
}
var configs = {
    entry : {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js']
    },
    output : {
        path : __dirname+'/dist/',
        publicPath : '/dist/',
        filename : 'js/[name].js'
    },
    externals : {
        'jquery':'window.jQuery'
    },
    resolve : {
        alias : {
            util    : __dirname + '/src/util',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image',
            page    : __dirname + '/src/page'
        }
    },
    module : {
        loaders : [
            {test: /\.css$/, loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?limit=100&name=resource/[name].[ext]'}
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
}
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = configs;