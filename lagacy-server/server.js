'use strict'

// const babelRegister = require('@babel/register')
// babelRegister({
//   ignore: [/[\\\/](dist|server\/server|node_modules)[\\\/]/],
//   presets: [['react-app', { runtime: 'automatic' }]],
//   plugins: ['@babel/transform-modules-commonjs'],
// })

const express = require('express')
const compress = require('compression')
// const router = require('./router.js')

const render = require('./render')

const app = express()

const PORT = process.env.PORT | 6070

// * .js, assets에 접근하기 위한 static path입니다.
/**
 * @example https://localhost:3000/build/static/js/main.223asd12.js 이렇게 접근 가능힙니다.
 */
app.use(express.static('build'))
app.use(express.static('public'))

// * .js파일을 요청했을 경우 4초를 기다립니다.
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    setTimeout(next, 4000)
  } else {
    next()
  }
})

// * gzip(압축) -> delate(압축해제)에 사용하는 라이브러리
app.use(compress())

app.get('/', (req, res) => {
  render(req.url, res)
})

app
  .listen(PORT, () => console.log('서버가 실행되었습니다!'))
  .on('error', (err) => {
    console.log(err)
  })

// * 참고용 주석 입니다 안보셔도 됩니다!
/**
 * compression
 * gzip(압축) -> delate(압축해제)에 사용하는 라이브러리
 * const compress = require("compression")
 * app.use(compress())
 */

/**
 * 맨 위에 있는 코드인데, webpack설정이 서버안에 있을 경우
const babelRegister = require('@babel/register');
babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});
 */
