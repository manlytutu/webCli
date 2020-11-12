'use strict'

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(process.cwd(),'src/main.js'),
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webCli',
            template: path.resolve(process.cwd(), 'index.html')
        }),
        new CleanWebpackPlugin(),
        
    ],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
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
            }
        ]
    }
}