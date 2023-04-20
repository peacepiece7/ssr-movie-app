const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

const isProdMode = process.env.NODE_ENV === 'production' ? true : false

/**
 * webpack = js만 해석가능
 * babel => .js해석
 * babel/react => 바벨이 .jsx해석
 * babel 최종 => ./js변환
 * 바벨이 변환한 최종.js들 => build 이동
 */
module.exports = {
  resolve: {
  
    extensions: ['.js', '.jsx'], // 확장자가 생략되어 있으면 얘네가 있는지 확인해봐!
    // alias: {
    //   '@': path.resolve(__dirname, 'src'),
    // },
  },
  // https://webpack.kr/configuration/mode/
  mode: isProdMode ? 'production' : 'development',
  // https://webpack.kr/configuration/devtool/
  devtool: isProdMode ? 'source-map' : 'eval',
  entry: './src/index.js',
  output: {
    clean: true, // 새로 빌드해줘 (예전 빌드결과 중 이름이 다른 폴더가 안사라지는 문제가 생김)
    path: path.resolve(__dirname, 'build'),
    // filename: 'hahahoho.js',
  },
  module: {
    rules: [
      // * babel-loader Rule
      // npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/runtime-corejs3
      {
        // 있나없나 테스트해보고 있으면 babel-loader 사용 (Regex => .jsx || .js로 끝나는 경우)
        test: /\.jsx?$/,
        // 개발 모드에서 node_modules하위 항목을 styling할 수 없다는 NOTE가 떠서 제외했습니다.
        exclude: /node_modules/,
        // 내가 설정한 플로그인을 사용해줘
        use: 'babel-loader',
      },

      // * SCSS Rule
      /*
      {
        test: /\.s?css?$/, // .css, .scss일 경우
        // sass => sass를 해석, sass-loader => sass를 css로, css-loader => css를 해석, style-loader => css를 html에 연결
        use: ['style-loader', 'css-loader', 'sass-loader'], // 배열의 마지막부터 해석됨  
      },
      */
      // .png .jpg등 정적파일을 js에서 불러오려면 file-loader인데 webpack에 흡수됨
      // * Static Assets Copy Rule
      /*
      {
        test: /\.(png|jpe?g|svg|webp|gif)$/,  // jpeg => 제이펙
        type: 'asset/resource', // 여기 경로를 지정하면 webpack내부에서 정적파일을 처리함
      },
      */
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: './src/index.html',
    }),

    // * Satic Assets Copy Plugin
    /**
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
    */
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  devServer: {
    port: 6060,
    // historyApiFallback: true, // 라우터(페이지) 관리, 히스토리 모드(html5모드)
    /**  
      historyApiFallback: { // hashRouter모드도 있음!
      index: 'index.html',
    },
    proxy: {
      '/api/': {
        target: 'http://localhost:6060',
        changeOrigin: true,
      },
    },
    */
  },
}
