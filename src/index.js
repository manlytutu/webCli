#!/usr/bin/env node
'use strict'

const commander = require('commander');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const commonConfig = require('./webpack.common.config');
const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');


const defaultDevConfig = merge(commonConfig, devConfig);
const defaultProdConfig = merge(commonConfig, prodConfig);

commander
    .usage('<command>')
commander
    .command('dev')
    .description('project is running at http://10.8.27.168:8088')
    .action(()=>{
        const devServerOptions = defaultDevConfig.devServer;
        WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, devServerOptions);

        const compiler = Webpack(defaultDevConfig);
        const devServer = new WebpackDevServer(compiler, devServerOptions);
        devServer.listen(8088);
    })
commander
    .command('build')
    .action(()=>{
        Webpack(defaultProdConfig, function (err, stats) {
        if (err) {
          throw err
        }
        if (stats.hasErrors()) {
          console.log('[Lovely-CLI]', stats.toString());
        }
        process.stdout.write(stats.toString({
              colors: true,
              modules: false,
              children: false,
              chunks: false,
              chunkModules: false
            }) + '\n\n')
        });
    })


commander.parse(process.argv)