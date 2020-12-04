'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode:'production',
    devtool: 'source-map',
    plugins:[
        //从js中抽离css
        //热更新针对的是js文件，如果在开发环境将css从js中抽离出来，样式文件更新后不会刷新页面，所以在生产环境中将css文件抽出来
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:7].css',
            chunkFilename: "[id].css"
        }),
    ],
    module:{
        rules:{
            test:/\.css$/i,
            use:[MiniCssExtractPlugin.loader,'css-loader']
        }
    }
}