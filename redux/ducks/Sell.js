import axios from 'axios'
const { v4: uuidv4 } = require('uuid');
//Initial data
const dataInicial = {
    loading: false,
    products: []
}

const LOADING = 'LOADING'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
const SUCCESS_SELL = 'SUCCESS_SELL'
const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'

export default function sellReducer(state = dataInicial, action) {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case ADD_PRODUCTS: {

            return {
                ...state,
                products: [...state.products, action.payload]
            }
        }
        case DELETE_PRODUCTS: {

            

            return {
                ...state,
                products: state.products.filter(item=>item.uuid !== action.payload)
            }
        }
        case SUCCESS_SELL: {
            return {
                ...state
            }
        }
        case CLEAR_PRODUCTS: {

            return {
                ...state,
                products: []
            }
        }

        default:
            return { ...state }
    }

}

export const createSellAction=  (sell)=> async (dispatch)=>{

    await axios.post(`http://elangel.tendigt.com/?action=sell`, sell)
    .then(res => {
        console.log("Axios");
      //console.log(res);
      console.log(res.data);

      dispatch({
        type: SUCCESS_SELL,
        payload: res.data
    })
     
      
    })

   



}

export const addProductAction = (product,amount) => (dispatch) => {
    console.log("product");
    console.log(product);

    dispatch({
        type: ADD_PRODUCTS,
        payload: {
            ...product,
            amount,
            'uuid':guidGenerator()
        }
    })

}

export const deleteProductAction = (item) => (dispatch) => {
    console.log('uuid');
console.log(item.uuid);
    dispatch({
        type: DELETE_PRODUCTS,
        payload: item.uuid
    })

}

export const clearProductsAction = () => (dispatch) => {

    dispatch({
        type:  CLEAR_PRODUCTS
    })

}


function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

