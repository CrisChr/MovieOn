import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import { DefaultTheme, Button, List } from 'react-native-paper';

class MyMovies extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
  }

  _handlePress() {
    this.state.expanded ? this.setState({expanded: false}) : this.setState({expanded: true})
  }

  render() {
    return (
      <View style={styles.root}>
        <List.Accordion
          title='我的观影记录'
          expanded={this.state.expanded}
          onPress={() => this._handlePress()} style={styles.list}>
          <ScrollView>
            <List.Item title='流浪地球' />
            <List.Item title='新喜剧之王' />
            <List.Item title='我想吃掉你的心脏' />
            <List.Item title='流浪地球' />
            <List.Item title='新喜剧之王' />
            <List.Item title='我想吃掉你的心脏' />
            <List.Item title='流浪地球' />
            <List.Item title='新喜剧之王' />
            <List.Item title='我想吃掉你的心脏' />
            <List.Item title='流浪地球' />
            <List.Item title='新喜剧之王' />
            <List.Item title='我想吃掉你的心脏' />
            <List.Item title='流浪地球' />
            <List.Item title='新喜剧之王' />
            <List.Item title='我想吃掉你的心脏' />
          </ScrollView>
        </List.Accordion>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    width: 180,
    marginTop: 20
  }
})

export default MyMovies