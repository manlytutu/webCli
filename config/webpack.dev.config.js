'use strict'
const Webpack = require('webpack');
const path = require('path');

function getIPAdress() {
    var interfaces = require('os').networkInterfaces()
    for (var devName in interfaces) {
      var iface = interfaces[devName]
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
}
module.exports = {
    mode:'development',
    devtool: 'inline-source-map',
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(process.cwd(), 'dist'), //配置DevServer HTTP服务器的文件根目录；把项目根目录下的dist文件夹设置成DevServer HTTP服务器的文件根目录。
        hot: true,//是否启用热模块替换功能
        host: getIPAdress(),//配置DevServer HTTP服务器监听的地址；如果你想要局域网中其他设备访问你本地的服务，可以在启动的时候带上--host 0.0.0.0；host的默认值是127.0.0.1即只有本地可以访问DevServer的HTTP服务
        port: 8088,//配置DevServer服务监听的端口
        clientLogLevel:'none',//设置禁止在控制台显示热更新的调试信息
        open:true, //用于在 DevServer 启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。 同时还提供 devServer.openPage 配置项用于打开指定 URL 的网页。
    }
}