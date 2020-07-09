'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '致 Souler 一封信'

const port = process.env.port || process.env.npm_config_port || 4489

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
    // externals: {
    //   'rough': 'rough'
    // }
  }
}
