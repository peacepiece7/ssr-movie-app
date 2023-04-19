import express from 'express'
import React from 'react'
import { renderToString, renderToPipeableStream } from 'react-dom/server'
// import { MovieProvider } from '../context/MovieProvider'
// import { BrowserRouter } from 'react-router-dom'
import App from '../layouts/App'

const router = express.Router()

async function createDummyMoviesAPI() {
  console.log('서버에서 영화 정보 가저오는 중...')
  return new Promise((res) =>
    setTimeout(() => {
      res([
        { title: 'foo', description: 'bar' },
        { title: 'barz', description: 'fredo' },
      ])
    }, 2000),
  )
}

router.get('/', async (req, res) => {
  let didError = false
  res.socket.on('error', (err) => {
    console.error('FATAL', err)
  })

  const movieData = await createDummyMoviesAPI()
  console.log('서버 movieData :', movieData)
  // 프로세스가 하나니까 App컴포넌트를 랜더링하는것은 Suspense랑 상관없음! App안에 있는 모든 컴포넌트를 html로 랜더링 함 (상태를 가질 수 없음???)
  const stream = renderToPipeableStream(
    <App assets={'<h3>아직 없습니다요</h3>BrowserRouter'} data={movieData}></App>,
    {
      // bootstrap = 현재 상황에서 어떻게든 한다., 사물의 초기 단계에서 단순 요소로부터 복잡한 체계를 구축하는 과정
      // bootstrapScripts: ['/main.js'],
      onShellReady() {
        res.statusCode = didError ? 500 : 200
        res.setHeader('Content-type', 'text/html; charset=utf-8')
        stream.pipe(res)
      },
      onError(err) {
        didError = true
        console.error('칙쇼!' + err)
      },
    },
  )

  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), 10000)
})

export default router
