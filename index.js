/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import {AppRegistry} from 'react-native';
import App from './App';
import storage from './storage';
import {name as appName} from './app.json';

if(!__DEV__){
  global.console = {
    info:() => {},
    log:() => {},
    warn:() => {},
    error:() => {}
  }
}

AppRegistry.registerComponent(appName, () => App);
