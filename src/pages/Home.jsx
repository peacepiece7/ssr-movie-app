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
    if (isBottom && isSuccess && hasNextPage) {
      fetchNextPage()
    }
  }, [isBottom])

  return (
    <Layout>
      <main>
        <h1 className="text-4xl text-c-tt tracking-widest mb-10">
          <p>OMDb API</p>
          <p>THE OPEN MOVIE DATABASE</p>
        </h1>
        <div>
          <p className="w-10/12 mb-2 ">
            The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are
            contributed and maintained by our users.
          </p>
          <p className="w-10/12 mb-8 ">
            If you find this service useful, please consider making a one-time donation or become a patron.
          </p>
        </div>
        <Search onSearch={handleOnSearch} />
        <section className="min-h-[240px] shadow-md rounded-md p-2">
          <h2 className="text-2xl text-c-tt tracking-widest mb-10">Search List</h2>
          {isLoading && <Spinner />}
          {isSuccess ? (
            <SearchList movies={movies} />
          ) : (
            <div className="text-c-d mb-10 opacity-80">Search for the movie title</div>
          )}
          {isFetchingNextPage && <Spinner pos="fixed left-0 right-0 bottom-[165px]" />}
          {hasNextPage && <div className="h-[70px]" />}
        </section>
      </main>
    </Layout>
  )
}
