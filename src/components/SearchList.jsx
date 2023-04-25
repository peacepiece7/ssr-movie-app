import React from 'react'
import PropTypes from 'prop-types'

export default function SearchList({ movies }) {
  return (
    <ul className="flex justify-center flex-wrap">
      {movies &&
        movies.pages.map((page) =>
          page.map((movie) => (
            <li key={movie.imdbID} className="w-[200px]">
              <a href={`/detail?id=${movie.imdbID}`} target="_blank" rel="noreferrer">
                <img
                  src={movie.Poster === 'N/A' ? '/noImage.png' : movie.Poster}
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  alt="Movie Poster"
                  onError={(e) => {
                    console.log(e.target)
                    e.target.onerror = null
                    e.target.src = '/noImage.png'
                  }}
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
      PropTypes.shape({
        Title: PropTypes.string,
        Year: PropTypes.string,
        Poster: PropTypes.string,
        imdbID: PropTypes.string,
        Type: PropTypes.string,
      }),
    ),
  }).isRequired,
}
