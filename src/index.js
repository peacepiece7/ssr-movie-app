import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import './tailwind.css'

const queryClient = new QueryClient()
hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App assets={window.assetManifest} />
    </QueryClientProvider>
  </BrowserRouter>,
)
