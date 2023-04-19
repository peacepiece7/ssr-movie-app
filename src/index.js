import React from 'react'
// import { BrowserRouter } from 'react-router-dom'
import App from './layouts/App.jsx'

import { hydrateRoot, createRoot } from 'react-dom/client'
const app = document.getElementById('root')
const root = createRoot(app)

// * 첫 로딩시 /src/index.html을 보냄 -> js load(hydration) -> 부분 부분 채워줌
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
// hydrateRoot(
//   document,
//   <BrowserRouter>
//     <App assets={window.assetManifest} />
//   </BrowserRouter>,
// )
