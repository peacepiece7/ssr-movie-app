import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import './tailwind.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTIme: 1000 * 60 * 5,
    },
  },
})

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App assets={window.assetManifest} />
    </QueryClientProvider>
  </BrowserRouter>,
)
