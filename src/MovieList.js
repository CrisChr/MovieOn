import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import MovieItems from './MovieItems'
import movies from '../nowplaying.json'

class MovieList extends React.Component {
  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <FlatList 
          style={styles.row}
          numColumns={3}
          data={movies.subjects} 
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <MovieItems title={item.title} 
              img={item.images.medium} 
              stars={item.rating.stars} 
              average={item.rating.average}
              onPress={() => navigate('MovieDetail', {title: item.title}) }/>
            }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15
  },
});

export default MovieList