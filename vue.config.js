const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page'
    }
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://crm-dev.wechatify.net/',
        changeOrigin: true
      }
    }
  },
  publicPath: '/',
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/'))
      .set('styles', resolve('src/styles'))
  }
}
