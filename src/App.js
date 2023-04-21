import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Html from './Html'
import Spinner from './Spinner'
import Layout from './Layout'
import NavBar from './NavBar'

// * 사용자가 접속할 확률이 높은 컴포넌트라면 webpackPrefetch를 true로 설정합니다.
const Comments = lazy(() => import('./Comments' /* webpackPrefetch: true */))
const Sidebar = lazy(() => import('./Sidebar' /* webpackPrefetch: true */))
const Post = lazy(() => import('./Post' /* webpackPrefetch: true */))

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
