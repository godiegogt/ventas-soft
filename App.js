/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { ThemeProvider } from 'react-native-elements';
import { materialTheme } from './constants/'

import LoginScreen from "./screens/LoginScreen"
import AppStack from "./navigation/Screens";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import { useDispatch, useSelector} from 'react-redux'

const Stack = createStackNavigator();
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import generateStore from './redux/Store'

const AppWrapper = () => {
  const store = generateStore();

  return (
    <Provider store={store}>
      <App /> 
    </Provider>
  )
}





const App = () => {


  const isLogin = useSelector(state => state.user.activo)

React.useEffect(() => {
  console.log(isLogin);
}, [])



  return (
   
     
        <ThemeProvider theme={materialTheme} >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            headerMode='none'
            screenOptions={{
              navigationOptions: {
                headerShown: false,
              }
            }}
          >

            {
              !isLogin
                ? <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
                : <Stack.Screen name="AppStack" component={AppStack} />

            }
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    
  
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default AppWrapper;
