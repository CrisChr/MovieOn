import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, ImageBackground } from 'react-native';

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
    
    storage.load({
      key: 'movie',
      id: id,
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        movieId: id
      }
    }).then((ret) => {
      this.setState({
        data: ret,
        ready: true
      })
    }).catch(err => {
      console.warn(err.message)
      switch (err.name) {
        case 'NotFoundError':
          break;

        case 'ExpiredError':
          break;
      }
    })

    const that = this
    storage.sync = {
      async movie(params) {
        const {
          syncParams: {
            movieId
          }
        } = params
        const rawResponse = await fetch(`${that.api}/${movieId}`)
        const textResponse = await rawResponse.text()
        const jsonResponse = JSON.parse(textResponse)
        console.log('json: ', jsonResponse)
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
  }

  render() {
    const {data: {rating, genres, directors, casts, countries, summary, images}, ready} = this.state
    return (
      <ScrollView>
        {
          ready ? 
          <View>
            <View style={styles.content}>
              <ImageBackground  style={styles.img} source={{uri: images.large}}>
                <Image source={require('./imgs/play-icon.png')} style={styles.play}/>
              </ImageBackground >
              <Text style={styles.title}>评分：{rating.average === 0 ? '暂无评分' : rating.average}</Text>
              <Text style={styles.title}>类型：{
                  genres.map((v) => v + ' ')
                }
              </Text>
              <Text style={styles.title}>导演：{
                  directors.map((v) => v.name + ' ')
                }
              </Text>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>主演：{
                  casts.map((v, i) => <Text key={i}>{v.name + ' '}</Text>)
                }
              </Text>
              <Text style={styles.title}>上映国家（地区）：{
                  countries.map((v) => v + ' ')
                }
              </Text>
              <Text style={styles.title}>故事梗概：{summary}</Text>
            </View>
          </View>
           :
          <ActivityIndicator size='large' style={styles.loading}/>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 30
  },
  img: {
    width: 135,
    height: 188.5,
    marginTop: 10
  },
  play: {
    width: 107,
    height: 107,
    position: 'absolute',
    top: 53.5,
    left: 53.5
  },
  loading: {
    marginTop: 100
  }
})

export default MovieDetail