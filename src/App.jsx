/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Html from './Html.jsx'
import Spinner from './components/Spinner.jsx'
import Layout from './components/Layout.jsx'
import NavBar from './components/NavBar.jsx'

const Comments = lazy(() => import('./components/Comments.jsx' /* webpackPrefetch: true */))
const Sidebar = lazy(() => import('./components/Sidebar.jsx' /* webpackPrefetch: true */))
const Post = lazy(() => import('./components/Post.jsx' /* webpackPrefetch: true */))

export default function App({ assets }) {
  return (
    <Html assets={assets} title='Hello'>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </Html>
  )
}

function Content() {
  const handleOnClickSuperVector = (e) => console.log(e.target.textContent)
  return (
    <Layout>
      <NavBar />
      <aside className='sidebar'>
        <Suspense fallback={<Spinner />}>
          <Sidebar />
        </Suspense>
      </aside>
      <article className='post'>
        <Suspense fallback={<Spinner />}>
          <Post />
        </Suspense>
        <section className='comments'>
          <h2>Comments</h2>
          <Suspense fallback={<Spinner />}>
            <Comments />
          </Suspense>
        </section>
        <h2 onClick={handleOnClickSuperVector}>Super Vector</h2>
      </article>
    </Layout>
  )
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  )
}
