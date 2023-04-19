import path from 'path'
import fs from 'fs'

import express from 'express'
// import compression from 'compression'
import router from './router.js'

const __dirname = path.resolve()
const PORT = process.env.PORT || 6060
const app = express()

// todo : add server security and monitoring logic like margan, helmet ...

// app.use(compression())
// delay serving js to demonstrate streaming HTML, wait for 4 second
// app.use((req, _res, next) => (req.url.endsWith('.js') ? setTimeout(next, 4000) : next()))

app.use(express.static('build-ssr'))

app.use('/', router)

app
  .listen(PORT, () => {
    console.log(`Listen at ${PORT}`)
  })
  .on('error', (err) => {
    console.log(err)
    // todo : ... rest of exception error logic
  })
