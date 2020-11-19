const Webpack = require('webpack');
const commonConfig = require('../src/webpack.common.config');
const prodConfig = require('../src/webpack.prod.config');
const { merge } = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

async function prodAction(name,options){
    var defaultProdConfig = merge(commonConfig, prodConfig);
    if(options.progress || options.p){
        defaultProdConfig = merge(defaultProdConfig,{
            plugins:[new ProgressBarPlugin({
                format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                clear: false,
                complete: chalk.green.bold("█"),
                incomplete: chalk.white.bold("█"),
                callback:function(){
                    console.log('打包中......');
                }
            })]
        })
    }
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
}

module.exports = (...args) => {
    return prodAction(...args).catch(err => {
      error(err)
    })
}