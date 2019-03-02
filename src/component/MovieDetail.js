import React from 'react';
import {StyleSheet, 
        Text, 
        View, 
        Image, 
        ScrollView, 
        ImageBackground, 
        TouchableOpacity,
        Linking
      } from 'react-native';

import { ActivityIndicator } from 'react-native-paper'
class MovieDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      ready: false,
      videoUrl: ''
    }
  }

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
        ready: true,
      })
      this.fetchVideo(ret.mobile_url)
    }).catch(err => {
      console.warn(err.message)
      switch (err.name) {
        case 'NotFoundError':
          break;
        case 'ExpiredError':
          break;
      }
    })
  }

  async fetchVideo(vidoe_url) {
    //console.log(vidoe_url)
    let pageHtml = await fetch(vidoe_url)
    pageHtml = await pageHtml.text()
    const reg = /href="([\w|\W]*\.mp4)"/
    const result = pageHtml.match(reg)
    if(result && result[1]){
      this.setState({
        video: result[1]
      })
    }
  }

  playVideo() {
    const {video} = this.state
    if(video){
      Linking.openURL(video)
    }else{
      alert('正在获取视频地址，请稍后再试')
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
              <TouchableOpacity onPress={() => this.playVideo()}>
                <ImageBackground  style={styles.img} source={{uri: images.large}}>
                  <Image source={require('../imgs/play-icon.png')} style={styles.play}/>
                </ImageBackground >
              </TouchableOpacity>
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
          <ActivityIndicator size='medium' animating={true} style={{marginTop: 250}} color='#8e24aa'/>
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
    top: 40,
    left: 15
  },
  loading: {
    marginTop: 100
  }
})

export default MovieDetail