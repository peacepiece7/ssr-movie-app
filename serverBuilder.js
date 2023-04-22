const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'
rimraf.sync(path.resolve(__dirname, '../build'))
webpack(
  {
    mode: 'production',
    entry: '../server/server.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, './build-ssr'),
      filename: 'server.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
        patterns: [{ from: './build', to: '.' }],
      }),
    ],
  },
  (err) => {
    if (err) {
      console.log(err)
    }
    process.exit()
  },
)
