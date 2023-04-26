import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import dotenv from 'dotenv'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from '../../src/App'
import { MovieProvider } from '../../src/context/movieContext'
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

export default async function renderAbout(url, req, res) {
  res.socket.on('error', (error) => {
    console.error('soket연결에 실패했습니다.\n', error)
  })
  let didError = false

  const data = {
    data: '',
  }

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
            <title>About</title>
            <meta name="description" content="hello, world!" />
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
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        res.statusCode = didError ? 500 : 200

        res.setHeader('Content-type', 'text/html;charset=UTF-8')
        stream.pipe(res)
      },
      onError(x) {
        didError = true
        console.error(x)
      },
    },
  )
  setTimeout(() => stream.abort(), ABORT_DELAY)
}
