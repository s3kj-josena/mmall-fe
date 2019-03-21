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
        favicon  : './favicon.ico',
        // 自动注入
        inject : true,
        hash : true,
        chunks : ['common',name]
    }
}
var configs = {
    entry : {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
        'register' : ['./src/page/register/index.js'],
        'pass-reset' : ['./src/page/pass-reset/index.js'],
        'pass-update' : ['./src/page/pass-update/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'cart' : ['./src/page/cart/index.js'],
        'list' : ['./src/page/list/index.js'],
        'detail' : ['./src/page/detail/index.js'],
        'order-confirm' : ['./src/page/order-confirm/index.js'],
        'order-list' : ['./src/page/order-list/index.js'],
        'order-detail' : ['./src/page/order-detail/index.js'],
        'payment' : ['./src/page/payment/index.js'],
        'result' : ['./src/page/result/index.js']
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
            node_modules    : __dirname + '/node_modules',
            util    : __dirname + '/src/util',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image',
            page    : __dirname + '/src/page'
        }
    },
    module : {
        loaders : [
            {test: /\.css$/, loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?limit=100&name=resource/[name].[ext]'},
            {test:/\.string$/,loader: 'html-loader'}
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        new HtmlWebpackPlugin(getHtmlConfig('register')),
        new HtmlWebpackPlugin(getHtmlConfig('pass-reset')),
        new HtmlWebpackPlugin(getHtmlConfig('pass-update')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center')),
        new HtmlWebpackPlugin(getHtmlConfig('cart')),
        new HtmlWebpackPlugin(getHtmlConfig('list')),
        new HtmlWebpackPlugin(getHtmlConfig('detail')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail')),
        new HtmlWebpackPlugin(getHtmlConfig('payment')),
        new HtmlWebpackPlugin(getHtmlConfig('result')),
    ]
}
// if('dev' === WEBPACK_ENV){
//     config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
// }

module.exports = configs;