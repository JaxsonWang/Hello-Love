const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const PublicPath = '/'; // 项目目录，顶级目录默认为 `/`， 如果部署项目路径为多级项目则需要设置项目路径，例如本站实例 `https://i95.me/hello-sm`，那么这里设置为 `/hello-sm/`

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : PublicPath,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: '来自 Souler 一封信',
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        rough: "rough",
        "window.rough": "rough",
        Typed: "Typed",
        "window.Typed": "Typed"
        // jQuery: "jquery",
        // "window.jQuery": "jquery",
      })
    ]
  },
  chainWebpack: config => {
    config.externals({
      'rough': 'rough',
      'Typed': 'Typed',
    })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
        ]
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('src/styles/sm.scss'),
      ]
    }
  }
};
