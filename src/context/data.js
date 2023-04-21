/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext, useContext } from 'react'

// Note: this file does not demonstrate a real data fetching strategy.
// We only use this to simulate data fetching happening on the server
// while the cache is populated on the client. In a real app, you would
// instead use a data fetching library or Server Components for this.

const MovieContext = createContext(null)

export function MovieProvider({ children, data }) {
  return <MovieContext.Provider value={data}>{children}</MovieContext.Provider>
}

// In a real implementation the data would be streamed with the HTML.
// We haven't integrated this part yet, so we'll just use fake data.
const fakeData = [
  "Wait, it doesn't wait for React to load?",
  'How does this even work?',
  'I like marshmallows',
]

export function useMoviesData() {
  const ctx = useContext(MovieContext)
  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    return ctx
  }
  const serverData = document.getElementById('__SERVER_DATA__')?.textContent
  if (serverData) return serverData
  else return null
}
