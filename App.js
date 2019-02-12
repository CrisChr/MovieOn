import React from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';

import Items from './src/Items'
import movies from './nowplaying.json'

class App extends React.Component {
  render() {
    return (
      <View>
        <FlatList 
          style={styles.row}
          numColumns={3}
          data={movies.subjects} 
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <Items title={item.title} img={item.images.medium} stars={item.rating.stars} average={item.rating.average}/>}
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

export default App