'use strict'

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');



const devMode = process.env.NODE_ENV === 'development'; // 是否是开发模式
// console.log(devMode);
// console.log(process.env.NODE_ENV);
const glob = require('glob');
const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    entry: path.resolve(process.cwd(),'src/main.js'),
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webCli',
            template: path.resolve(process.cwd(), 'src/index.html')
        }),
        //每次打包💰自动清空dist文件夹
        new CleanWebpackPlugin(),
        //从js中抽离css
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:7].css',
            chunkFilename: "[id].css"
        }),
        //删除无用的css代码 (有问题 打包之后将有用的css也都删除了)
        // new PurgeCSSPlugin({
        //     paths: glob.sync(`${PATHS.src}/**/*`),
        // }),
        //动态添加CDN
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {   // 引入的模块
        //             module: 'jquery',
        //             // cdn的地址
        //             entry: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
        //             // 挂载到了window上的名称
        //             // window.jQuery就可以全局使用
        //             global: 'jQuery'
        //         },
        //         {
        //             module: 'vue',
        //             entry: 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        //             global: 'Vue'
        //         }
        //     ]
        // })
    ],
    optimization:{
        minimize:true,
        minimizer:[
            //压缩css
            new CssMinimizerWebpackPlugin(),
        ],
        splitChunks: { //抽取公共代码
            cacheGroups: {
                vendor: {//抽取第三方模块
                    name:"chunk-vendors",
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1,
                    test: /node_modules/,
                    priority: 1
                },
                utils: { //抽取公共模块
                    name:"chunk-common",
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                }
            }
        },
    },
    externals: {
        'jquery': '$'
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[ devMode ? 'style-loader': MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: ['vue-loader']
            },
        ]
    }
}