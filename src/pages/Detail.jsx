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
        <div className="min-w-[50%]">
          <div className="mr-8 ">
            <img
              src={movie.Poster === 'N/A' ? '/noImage.png' : movie.Poster}
              alt={`${movie.Title} Poster`}
              onError={(e) => {
                e.target.src = '/noImage.png'
              }}
              className="w-full rounded-2xl"
            />
          </div>
        </div>
        <div className="min-w-[50%]">
          <h1 className="text-4xl text-c-tt tracking-widest mb-10">{movie.Title}</h1>
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
                  <div className="w-10 h-8 mr-2">
                    <img
                      src={rating.SourceImage === 'N/A' ? '/noImage.png' : rating.SourceImage}
                      alt={rating.Source}
                      className="mr-9"
                    />
                  </div>
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