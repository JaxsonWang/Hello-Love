const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/sm/' : '/',
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
