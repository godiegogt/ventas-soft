import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


import userReducer from './ducks/User'
import productsReducer from './ducks/Products'
import sellReducer from './ducks/Sell'
import customerReducer from './ducks/Customer'

import { persistStore, persistReducer } from 'redux-persist'


import AsyncStorage from '@react-native-community/async-storage';



const rootReducer=combineReducers({
  
    user:userReducer,
    products:productsReducer,
    sell:sellReducer,
    customer:customerReducer
})

const persistConfig = {
    key: 'root',
    
    storage:AsyncStorage
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default () => {
    let store = createStore(persistedReducer,composeEnhancers( applyMiddleware(thunk)));
    let persistor = persistStore(store)
    return { store, persistor }
  }