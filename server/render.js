import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from '../src/App'
import { MovieProvider } from '../src/context/data'
import { getSearchMovies } from '../service/api.js'
import { API_DELAY, ABORT_DELAY } from './delays'

let assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
}

export default async function render(url, res) {
  // The new wiring is a bit more involved.
  res.socket.on('error', (error) => {
    console.error('Fatal', error)
  })
  let didError = false
  // const data = createServerData()
  // url.query
  const searchData = await getSearchMovies()
  const stringifySearchData = JSON.stringify(searchData)
  const stream = renderToPipeableStream(
    <MovieProvider data={stringifySearchData}>
      <App assets={assets} />
      <script id='__SERVER_DATA__' type='application/json'>
        {stringifySearchData}
      </script>
    </MovieProvider>,
    {
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        // If something errored before we started streaming, we set the error code appropriately.
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
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), ABORT_DELAY)
}

// Simulate a delay caused by data fetching.
// We fake this because the streaming HTML renderer
// is not yet integrated with real data fetching strategies.
function createServerData() {
  let done = false
  let promise = null
  return {
    read() {
      if (done) {
        return
      }
      if (promise) {
        throw promise
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true
          promise = null
          resolve()
        }, API_DELAY)
      })
      throw promise
    },
  }
}
