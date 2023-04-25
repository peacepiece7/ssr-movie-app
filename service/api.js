import axios from 'axios'

/**
 * @typedef Query
 * @property {string | null} s
 * @property {string | null} y
 * @property {string | null} p
 */

/**
 * @description obdb 검색 결과를 가져옵니다.
 * @param {string} Query
 * @returns {Promise<{} | string>}
 */
export async function getSearchMovies() {
  try {
    const { data } = await axios({
      url: `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=frozen`,
      method: 'GET',
    })
    if (data.Error) {
      return ''
    }
    return data.Search
  } catch (err) {
    console.log(`ERROR : 유효하지 않은 요청입니다.`, err)
    return ''
  }
}

export async function getMovieDetailById(id) {
  try {
    const { data } = await axios({
      url: `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`,
      method: 'GET',
    })
    if (data.Error) {
      return ''
    }
    return data
  } catch (err) {
    console.error(err)
    return ''
  }
}
