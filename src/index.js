#!/usr/bin/env node
'use strict'
const command = process.argv[2];
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const commonConfig = require('./webpack.common.config');
const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');

const defaultDevConfig = merge(commonConfig, devConfig);
const defaultProdConfig = merge(commonConfig, prodConfig);


if (command === 'dev') {
    const devServerOptions = defaultDevConfig.devServer;
    WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, devServerOptions);

    const compiler = Webpack(defaultDevConfig);
    const devServer = new WebpackDevServer(compiler, devServerOptions);
    devServer.listen(8088);

} else if (command === 'build') {
    console.log(defaultProdConfig);
    Webpack(defaultProdConfig, function (err, stats) {
        if (err) {
          throw err
        }
        if (stats.hasErrors()) {
          console.log().log('[Lovely-CLI]', stats.toString());
        }
        process.stdout.write(stats.toString({
              colors: true,
              modules: false,
              children: false,
              chunks: false,
              chunkModules: false
            }) + '\n\n')
      });

} else {
    console.log('I am a lovely CLI.')
}