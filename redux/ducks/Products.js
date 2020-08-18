import axios from 'axios'
//Initial data
const dataInicial = {
    loading: false,
    allProducts:{

    }
}

const LOADING='LOADING'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

export default function productsReducer(state = dataInicial, action) {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case UPDATE_PRODUCTS:
            return { ...state,allProducts:action.payload }
        default:
            return { ...state }
    }

}

export const getAllProductsAction=()=> async (dispatch, getState)=>{

    dispatch({
        type: LOADING
    })
    try {
        const res = await axios.get('http://elangel.tendigt.com/?action=products')
        //console.log("Productos");
       // console.log(res);
        dispatch({
            type: UPDATE_PRODUCTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }

}

