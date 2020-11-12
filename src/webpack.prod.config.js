'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode:'production',
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename: "[id].css"
        })
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