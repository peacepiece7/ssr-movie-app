import axios from 'axios'

/**
 * @description obdb 검색 결과를 가져옵니다.
 * @returns {Promise<object[]>}
 */
export default async function getMovieDetailById(id) {
  try {
    const { data } = await axios({
      url: `https://omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`,
      method: 'GET',
    })
    if (data.Error) {
      return []
    }
    return data
  } catch (err) {
    console.error(err)
    return []
  }
}
