import React from 'react'
import PropTypes from 'prop-types'

export default function SearchList({ movies }) {
  if (movies.pages[0].length === 0) {
    return (
      <p className="absolute w-fit h-0 inset-0 m-auto text-c-d text-xl tracking-widest opacity-40">
        Moive Not Found! Please check the spell
      </p>
    )
  }
  return (
    <ul className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3">
      {movies &&
        movies.pages.map((page) =>
          page.map((movie) => (
            <li
              key={movie.imdbID}
              className={`flex justify-center mb-3 shadow-sm 
              hover:shadow-lg transition duration-150 ease-out rounded-b-sm`}
            >
              <a
                href={`/detail?id=${movie.imdbID}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-center w-[200px]"
              >
                <img
                  src={movie.Poster === 'N/A' ? '/noImage.png' : movie.Poster}
                  alt="Movie Poster"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/noImage.png'
                  }}
                  className={`inline-block scale-100 w-[133px] h-[200px] md:w-[200px] md:h-[300px] object-cover hover:scale-[1.02]
                  transition duration-150 ease-out rounded-t-sm`}
                />
                <div className="description">
                  <p>{movie.Year}</p>
                  <p>{movie.Title}</p>
                </div>
              </a>
            </li>
          )),
        )}
    </ul>
  )
}

SearchList.propTypes = {
  movies: PropTypes.shape({
    pages: PropTypes.arrayOf(
      PropTypes.arrayOf({
        Title: PropTypes.string,
        Year: PropTypes.string,
        Poster: PropTypes.string,
        imdbID: PropTypes.string,
        Type: PropTypes.string,
      }),
    ),
  }).isRequired,
}
