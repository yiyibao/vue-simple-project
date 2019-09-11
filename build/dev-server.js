var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');

let webpackConfig = require('./webpack.dev.config');

Object.keys(webpackConfig.entry).forEach(function (name, i) {
    webpackConfig.entry[name] = ['webpack-hot-middleware/client', __dirname + '/dev-client'].concat(webpackConfig.entry[name])
})


let compiler = webpack(webpackConfig);

compiler.plugin('compilation', function (compilation) {//webpack编译完成
    //在这个插件合成出页面之后，添加一个回调，调用中间件emit一个action为reload的事件，对应另一边client订阅的事件，实现浏览器的刷新
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        // cb()
    })
});


var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    noInfo: true,
    stats: {
        colors: true
    }
});

var hotMiddleware = webpackHotMiddleware(compiler);


const express = require('express');
const app = express();
const port = 8080;
app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static('public'));

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        var url = 'http://localhost:' + port;
        console.log("listening on  %s", url);
    }
})
