// import storage from '../../storage'
const api = 'https://api.douban.com/v2/movie/subject'

const movieDetails = {
  async movie(params) {
    const {
      syncParams: {
        movieId
      }
    } = params
    const rawResponse = await fetch(`${api}/${movieId}`)
    const textResponse = await rawResponse.text()
    const jsonResponse = JSON.parse(textResponse)
    //console.log('json: ', jsonResponse)
    if (jsonResponse) {
      storage.save({
        key: 'movie',
        id: movieId,
        data: jsonResponse
      })
      return jsonResponse
    }
  }
}
 export default movieDetails

