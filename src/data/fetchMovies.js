
const  api = 'https://api.douban.com/v2/movie/in_theaters';

const fetchData = async(start=0, count=12) => {
  return fetch(`${api}?start=${start}&count=${count}`) //fetch函数返回一个Promise对象
  .then((response) => response.text())
  .then((responseText) => {
    const responseJson = JSON.parse(responseText)
    return responseJson //无法直接获取，必须再返回一个promise对象
  }).catch((err) => {
    console.log(err)
  })
}

export default fetchData;