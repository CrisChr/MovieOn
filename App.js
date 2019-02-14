import React from 'react';
import {
  createStackNavigator, 
  createAppContainer, 
  createMaterialTopTabNavigator 
} from 'react-navigation'

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import Mticon from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieList from './src/MovieList'
import MyMovies from './src/MyMovies'
import MovieDetail from './src/MovieDetail'

const MyTabs = createMaterialTopTabNavigator({
  MovieList: {
    screen: MovieList,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '正在上映',
      tabBarIcon: ({focused, tintColor}) => (
       <Mticon name='movie' color={tintColor} size={20}/>
      )
    })
  },
  MyMovies: {
    screen: MyMovies,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '我的观影',
      tabBarIcon: ({focused, tintColor}) => (
        <Mticon name='account' color={tintColor} size={20}/>
      )
    })
  }
}, {
  tabBarOptions: {
    showIcon: true,
    tabStyle: {
      height: 50
    },
    showLabel: false
}},{
  initialRouteName: 'MovieList',
  backBehavior: 'none',
  swipeEnabled: true,
  animationEnabled: true
})

const Navigator = createStackNavigator({
  MyTabs: {
    screen: MyTabs,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title
    })
  }
});
const App = createAppContainer(Navigator)

export default App