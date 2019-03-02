import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { ActivityIndicator } from 'react-native-paper'

import MovieItems from './MovieItems'
import FetchSourceData from '../data/fetchMovies'
class MovieList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      refresh: false,
      total: 0,
      loaded: false,
    }
  }

  start = 0
  count = 12

  pullDownFetch = async() => {
    if(this.refresh) return;
    this.setState({
      refresh: true
    })
    const movieData = await FetchSourceData()
    this.setState({
      movies: movieData.subjects,
      refresh: false,
    })
    this.start = 0
    this.count = 12
  }

  pullUpFetch = async() => {
    this.start += this.count + 1
    if(this.start < this.state.total) {
      if(this.refresh) return;
      this.setState({
        refresh: true
      })
      const moreData = await FetchSourceData(this.start, this.count)
      if(moreData){
        this.setState({
          movies: this.state.movies.concat(moreData.subjects),
          refresh: false
        })
      }
    }
  }

  async componentDidMount() {
    if(this.refresh) return;
    this.setState({
      refresh: true
    })
    const initialData = await FetchSourceData()
    this.setState({
      movies: initialData.subjects,
      loaded: true,
      refresh: false,
      total: initialData.total,
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
          numColumns={1}
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
              onPress={() => navigate('MovieDetail', {id: item.id, title: item.title}) }/>
            }
          /> : <ActivityIndicator size='medium' animating={true} style={{marginTop: 250}} color='#8e24aa'/>
        } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 2
  },
});

export default MovieList