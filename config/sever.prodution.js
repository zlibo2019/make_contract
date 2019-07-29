var express = require('express');
var app = express();
var compression = require('compression');
var proxyMiddleware = require('http-proxy-middleware')
var history = require('connect-history-api-fallback');
app.use(compression());
app.use(express.static(__dirname));
app.middleware = [//使用代理api
  proxyMiddleware(['/api'], {target: 'http://192.168.11.103:10001',
    changeOrigin: true,
    pathRewrite: {
      '^/api' : '/',
    },}),
];
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use(history());
app.use(app.middleware);

app.listen('8080', function(error) {
  console.info("==================系统正在启动中...=============================");
  if (error) {
    console.error(error)
  } else {
    console.info("==================9999系统启动成功！！！=============================")
  }
});
