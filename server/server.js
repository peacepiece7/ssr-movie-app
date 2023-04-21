import express from 'express'
import compress from 'compression'
import render from './render'
import { JS_BUNDLE_DELAY } from './delays'

const PORT = process.env.PORT || 4000
const app = express()

// .js파일 로드시간늦춰서 ssr을 확인해 보기 위한 코드입니다.
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    setTimeout(next, JS_BUNDLE_DELAY)
  } else {
    next()
  }
})

// Content-Encoding : gzip을 설정하고, 웹 서버에서 클라이언트에게 보낼 파일을 압축합니다.
// 2023/04/21기준 (커밋 확인) main.js 파일 용량이 148kb에서 48kb로 줄었습니다.
app.use(compress())

// * Home 페이지로 이동합니다.
app.get('/', (req, res, next) => {
  // todo : 이 곳에 hOME페이지에서 render를 요청했다는 코드가 들어가야합니다. 그래야 페이지마다 SSR이 가능합니다.
  render(req.url, res)
})
app.use(express.static('build'))
app.use(express.static('public'))

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`)
  })
  .on('error', (err) => {
    console.error(err)
  })

/**
 * 예제에서 사용하던 바벨 설정입니다.
 * 서버가 실행될 때 commjs방식(require)으로 react-app을 변환시킬 때 사용하는 후크입니다.
 * 잘 이해가 안되지만 server/render.js에서 리엑트 문법을 쓰고 있는데 이 부분을 cjs방식으로 변경해주는 것이 아닐까 생각합니다.
 * 일단 없어도 잘 동작해서 지웠습니다.
 import babelRegister from '@babel/register'
 babelRegister({
   ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
   presets: [['react-app', { runtime: 'automatic' }]],
   plugins: ['@babel/transform-modules-commonjs'],
 })
*/
/**
 * 아래 코드는 https://codesandbox.io/s/kind-sammet-j56ro?file=/server/render.js:692-870에서 참고한 코드입니다.
 * 제가 작성한 코드가 아니고, 에러를 처리하는 패턴이 좋아서 주석으로 남겨놓았습니다.
app.get(
  '/',
  handleErrors(async function (req, res) {
    await waitForWebpack()
    render(req.url, res)
  }),
)
function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      return await fn(req, res)
    } catch (x) {
      next(x)
    }
  }
}
async function waitForWebpack() {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, '../build/main.js'))
      return
    } catch (err) {
      console.log('Could not find webpack build output. Will retry in a second...')
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}
app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`)
  })
  .on('error', function (err) {
    console.error(err)
    if (error.syscall !== 'listen') {
      throw error
    }
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe)
    const bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  })

 *  */
