import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const MovieContext = createContext(null)

export function MovieProvider({ children, data }) {
  return <MovieContext.Provider value={data}>{children}</MovieContext.Provider>
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.string.isRequired, // JSON.stringify된 데이터입니다.
}

// let i = 1
export function useMoviesData() {
  const ctx = useContext(MovieContext)
  if (ctx !== null) {
    // * 여기 scope는 서버에서 랜더링시 사용되는 부분입니다.
    // * server.render에 보면 id가__SERVER_DATA__인 script태그의 textContent안에 stringify된 ctx가 들어갑니다.
    // * SSR Suspense가 이곳에서 일어납니다.
    // eslint-disable-next-line no-new, no-promise-executor-return

    // * 여기서 Promise<pending>을 throw하면, Promise가 리턴 될 때까지 fallback을 보여줍니다.
    // const promise = new Promise((res) => {
    //   setTimeout(() => {
    //     res()
    //   }, 4000)
    // })
    // if (i === 1) {
    //   i++
    //   throw promise
    // }
    // return JSON.stringify(ctx.delay.read())
    // ctx.delay.read()
    return ctx.data
  }
  // * Client에서 hyration이 되면 useMoviesData()를 호출한 컴포넌트에서 여기 아래 로직을 실행합니다.
  // * 아래 serverData와 ctx는 동일한 값을 가지고 있씁니다.
  const serverData = document.getElementById('__SERVER_DATA__')?.textContent
  if (serverData) return serverData
  return ''
}
