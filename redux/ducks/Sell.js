import axios from 'axios'
const { v4: uuidv4 } = require('uuid');
//Initial data
const dataInicial = {
    loading: false,
    products: [{
        "amount": "12",
        "barcode": "",
        "brand_id": null,
        "category_id": null,
        "code": "",
        "created_at": "2020-06-28 22:50:42",
        "description": "",
        "expire_at": "0000-00-00",
        "height": "0",
        "id": "2",
        "image": "",
        "inventary_min": "20",
        "is_active": "1",
        "kind": "1",
        "name": "Te Chirrepeco Paca",
        "presentation": "Paca",
        "price_in": "42.5",
        "price_out": "48.5",
        "unit": "Paca",
        "user_id": "3",
        "weight": "0",
        "width": "0",
        "uuid":"1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
    }]
}

const LOADING = 'LOADING'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const DELETE_PRODUCTS = 'DELETE_PRODUCTS'

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

        default:
            return { ...state }
    }

}

export const addProductAction = (product,amount) => (dispatch) => {

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


function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}