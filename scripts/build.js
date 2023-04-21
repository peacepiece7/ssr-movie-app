const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')

function bundleFrontApp(callback) {
  rimraf.sync(path.resolve(__dirname, '../build'))
  const config = {
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
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
  }
  webpack(config, (err, stats) => {
    if (stats.hasErrors()) {
      console.error(err)
      const info = stats.toJson()
      info.errors.forEach((e) => console.error(e))
      process.exit(1)
    }
    console.log('Finished bundling front React App')
    callback()
  })
}

function bundleFrontServer() {
  const config = {
    mode: process.env.NODE_ENV,
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
  }
  webpack(config, (err, stats) => {
    if (stats.hasErrors()) {
      console.error(err)
      const info = stats.toJson()
      info.errors.forEach((e) => console.error(e))
      process.exit(1)
    }
    console.log('Finished bundling front server')
  })
}

bundleFrontApp(() => bundleFrontServer())
