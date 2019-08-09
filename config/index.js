
// Template version: 1.2.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/httpApi': {
        // target: 'http://10.0.0.110:28096/bepf/',
        // target: 'http://10.0.0.95:8096/bepf/',
        // target: 'http://wxk12test.xknow.net/web/bepf/',
        // target: 'http://10.0.0.100:28096/bepf/',
        target: 'http://10.1.0.16:7001',//赵李波
        // target: 'http://10.1.0.27:7000',//刘悦
        // target: 'http://10.0.0.95:7000',//臧云吉
        // target: 'http://weds.xknow.net',//臧云吉
        // target: 'http://10.1.0.8:7002',//张茂杰
        // target: 'http://10.0.0.102:8096/bepf/',
        // target: 'http://10.1.0.26:8096/bepf/',//衣龙辉
        // target: 'http://10.1.0.11:5001',//方小强
        // target: 'http://10.3.0.25:8096/bepf/',//吴晓龙
        // target: 'http://10.1.0.11:8091/bepf/',//方小强
        // target: 'http://10.11.0.6:8096/bepf/',//孙晓明
        // target: 'http://10.0.0.96:30067/bepf/',//服务地址
        // target: 'https://apigateway.weds.com.cn/web/v1/bepf/',//服务地址 阿里云
        // target: 'https://edu.weds.com.cn/web/v1/bepf/',//服务地址  七牛云
        // target: 'http://47.105.91.125:8096/bepf/',//服务地址
        changeOrigin: true,
        pathRewrite: {
          '^/httpApi': ''
        }
      },
      '/nodeApi': {
        // target: 'http://wxk12test.xknow.net/node/',
        target: 'http://10.1.0.27:7000',
        changeOrigin: true,
        pathRewrite: {
          '^/nodeApi': ''
        }
      }
    },

    // Various Dev Server settings
    host: '10.1.0.16', // can be overwritten by process.env.HOST    localhost
    port: 8092, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    proxyTable: {},
    /**
     * Source Maps
     */

    productionSourceMap: false,//关闭source-map 默认是true
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin  //这个是最新版本
    // 偶尔会出现安装失败的问题，可以安装低版本  npm install --save-dev compression-webpack-plugin@1.1.11
    productionGzip: true, //使用gzip压缩，默认是false
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
