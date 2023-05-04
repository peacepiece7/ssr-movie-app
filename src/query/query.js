import axios from 'axios'

import { useQuery, useInfiniteQuery } from 'react-query'

export const getMovieDetailById = (id) =>
  useQuery(['detail', id], async () => {
    try {
      // page수 만큼 api요청 보내는 queue 만들어야 함
      const { data } = await axios({
        url: `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`,
        method: 'GET',
      })

      if (data.Error) {
        return []
      }
      return data
    } catch (err) {
      console.error('getMovieDetailById ERROR : ', err)
      return []
    }
  })

export const getMoviesUsingInfiteQuery = (query) =>
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
