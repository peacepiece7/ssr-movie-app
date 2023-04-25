import React, { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router-dom'
import Error from './components/Error'
import Spinner from './components/Spinner'

import Home from './pages/Home'

const Detail = lazy(() => import('./pages/Detail'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/detail"
        element={
          <Suspense fallback={<Spinner />}>
            <ErrorBoundary fallback={<Error />}>
              <Detail />
            </ErrorBoundary>
          </Suspense>
        }
      />
    </Routes>
  )
}
