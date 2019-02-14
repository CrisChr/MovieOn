import React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';

import MovieItems from './MovieItems'

class MovieList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      refresh: false,
      total: 0,
      loaded: false,
      pullUpLoad: true
    }
  }

  refresh = false

  api = 'https://api.douban.com/v2/movie/in_theaters'
  start = 0
  count = 12

  fetchData = async(start, count) => {
    if(this.refresh) return;
    this.setState({
      refresh: true
    })
    this.refresh = true
    return fetch(`${this.api}?start=${this.start}&count=${this.count}`) //fetch函数返回一个Promise对象
      .then((response) => response.text())
      .then((responseText) => {
        const responseJson = JSON.parse(responseText)
        this.setState({
          total: responseJson.total,
          refresh: false
        })
        this.refresh = false
        return responseJson //无法直接获取，必须再返回一个promise对象
      }).catch((err) => {
        console.log(err)
      })
  }

  pullDownFetch = async() => {
    this.start = 0, this.count = 12
    const movieData = await this.fetchData()
    this.setState({
      movies: movieData.subjects,
    })
  }

  pullUpFetch = async() => {
    this.start += this.count + 1
    if(this.start !== this.state.total) {
      const moreData = await this.fetchData(this.start, this.count)
      if(moreData){
        this.setState({
          movies: this.state.movies.concat(moreData.subjects)
        })
      }
    }else{
      this.setState({
        refresh: false
      })
      this.refresh = false
    }
  }

  async componentDidMount() {
    const initialData = await this.fetchData()
    this.setState({
      movies: initialData.subjects,
      loaded: true
    })
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        {
          this.state.loaded ? 
          <FlatList 
          style={styles.row}
          numColumns={3}
          onRefresh={this.pullDownFetch}  //下拉执行刷新函数
          refreshing={this.state.refresh} //是否刷新
          onEndReached={this.pullUpFetch} //上拉加载
          onEndReachedThreshold={0.1}
          data={this.state.movies} 
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <MovieItems title={item.title} 
              img={item.images.medium} 
              stars={item.rating.stars} 
              average={item.rating.average}
              onPress={() => navigate('MovieDetail', {title: item.title}) }/>
            }
          /> : <ActivityIndicator size='large' style={{marginTop: 100}}/>
        } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 15
  },
});

export default MovieList