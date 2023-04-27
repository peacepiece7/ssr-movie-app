import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import dotenv from 'dotenv'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from '../../src/App'
import { MovieProvider } from '../../src/context/movieContext'
import { getMovieDetailById } from '../../service/api'
import { ABORT_DELAY } from '../delays'

dotenv.config()

const assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
}

/**
 * @param {string} url
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export default async function renderDetail(url, req, res) {
  res.socket.on('error', (error) => {
    console.error('soket연결에 실패했습니다.\n', error)
  })
  let didError = false

  const data = {
    data: '',
  }

  const movieDetailData = await getMovieDetailById(req.query.id)

  movieDetailData.Ratings.map((rating) => {
    switch (rating.Source) {
      case 'Internet Movie Database':
        rating.SourceImage = '/imdb_icon.png'
        break
      case 'Rotten Tomatoes':
        rating.SourceImage = '/rotten_icon.png'
        break
      case 'Metacritic':
        rating.SourceImage = '/matatric_icon.png'
        break
      default:
        rating.SourceImage = '/noImage.png'
        break
    }
    return rating
  })
  data.data = JSON.stringify(movieDetailData)

  const queryClient = new QueryClient()

  const stream = renderToPipeableStream(
    <MovieProvider data={data}>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href={assets['main.css']} />
            <link rel="icon" type="image/png" href="/favicon.png" />
            <title>{`${movieDetailData.Title} Movie Infomation`}</title>
            <meta
              name="description"
              content={`movie ${movieDetailData.Title} directed by ${movieDetailData.Director} released in ${movieDetailData.Released}`}
            />
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
          {data.data && (
            <script id="__SERVER_DATA__" type="application/json">
              {data.data}
            </script>
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `assetManifest = ${JSON.stringify(assets)};`,
            }}
          />
        </html>
      </QueryClientProvider>
    </MovieProvider>,
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
