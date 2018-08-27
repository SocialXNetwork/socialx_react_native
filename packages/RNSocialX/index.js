// import './globals'; // watch https://github.com/facebook/react-native/issues/20415 or find an alternative
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
