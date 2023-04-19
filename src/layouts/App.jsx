import React, { Suspense, useState } from 'react'
import Html from '../Html.jsx'
import Header from '../components/Header.jsx'
const HomePage = React.lazy(() => import('../pages/Home.jsx'))
const AboutPage = React.lazy(() => import('../pages/About.jsx'))
const DetailPage = React.lazy(() => import('../pages/Detail.jsx'))
import Loading from '../components/Loading.jsx'

// import { Routes, Route } from 'react-router-dom'

export default function App({ assets, data }) {
  console.log('src/layout/App.jsx data가져옴!!', data)
  console.log('src/layouts/App.jsx assets : ', assets)
  return (
    <Html assets={assets} title='Hello SSR!'>
      <Header />
      <section>
        <h2>
          데이터가 나오지 않아도 이 부분은 ssr이라서 완전 빨리 나옵니다. About page소스 보기하면 잘
          나옴
        </h2>
        <Suspense fallback={<Loading />}>
          <AboutPage />
        </Suspense>
      </section>
      <section>
        <h2>마찬가지 Detail page</h2>
        <Suspense fallback={<Loading />}>
          <DetailPage />
        </Suspense>
      </section>
      <section>
        <h2>마찬가지 Home page</h2>
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      </section>
      <footer style={{ backgroundColor: 'black', color: 'white' }}>요기는 푸터 자리입니다!</footer>
    </Html>
  )
}
{
  /* <Routes>
<Route
  path='/about'
  element={
    <Suspense fallback={<Loading />}>
      <AboutPage />
    </Suspense>
  }
/>
<Route
  path='/detail'
  element={
    <Suspense fallback={<Loading />}>
      <DetailPage />
    </Suspense>
  }
/>
<Route
  path='/'
  element={
    <Suspense fallback={<Loading />}>
      <HomePage />
    </Suspense>
  }
/>
</Routes> */
}
