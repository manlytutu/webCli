'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode:'production',
    plugins:[
        //抽离css
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:7].css',
            chunkFilename: "[id].css"
        }),
        //压缩css
        new OptimizeCssAssetsPlugin(),
    ],
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
}