import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class MovieDetail extends React.Component {
  // static navigationOptions = ({navigation}) => {
  //   title: 'A'
  // }
  render() {
    const {state} = this.props.navigation
    return (
      <View>
        <Text>详情页</Text>
        <Text>电影: {state.params.title}</Text>
      </View>
    );
  }
}

export default MovieDetail