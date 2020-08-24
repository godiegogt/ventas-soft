import axios from 'axios'
//Initial data
const dataInicial = {
    loading: 'false',
    allProducts:{

    }
}

const LOADING='LOADING'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
const ERROR_UPDATE_PRODUCTS = 'ERROR_UPDATE_PRODUCTS'

export default function productsReducer(state = dataInicial, action) {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: 'true' }
        case UPDATE_PRODUCTS:
            return { ...state,allProducts:action.payload,loading:'false' }
        default:
            case ERROR_UPDATE_PRODUCTS:
            return { ...state,loading:'false' }
        d
            return state
    }

}

export const getAllProductsAction=()=> async (dispatch, getState)=>{

    // dispatch({
    //     type: LOADING
    // })

    await axios.get('http://elangel.tendigt.com/?action=products',{timeout:200})
    .then(res => {
        dispatch({
            type: UPDATE_PRODUCTS,
            payload: res.data
        })
    
    }).catch(err=>{
        console.log("Cachamos la productos fallida:")

        dispatch({
            type: ERROR_UPDATE_PRODUCTS
        })

    })

}

