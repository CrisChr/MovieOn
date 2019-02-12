import {createStackNavigator, createAppContainer} from 'react-navigation'

import MovieList from './src/MovieList'
import MovieDetail from './src/MovieDetail'

const Navigator = createStackNavigator({
  MovieList: {
    screen: MovieList,
    navigationOptions: ({navigation}) => ({
      title: '正在上映',
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