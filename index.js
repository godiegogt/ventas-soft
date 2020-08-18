/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';
import generateStore from './redux/Store'
import { Provider } from 'react-redux';

AppRegistry.registerComponent(appName, () => AppWrapper);
