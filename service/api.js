import axios from 'axios'

/**
 * @description obdb 검색 결과를 가져옵니다.
 * @param {string} query
 * @returns {Promise<{} | null>}
 */
export async function getSearchMovies(query) {
  try {
    const { data } = await axios({
      url: `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=frozen`,
      method: 'GET',
    })
    return data.Search
  } catch (err) {
    console.log(`ERROR : 유효하지 않은 요청입니다.`, err)
    return null
  }
}
