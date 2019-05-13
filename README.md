# mmall-fe

## 项目开发过程

### 初始化项目

1. 执行 `npm init` 初始化项目
2. 创建项目目录结构

    ```bash
    src                        dist
     |---- page                 |---- resources
     |---- view      package    |---- js
     |---- utils    --------->  |---- css
     |---- service              |---- view
     |---- images
    ```

### 搭建 Webpack 脚手架

#### 初始化 Webpack

1. 全局安装 Webpack: `npm install webpack@1.15.0 -g`
2. 局部安装 Webpack: `npm install webpack@1.15.0 --save-dev`
3. 添加项目入口文件 `./src/page/index/index.js`

    ```js
    console.log("entry index/index.js");
    ```

4. 使用 Webpack 打包：`webpack ./src/page/index/index.js ./dist/app.js`, 生成 `./dist/app.js` 文件，即说明 Webpack 已正常安装
5. 简化 Webpack 打包命令：添加 Webpack 配置文件 `webpack.config.js`

    ```js
    module.exports={
        entry: './src/page/index/index.js',
        output: {
            path: './dist',
            filename: 'app.js'
        }
    }
    ```

6. 执行 `webpack` 即可完成打包

#### 处理 js 脚本

1. 使用 Webpack 自带的 `js loader`，因为 `babel-loader + babel-preset-es2015` 在 IE8 下可能带来兼容性问题
2. 配置 js 多入口

    ```js
    entry: {
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    }
    ```

3. 配置打包生成的目标文件分文件夹存放

    ```js
    output: {
        path: './dist',
        filename: 'js/[name].js'
    }
    ```

4. 引入 jQuery

    1. 使用 `npm install jquery --save` 全局安装 jQuery 模块

        ```js
        var $ = require('jquery');
        $('body').html('Hello jQuery 1');
        ```

    2. 使用 `<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>` 单页面引入

        ```js
        $('body').html('Hello jQuery 2');
        ```

    3. 在 2 的基础上 通过 `externals: {'jquery': 'window.jQuery'}`引入外部变量 / 模块

        ```js
        var $$ =require("jquery");
        $$('body').html("Hello jQuery 3")
        ```

5. 使用 `CommonsChunkPlugin` 提取公共模块（不同 js 共同引用到的模块）

    ```js
    var webpack = require('webpack');
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ]
    ```

    使用 js 全局模块来处理通用逻辑（引入全局样式，全局处理)

    ```js
    entry: {
       // 使用与 CommonsChunkPlugin 相同的名称 'common'
       // 才能将其内容导入 base.js, 否则会被正常打包成 xxx.js
        'common': ['./src/page/common/index.js']
    }
    ```

#### 处理 css 样式

- 使用 `style-loader` & `css-loader` 打包 css 文件
    1. 安装：`npm install css-loader@0.28.1 style-loader@0.17.0 --save-dev`
    2. 配置

        ```js
        module: {
            loaders: [
                { test: /\.css$/, loader: "style-loader!css-loader" }
            ]
        },
        ```

    3. 在 js 中引入 css 模块：`require('./index.css')`
- 使用 `extract-text-webpack-plugin` 单独打包（打包成独立的 css 文件，用于 html 页面以 link 方式引入)
    1. 安装；`npm install extract-text-webpack-plugin@1.0.1 --save-dev`
    2. 配置

        ```js
        var ExtractTextPlugin=require('extract-text-webpack-plugin');
        plugins: [
            new ExtractTextPlugin("css/[name].css")
        ]
        module: {
            loaders: [
                { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }
            ]
        }
        ```

#### 处理 html 模板

- 使用 `html-webpack-plugin` 打包 HTML 文件
    1. 安装：`npm install html-webpack-plugin@2.28.0 --save-dev`
    2. 配置

        ```js
        var HtmlWebpackPlugin = require('html-webpack-plugin');
        var getHtmlConfig = function (name) {
            return {
                template: './src/view/' + name + '.html',
                filename: 'view/' + name + '.html',
                inject: true,
                hash: true,
                chunks: ['common', name]
            }
        };
        plugins: [
            new HtmlWebpackPlugin(getHtmlConfig('index')),
            new HtmlWebpackPlugin(getHtmlConfig('login'))
        ]
        ```

- 在 HTML 页面中使用 `html-loader` 提取公共模块
    1. 安装：`npm install html-loader@0.4.5 --save-dev`
    2. 使用 `<%= require('html-loader!./layout/html-head.html') %>` 引入公共 HTML 页面

#### 处理 图片和字体

使用 `file-loader`+`url-loader` 处理图片和字体

1. 安装：`npm install file-loader@0.11.1 url-loader@0.5.8 --save-dev`
2. 配置

    ```js
    loaders: [
        { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
    ]
    ```

#### 安装 开发服务器

使用 `webpack-dev-server` 作为前端开发服务器，实现页面预览，并在修改 `html/css/js` 时自动刷新浏览器

1. 全局安装：`npm install webpack-dev-server@1.16.5 -g`
2. 局部安装：`npm install webpack-dev-server@1.16.5 --save-dev`
3. 启动：执行 `webpack-dev-server`
4. 默认使用 `iframe` 模式启动，使用浏览器访问 `http://localhost:8080/webpack-dev-server/dist/view`
5. 使用 `inline` 模式启动

    - 配置 `'common': ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],`
    - 启动 `webpack-dev-server --inline --port 8088`

6. 添加 `publicPath`, 指定 html 引用资源 (css/js) 的路径前缀

    ```js
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    }
    ```

    指定 publicPath 后，在 html 页面中引入资源的路径会变成 `host+publicPath+js/xxx.js`, 示例：

    ```js
    js      http://localhost:8088/dist/js/index.js
    css      http://localhost:8088/dist/css/index.css
    ```

    此时 `webpack-dev-server` 已经配置成功，编辑 `html/css/js` 的时候会自动刷新浏览器，实现页面效果的实时预览
7. 将 `config.entry.common` 中的数组元素 `webpack-dev-server/client?http://localhost:8088/` 改成使用 js （在检测到当前为开发环境时 ) 动态添加

    ```js
    var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
    if ('dev' === WEBPACK_ENV){
        config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
    }
    ```

## 项目上线过程