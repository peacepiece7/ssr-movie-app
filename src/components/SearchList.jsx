import React from 'react'
import PropTypes from 'prop-types'

export default function SearchList({ movies }) {
  console.log(movies)
  if (movies.pages[0].length === 0) {
    return <div>Moive Not Found! please check the spell</div>
  }
  return (
    <ul className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3">
      {movies &&
        movies.pages.map((page) =>
          page.map((movie) => (
            <li
              key={movie.imdbID}
              className={`flex justify-center mb-3 shadow-sm 
              hover:shadow-lg transition duration-150 ease-out`}
            >
              <a
                href={`/detail?id=${movie.imdbID}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-[200px]"
              >
                <img
                  src={movie.Poster === 'N/A' ? '/noImage.png' : movie.Poster}
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  alt="Movie Poster"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/noImage.png'
                  }}
                  className="scale-100 hover:scale-[1.01] transition duration-150 ease-out"
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