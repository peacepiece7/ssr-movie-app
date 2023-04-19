import { createContext, useContext } from 'react'

const MovieContext = createContext(null)

export function MovieProvider({ children, data }) {
  return <MovieContext.Provider value={data}>{children}</MovieContext.Provider>
}

const fakeMovies = ['Hello, world!', 'SSR Redner Test!']

export function useMoviesCtx() {
  const ctx = useContext(MovieContext)
  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    ctx.read()
  }
  return fakeMovies
}
