import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import { getSearchInfitieMovies } from '../query/query'
import Search from '../components/Search'
import SearchList from '../components/SearchList'
import Spinner from '../components/Spinner'
import useScollDown from '../hooks/useScollDown'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isBottom] = useScollDown()
  const {
    data: movies,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = getSearchInfitieMovies(searchQuery)

  const handleOnSearch = (query) => {
    setSearchQuery(query)
  }

  useEffect(() => {
    if (isBottom && isSuccess && hasNextPage) fetchNextPage()
  }, [isBottom])

  const GetNextMovies = () => {
    fetchNextPage()
  }
  return (
    <Layout>
      <main>
        <h1>OMDb API THE OPEN MOVIE DATABASE</h1>
        <p className="underline">
          The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are
          contributed and maintained by our users.
        </p>
        <p>If you find this service useful, please consider making a one-time donation or become a patron.</p>
        <Search onSearch={handleOnSearch} />
        <section>
          <h2>SearchList</h2>
          {isLoading && <Spinner />}
          {isSuccess ? <SearchList movies={movies} /> : <div>Search for the movie title</div>}
          {isFetchingNextPage && <Spinner />}
        </section>
      </main>
      <button type="button" onClick={GetNextMovies}>
        get next data
      </button>
    </Layout>
  )
}
