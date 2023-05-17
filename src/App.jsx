import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router-dom'
import Error from './components/Error'
import Spinner from './components/Spinner'

import Home from './pages/Home'
import About from './pages/About'

const Detail = lazy(() => import('./pages/Detail.jsx'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/detail"
        element={
          <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<Spinner />}>
              <Detail />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
