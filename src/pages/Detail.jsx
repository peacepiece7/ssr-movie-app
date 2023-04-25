import React from 'react'
import htmlEntitiesDecoder from 'html-entities-decoder'
import { useMoviesData } from '../context/movieContext'
import Layout from '../layouts/Layout'

/**
 * @typedef {object} movieDetail
 * @property {string} Title
 * @property {string} Year
 * @property {string} Rated
 * @property {string} Released
 * @property {string} Runtime
 * @property {string} Genre
 * @property {string} Director
 * @property {string} Writer
 * @property {string} Actors
 * @property {string} Plot
 * @property {string} Language
 * @property {string} Country
 * @property {string} Awards
 * @property {string} Poster
 * @property {object[]} Ratings
 * @property {string} Ratings[].Source
 * @property {string} Ratings[].Value
 * @property {string} Ratings[].SourceImage // 제가 추가했습니다
 * @property {string} Metascore
 * @property {string} imdbRating
 * @property {string} imdbVotes
 * @property {string} imdbID
 * @property {string} Type
 * @property {string} DVD
 * @property {string} BoxOffice
 * @property {string} Production
 * @property {string} Website
 * @property {string} Response

 */

export default function Detail() {
  /**
   * @type {movieDetail}
   */
  let movie = useMoviesData()
  movie = movie ? JSON.parse(htmlEntitiesDecoder(movie)) : ''
  if (!movie) {
    return <div>Empty plz check the movie</div>
  }

  return (
    <Layout>
      <main className="flex justify-center">
        <div className="poster">
          <img
            src={movie.Poster === 'N/A' ? '/noImage.png' : movie.Poster}
            alt={`${movie.Title} Poster`}
            onError={(e) => {
              e.target.src = '/noImage.png'
            }}
          />
        </div>
        <div>
          <h1>{movie.Title}</h1>
          <div>
            <span>
              {movie.Released} - {movie.Runtime} - {movie.Country}
            </span>
          </div>
          <div>{movie.Plot}</div>
          <div>
            <h2>Ratings</h2>
            <ul>
              {movie.Ratings.map((rating) => (
                <li key={rating.Value}>
                  <img src={rating.SourceImage === 'N/A' ? '/noImage.png' : rating.SourceImage} alt={rating.Source} />
                  <span>{rating.Value}</span>
                </li>
              ))}
            </ul>
            <div>
              <h2>Actor</h2>
              <div>{movie.Actors}</div>
            </div>
            <div>
              <h2>Director</h2>
              <div>{movie.Director}</div>
            </div>
            <div>
              <h2>Production</h2>
              <div>{movie.Production}</div>
            </div>
            <div>
              <h2>Genre</h2>
              <div>{movie.Genre}</div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
