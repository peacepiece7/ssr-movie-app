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
  const movie = useMoviesData()
  /**
   * @type {movieDetail | null}
   */
  const movieData = movie ? JSON.parse(htmlEntitiesDecoder(movie)) : null

  if (movieData === null) {
    return <div>Empty plz check the movie</div>
  }
  return (
    <Layout>
      <main className="flex md:flex-row md:justify-center md:items-stretch flex-col items-center">
        <div className="min-w-[50%] mb-12 md:mb-0">
          <div className="md:mr-8 text-right">
            <picture>
              <source
                srcSet={
                  movieData.Poster === 'N/A' ? '/noImage.png' : movieData.Poster.replace('._V1_SX300.', '._V1_SX700.')
                }
                media="(min-width: 768px)"
              />
              <img
                src={movieData.Poster === 'N/A' ? '/noImage.png' : movieData.Poster}
                alt={`${movieData.Title} Poster`}
                onError={(e) => {
                  e.target.src = '/noImage.png'
                }}
                className="inline-block max-h-[820px] rounded-2xl"
              />
            </picture>
          </div>
        </div>
        <div className="min-w-[50%]">
          <h1 className="md:text-left text-center text-4xl text-c-tt tracking-widest mb-10">{movie.Title}</h1>
          <div>
            <div className="text-c-h mb-4">
              <span className="after:content-['-'] after:ml-2 after:mr-2 after:text-[#000]">{movie.Released}</span>
              <span className="after:content-['-'] after:ml-2 after:mr-2">{movie.Runtime}</span>
              <span className="after:content-['-'] after:ml-2 after:mr-2">{movie.Country}</span>
            </div>
          </div>
          <div className="text-c-d mb-4 plot">{movie.Plot}</div>
          <div>
            <h2 className="text-2xl text-c-tt tracking-widest mb-1">Ratings</h2>
            <ul className="flex  mb-4">
              {movie.Ratings.map((rating) => (
                <li key={rating.Value} className="flex items-center mr-5">
                  <span>
                    <img
                      src={rating.SourceImage === 'N/A' ? '/noImage.png' : rating.SourceImage}
                      alt={rating.Source}
                      className="mr-3 h-[27px]"
                      onError={(e) => {
                        e.target.src = '/noImage.png'
                      }}
                    />
                  </span>
                  <span>{rating.Value}</span>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <h2 className="text-2xl text-c-tt tracking-widest mb-1">Actor</h2>
              <div>{movie.Actors}</div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl text-c-tt tracking-widest mb-1">Director</h2>
              <div>{movie.Director}</div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl text-c-tt tracking-widest mb-1">Production</h2>
              <div>{movie.Production}</div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl text-c-tt tracking-widest mb-1">Genre</h2>
              <div>{movie.Genre}</div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
