import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
//import storage from '../storage';
class MovieDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      ready: false
    }
  }

  api = 'https://api.douban.com/v2/movie/subject'

  componentDidMount() {
    const {
      state: {
        params: {
          id
        }
      }
    } = this.props.navigation
    console.log('id: ', id)
    const result = storage.load({
      key: 'movie',
      id: id,
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        movieId: id
      }
    }).then((ret) => {
      return ret;
    }).catch(err => {
      console.warn(err.message)
      switch (err.name) {
        case 'NotFoundError':
          break;

        case 'ExpiredError':
          break;
      }
    })

    console.log('result: ', result)
    const that = this
    storage.sync = {
      async movie(params) {
        const {
          syncParams: {
            movieId
          }
        } = params
        console.log('movie id: ', movieId)
        console.log('api: ', `${that.api}/${movieId}`)
        const rawResponse = await fetch(`${this.api}/${movieId}`)
        const textResponse = await rawResponse.text()
        const jsonResponse = JSON.parse(textResponse)
        console.log('json: ', jsonResponse)
        if (jsonResponse) {
          that.setState({
            data: jsonResponse,
            ready: true
          })
          storage.save({
            key: 'movie',
            id: movieId,
            data: jsonResponse
          })
        }
      }
    }
  }

  render() {
    const {data: {title, summary, images}, ready} = this.state
    return (
      <View>
        {
          ready ? 
          <View>
            <Image style={{width: 135, height: 188.5}} source={{uri: images.large}}/>
            <Text>{title}</Text>
            <Text>{summary}</Text>
          </View>
           :
          <ActivityIndicator size='large' style={{marginTop: 100}}/>
        }
        
      </View>
    );
  }
}

export default MovieDetail