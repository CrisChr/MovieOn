import React from 'react';
import {
  createStackNavigator, 
  createAppContainer, 
  createMaterialTopTabNavigator 
} from 'react-navigation'

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import MtIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieList from './src/component/MovieList'
import MyMovies from './src/component/MyMovies'
import MovieDetail from './src/component/MovieDetail'
import HeaderComponent from './src/component/Header'

const MyTabs = createMaterialTopTabNavigator({
  MovieList: {
    screen: MovieList,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '正在上映',
      tabBarIcon: ({focused, tintColor}) => (
       <MtIcons name='movie' color={tintColor} size={20}/>
      )
    })
  },
  MyMovies: {
    screen: MyMovies,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '我的观影',
      tabBarIcon: ({focused, tintColor}) => (
        <MtIcons name='account' color={tintColor} size={20}/>
      )
    })
  }
}, {
  tabBarOptions: {
    showIcon: true,
    tabStyle: {
      height: 50
    },
    style: {
      backgroundColor: '#8e24aa'
    },
    showLabel: false
  },
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
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#8e24aa',
      },
      headerTitleStyle: {
        color: '#eceff1'
      },
      headerBackTitleStyle: {
        color: '#eceff1',
      },
      headerTintColor: '#eceff1',
      headerRight: <HeaderComponent id={navigation.state.params.id}/>,
      headerRightContainerStyle: {
        marginRight: 30,
      }
    })
  }
});
const App = createAppContainer(Navigator)

export default App