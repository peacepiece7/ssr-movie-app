import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import dotenv from 'dotenv'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from '../../src/App'
import { ABORT_DELAY } from '../delays'
/**
 * * react-router-dom ssr, csr
 * * StaticRouter(서버 라우터) == BrowserRouter(클라이언트 라우터)
 */

dotenv.config()

const assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
}

/**
 *
 * @param {string} url
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export default async function renderHome(url, req, res) {
  res.socket.on('error', (error) => {
    console.error('soket연결에 실패했습니다.\n', error)
  })
  let didError = false

  /**
   * @description react 18이전엔 아래와 같이 사용했습니다.
   * @example import {renderToString} from 'react-dom/server';
   *  res.send(
   *   '<!DOCTYPE html>' +
   *   renderToString(
   *     <DataProvider data={data}>
   *       <App assets={assets} />
   *     </DataProvider>,
   *   )
   */

  const queryClient = new QueryClient()

  const stream = renderToPipeableStream(
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={assets['main.css']} />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <title>MOVIE DATABASE</title>
          <meta
            name="description"
            content="Currently over 280,000 posters, updated daily with resolutions up to 2000x3000."
          />
          <meta name="Keywords" content="movie, episode, serise, omdb, movie poster,movie plot" />
        </head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<b>Enable JavaScript to run this app.</b>`,
            }}
          />
        </body>
        <div id="root">
          <StaticRouter location={url}>
            <App assets={assets} />
          </StaticRouter>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)};`,
          }}
        />
      </html>
    </QueryClientProvider>,
    {
      // SSR시 bootstrapScripts를 지정해줘야 서버에서 js파일을 먼저 로드합니다.
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        // Streaming이 시작 되기전 에러가 발생한다면 이 곳에서 error code를 접근합니다.
        res.statusCode = didError ? 500 : 200
        // 한글을 사용하기 떄문에 utf-8로 Content-type을 설정합니다.
        res.setHeader('Content-type', 'text/html;charset=UTF-8')
        stream.pipe(res)
      },
      onError(x) {
        didError = true
        console.error(x)
      },
    },
  )
  // 충분한 시간이(현제 10초) 지나면 SSR을 포기하고 CSR으로 전환합니다.
  setTimeout(() => stream.abort(), ABORT_DELAY)
}

/*
STREAM SSR 패칭 전략입니다.
데이터 패칭 시 서버 컴포넌트가 Promise<pending>을 반환하면 Resolve될 떄 까지 비동기적으로 기다리다가, 패칭이 완료되고 랜더링 되면 hydration을 진행합니다.

function createDelay() {
    let done = false
    let promise = null
    let testData = ''
    return {
      read() {
        if (done) {
          return testData
        }
        if (promise) {
          throw promise
        }
        promise = new Promise((resolve) => {
          getSearchMovies().then((res) => {
            testData = res
            done = true
            resolve()
          })
          setTimeout(() => {
            done = true
            promise = null
            testData = 'foo'
            resolve()
          }, 9000)
        })
        throw promise
      },
    }
  }
  */
