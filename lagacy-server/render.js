import * as React from 'react'
import { renderToPipeableStream } from 'react-dom/server'

// import { MovieProvider } from '../src/context/MovieProvider.jsx'
import App from '../src/layouts/App.jsx'

// In a real setup, you'd read it from webpack build stats.
let assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
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
        console.log('4초 후 api data를 반환합니다.')
        setTimeout(() => {
          done = true
          promise = null
          resolve()
        }, 4000)
      })
      throw promise
    },
  }
}

module.exports = function render(url, res) {
  res.soket.on('error', (error) => {
    console.log('socket 연결 실패! 개망! ㅠㅠ')
    console.error('Fatal', error)
  })
  let didError = false
  const data = createServerData()
  const stream = renderToPipeableStream(<App assets={assets} data={data}></App>, {
    bootstrapScripts: [assets['main.js']],
    onShellReady() {
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200
      res.setHeader('Content-type', 'text/html')
      stream.pipe(res)
    },
    onError(x) {
      didError = true
      console.error(x)
    },
  })
}
/**
 * If you dont want to render using SSR that should be write follow code like :
 * import { renderToString } from 'react-dom/server'
 *
 * This is how you would write it up previously :
 * exports = function render(url, res) {
 * res.send(
 *   '<!DOCTYPE html>' +
 *   renderToString(
 *     <DataProvider data={data}>
 *       <App assets={assets} />
 *     </DataProvider>,
 *   )
 * );
 * }
 */
