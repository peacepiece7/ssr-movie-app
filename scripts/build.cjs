const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

function bundleFrontApp(callback) {
  console.log('start bundling')
  if (process.env.NODE_ENV === 'production') {
    // production 모드일 경우 build파일을 삭제합니다. (webpack의 clean옵션이랑 같습니다.)
    rimraf.sync(path.resolve(__dirname, '../build'))
    rimraf.sync(path.resolve(__dirname, '../build-ssr'))
  }
  const config = {
    // https://webpack.kr/configuration/mode/
    mode: process.env.NODE_ENV,
    // https://webpack.kr/configuration/devtool/
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    entry: [path.resolve(__dirname, '../src/index.js')],
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.css?$/,
          exclude: [],
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.jsx?$|\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            // process.env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
    optimization: {
      minimize: true,
      minimizer: [
        // css를 최적화 해줍니다. 대부분 필요한 기능은 default값에 포함되어 있습니다.
        new CssMinimizerPlugin(),
        //js를 최적화 해줍니다. 대부분 필요한 기능은 default값에 포함되어 있습니다.
        // https://www.npmjs.com/package/terser-webpack-plugin
        new TerserPlugin(),
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
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: path.join(__dirname, '..', 'build-ssr'),
      filename: 'server.js',
    },
    module: {
      rules: [
        { test: /\.jsx?$|\.tsx?$/, use: 'babel-loader' },
        { test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg)$/, use: 'url-loader' },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
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
    console.log('Finished bundling front server\n')
  })
}

bundleFrontApp(() => bundleFrontServer())
