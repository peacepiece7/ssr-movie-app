import axios from 'axios'

import { useInfiniteQuery } from 'react-query'

const getMoviesUsingInfiteQuery = (query) =>
  useInfiniteQuery(
    [`2${query}`],
    async ({ pageParam = 1 }) => {
      try {
        const { data } = await axios({
          url: `https://omdbapi.com/?apikey=7035c60c&${query}&page=${pageParam}`,
          method: 'GET',
        })
        // * 데이터가 없을 경우 Error가 반환됩니다.
        if (data.Error) {
          return []
        }
        return data.Search
      } catch (err) {
        console.error('ERROR /query/getSearchInfitieMovies.jsx')
        console.error(err)
        return []
      }
    },
    {
      enabled: !!query,
      staleTime: 1000 * 60 * 5,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.length) return undefined
        return allPages.length + 1
      },
    },
  )

export default getMoviesUsingInfiteQuery
