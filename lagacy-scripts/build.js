/**
 * ! 해당 스크립트 파일은 참고용으로 남겨둔 파일입니다. 안보셔도 됩니다!
 * 서버가 실행 될 때 번들링이 동시에 진행되는 스크립트 입니다.
 * package.json의 scripts를 아래와 같이 구성하고 해당 파일을 실행합니다.
 *
 * "scripts" : {
 *  "start:prod": "concurrently \"npm run server:prod\" \"npm run bundler:prod\"",
 *  "bundler:dev": "cross-env NODE_ENV=development nodemon -- scripts/build.js",
 *  "bundler:prod": "cross-env NODE_ENV=production nodemon -- scripts/build.js",
 *  ...Rest of scripts
 * }
 */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'
rimraf.sync(path.resolve(__dirname, '../build'))
webpack(
  {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry: [path.resolve(__dirname, '../src/index.js')],
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      process.exit(1)
      return
    }
    const info = stats.toJson()
    if (stats.hasErrors()) {
      console.log('Finished running webpack with errors.')
      info.errors.forEach((e) => console.error(e))
      process.exit(1)
    } else {
      console.log('Finished running webpack.')
    }
  },
)
