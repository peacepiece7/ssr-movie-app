import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const MovieContext = createContext(null)

export function MovieProvider({ children, data }) {
  return <MovieContext.Provider value={data}>{children}</MovieContext.Provider>
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.string.isRequired,
}

export function useMoviesData() {
  const ctx = useContext(MovieContext)
  if (ctx !== null) {
    /**
     * * 해당 범위는 서버에서 랜더링시 사용되는 부분입니다.
     * * 여기서 Promise<pending>을 반환하면, Promise가 리턴 될 때까지 fallback을 보여줍니다.
     * * server/render/renderHome.js의 createDelay함수를 참고해주세요. (미구현)
     */
    // ctx.delay.read()
    return ctx.data
  }

  /**
   * * Client에서 hyration이 되면 useMoviesData()를 호출한 컴포넌트에서 여기 아래 로직을 실행합니다.
   * * 변수 serverData는 ctx에서 반환되는 값과 동일해야 합니다.
   */
  const serverData = document.getElementById('__SERVER_DATA__')?.textContent
  if (serverData) return serverData
  return ''
}
