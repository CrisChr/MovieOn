import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { DefaultTheme, Button } from 'react-native-paper';

// const theme = {
//   roundness: 5,
//   color: {
//     text: '#64b5f6',
//   }  
// }
class MyMovies extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <Button raised mode='text' color='#ba68c8' onPress={() => alert('Pressed')} style={{width: 180, marginTop: 50}}>
          我的观影记录
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default MyMovies