import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import getMoviesUsingInfiteQuery from '../query/query'
import Search from '../components/Search'
import SearchList from '../components/SearchList'
import Spinner from '../components/Spinner'
import useScoll from '../hooks/useScroll'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isBottom] = useScoll()
  const {
    data: movies,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = getMoviesUsingInfiteQuery(searchQuery)

  const getSearchQuery = (query) => {
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
        <div className="mb-8">
          <p className="w-10/12 mb-2">
            The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are
            contributed and maintained by our users.
          </p>
          <p className="w-10/12">
            If you find this service useful, please consider making a one-time donation or become a patron.
          </p>
        </div>
        <Search onSubmitSearchForm={getSearchQuery} />
        <section>
          <h2 className="text-2xl text-c-tt tracking-widest mt-4 mb-2">Search List</h2>
          <div className="relative min-h-[240px] bg-[#fff] p-2 rounded-lg shadow-md">
            {isLoading && <Spinner pos="mt-24" />}
            {isSuccess && <SearchList movies={movies} />}
            {!isSuccess && !isLoading && (
              <p className="absolute w-fit h-0 inset-0 m-auto text-c-d text-xl text-center tracking-widest opacity-40">
                Search for the movie title
              </p>
            )}
            {isFetchingNextPage && <Spinner pos="fixed left-0 right-0 bottom-[225px]" />}
            {hasNextPage && <div className="h-[120px]" />}
          </div>
        </section>
      </main>
    </Layout>
  )
}
