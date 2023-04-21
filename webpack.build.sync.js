const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function bundleFrontApp(cb) {
  webpack(
    {
      mode: process.env.NODE_ENV,
      devtool: process.env.NODE_ENV ? 'source-map' : 'cheap-module-source-map',
      entry: [path.resolve(__dirname, '../src/index.js')],,
      output: {
        path: path.resolve(__dirname, 'build-ssr'),
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
      if (stats.hasErrors()) {
        console.error(err)
        const info = stats.toJson()
        info.errors.forEach((e) => console.error(e))
        process.exit(1)
      } else {
        console.log('Finished running front app bundiling.')
        cb()
      }
    },
  )
}

function bundleFrontServer() {
  webpack(
    {
      mode: process.env.NODE_ENV,
      entry: './server/server.js',
      target: 'node',
      externals: [nodeExternals()],
      output: {
        path: path.resolve(__dirname, 'build-ssr'),
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
      if (stats.hasErrors()) {
        console.error(err)
        const info = stats.toJson()
        info.errors.forEach((e) => console.error(e))
        process.exit(1)
      } else {
        console.log('Finished running front server bundiling.')
      }
    },
  )
}

rimraf.sync(path.resolve(__dirname, './build'))
bundleFrontApp(() => {
  // bundleFrontServer()
})
