import { createContext, useContext } from 'react'

const MovieContext = createContext(null)

export function MovieProvider({ children, data }) {
  return <MovieContext.Provider value={data}>{children}</MovieContext.Provider>
}

export function useMoviesData() {
  const ctx = useContext(MovieContext)
  if (ctx !== null) {
    // * 여기 scope는 서버에서 랜더링시 사용되는 부분입니다.
    // * server.render에 보면 id가__SERVER_DATA__인 script태그의 textContent안에 stringify된 ctx가 들어갑니다.
    return ctx
  }
  // * Client에서 hyration이 되면 useMoviesData()를 호출한 컴포넌트에서 여기 아래 로직을 실행합니다.
  // * 아래 serverData와 ctx는 동일한 값을 가지고 있씁니다.
  const serverData = document.getElementById('__SERVER_DATA__')?.textContent
  if (serverData) return serverData
  else return null
}
