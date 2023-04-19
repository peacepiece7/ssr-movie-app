const express = require('express')
const render = require('./render')
const router = express.Router()

router.get('/TEST', (req, res) => {
  console.log('req.url : ', req.url)
  res.send('Hello, world!')
})

router.get('/', (req, res) => {
  console.log('일단 제발 되라...!!!!!!!')
  render(req.url, res)
})

module.exports = router
