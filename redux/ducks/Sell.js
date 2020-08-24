import axios from 'axios'
const { v4: uuidv4 } = require('uuid');
//Initial data
const dataInicial = {
    loading: false,
    products: [],
    sells: []
}

const LOADING = 'LOADING'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
const SUCCESS_SELL = 'SUCCESS_SELL'
const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'
const ERROR_CREATE_SELL='ERROR_CREATE_SELL'

const SUCCESS_SYNC_SELL='SUCCESS_SYNC_SELL'

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
        case ERROR_CREATE_SELL: {
            return {
                ...state,
                sells:[...state.sells,action.payload]
            }
        }
        case CLEAR_PRODUCTS: {

            return {
                ...state,
                products: []
            }
        }
        case SUCCESS_SYNC_SELL: {


            return {
                ...state,
                sells: state.sells.filter(item=>item.uuid !== action.payload)
            }
        }

        default:
            return state
    }

}

export const createSellAction=  (sell)=> async (dispatch,state)=>{
    sell.uuid=guidGenerator();
    //Limpiamos los productos seleccionados
    
    // dispatch({
    //type: CLEAR_PRODUCTS
    console.log("Datos de venta:");
    console.log(sell);

    await axios.post(`http://elangel.tendigt.com/?action=sell`, sell,{timeout:200})
    .then(res => {
        console.log("Axios");
      //console.log(res);
        console.log(res.data);
     

        dispatch({
            type: SUCCESS_SELL
        })



    
    }).catch(err=>{
        console.log("Cachamos la venta fallida:")

        dispatch({
            type: ERROR_CREATE_SELL,
            payload:sell
        })

    })

   



}

export const addProductAction = (product,amount) => (dispatch) => {
   // console.log("product");
   // console.log(product);

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
    //console.log('uuid');
//console.log(item.uuid);
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
//Esta accion sincroniza todas las ventas almacenadas que no se hayan sincronizado
export const syncAllSellsAction= ()=>  (dispatch,getState)=>{

    const sells=getState().sell.sells;
    console.log("Obtenemos las ventas sin sincronizar:");
    //console.log(getState().sell.sells);
    //Recoremos venta por venta para sincronizar.
    sells.map( async (sell,item)=>{
        console.log("Numero de venta:"+item);
        console.log(sell);

        //Es la misma acción que crea acciones con la diferencia que elimina las ventas del store que ya se hayan sincronizado
        await axios.post(`http://elangel.tendigt.com/?action=sell`, sell,{timeout:200})
        .then(res => {
            console.log("Suncronizamos venta: "+sell.uuid);
            dispatch({
                type: SUCCESS_SYNC_SELL,
                dispatch:sell.uuid
            })

        }).catch(err=>{
            console.log("Cachamos la venta fallida:");
            return; 
        });



    });




    return;

}




function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

