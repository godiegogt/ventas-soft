import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


import userReducer from './ducks/User'
import productsReducer from './ducks/Products'
import sellReducer from './ducks/Sell'
import customerReducer from './ducks/Customer'


const rootReducer=combineReducers({
  
    user:userReducer,
    products:productsReducer,
    sell:sellReducer,
    customer:customerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
   // leerUsuarioActivoAccion()(store.dispatch)
    return store
}