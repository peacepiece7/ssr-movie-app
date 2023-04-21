/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict'

const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')

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
          test: /\.jsx?$|\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  (err, stats) => {
    console.log('fe bundling done!')
    if (stats.hasErrors()) {
      const info = stats.toJson()
      info.errors.forEach((e) => console.error(e))
      process.exit(1)
    }
    webpack(
      {
        mode: isProduction ? 'production' : 'development',
        entry: path.join(__dirname, '..', 'server', 'server.js'),
        target: 'node',
        externals: [webpackNodeExternals()],
        output: {
          path: path.join(__dirname, '..', 'build-ssr'),
          filename: 'server.js',
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        module: {
          rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg)$/, use: 'url-loader' },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
          ],
        },
        plugins: [
          new webpack.ProvidePlugin({
            React: 'react',
          }),
          new MiniCssExtractPlugin(),
          new CopyPlugin({
            patterns: [{ from: 'build', to: '.' }],
          }),
        ],
      },
      (err, stats) => {
        console.log('server bundling is done!')
        if (stats.hasErrors()) {
          const info = stats.toJson()
          info.errors.forEach((e) => console.error(e))
          process.exit(1)
        }
        console.log('server is successfully bundled')
        return
      },
    )
  },
  // (err, stats) => {
  //   if (err) {
  //     console.error(err.stack || err)
  //     if (err.details) {
  //       console.error(err.details)
  //     }
  //     process.exit(1)
  //     return
  //   }
  //   const info = stats.toJson()
  //   if (stats.hasErrors()) {
  //     console.log('Finished running webpack with errors.')
  //     info.errors.forEach((e) => console.error(e))
  //     process.exit(1)
  //   } else {
  //     console.log('Finished running webpack.')
  //   }
  // },
)
