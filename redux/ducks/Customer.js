import axios from 'axios'
//Initial data
const dataInicial = {
    loading: false,
    allCustomers: []
}

const LOADING = 'LOADING'
const UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS'
const ADD_CUSTOMER = 'ADD_CUSTOMERS'

export default function customersReducer(state = dataInicial, action) {
//console.log("It send customer");
//console.log(action.payload)

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case UPDATE_CUSTOMERS:

            return {
                ...state,
                allCustomers: [...action.payload]
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                allCustomers: [...state.allCustomers,action.payload]
            }
        default:
            return { ...state }
    }

}

export const getAllCustomersAction = () => async (dispatch, getState) => {


    dispatch({
        type: LOADING
    })
    try {
        const res = await axios.get('http://elangel.tendigt.com/?action=customers')
        // console.log("Clientes");
        // console.log(res.data);
        dispatch({
            type: UPDATE_CUSTOMERS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }

}

export const addCustomerAction = (customer) => async (dispatch, getState) => {
    const cus={ "name": "Di Argueta", "lastname": "Medina", "email": "", "image": null, "password": "", "created_at": "2020-06-28 23:12:05", "credit_limit": "0", "id": "10", "no": "c\/f", "company": null, "address1": "Ciudad", "address2": null, "phone1": " ", "phone2": null, "email1": " ", "email2": null, "is_active_access": "0", "has_credit": "0", "kind": "1" }

    // console.log("New customer:");
    // console.log(customer);
    customer.isNew=true;
    customer.id=guidGenerator();
    
    dispatch({
        type: ADD_CUSTOMER,
        payload:    customer
    })


}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

