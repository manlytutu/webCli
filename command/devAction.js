const Webpack = require('webpack');
const commonConfig = require('../config/webpack.common.config');
const devConfig = require('../config/webpack.dev.config');
const WebpackDevServer = require('webpack-dev-server');
const { merge } = require('webpack-merge');

const defaultDevConfig = merge(commonConfig, devConfig);
const devServerOptions = defaultDevConfig.devServer;

WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, devServerOptions);
const compiler = Webpack(defaultDevConfig);
const devServer = new WebpackDevServer(compiler, devServerOptions);
devServer.listen(8088);