import axios from 'axios'

//Initial data
const dataInicial = {
    loading: false,
    activo: false,
    user_id: '',
    user_error: ''
}

//Constants
const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
//const SIGNIN_EXITO='SIGNIN_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'
const CLEAR_ERRORS = 'CLEAR_ERRORS'


//reducer
export default function userReducer(state = dataInicial, action) {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case USER_ERROR:
            return { ...state, user_error: action.payload,loading:false }
        case USER_EXITO:
            return { ...state,user_error:'', loading: false, activo: true,...action.payload }
        case CERRAR_SESION:
            return { ...dataInicial }
        case CLEAR_ERRORS:
            return { ...dataInicial }
        default:
            return state
    }

}




export const closeSessionAction = () => (dispatch) => {

    dispatch({
        type: CERRAR_SESION

    })
}

export const clearErrosAction = () => (dispatch) => {
console.log("Despachamos limpieza");
    dispatch({
        type: CLEAR_ERRORS

    })
}

export const loginAction = (user, pass) => async (dispatch) => {

 try {
    console.log("user")
    console.log(user)

    console.log("pass")
    console.log(pass)
    //Validamos que no hayan campos vacíos.
    if (user === undefined || pass === undefined) {

        dispatch({
            type: USER_ERROR,
            payload: 'Debe rellenar todos los campos.'

        })
        return;
    }


    dispatch({
        type: LOADING
    })


    let data = {};
    //Realizamos conexión
    console.log("Intento de conexion")
    await axios.post(`http://elangel.tendigt.com/api/auth.php`, { "username": user, "password": pass })
        .then(res => {
            console.log("Axios");
            //console.log(res);
            console.log(res.data);
            data = res.data;
            console.log("No errores");
            return

        })
        .catch((err)=>{
            console.log("Catchamos un error")
        });

        console.log("Verificamos que jodidos tiene data");
        console.log(data);
    let type = '';
    //Validamos que la petición tenga datos.

        //Validamos si el usuario se pudo autenticar.
        console.log("Verificacion si esta autenticado")
        if (data.status === 'auth') {
            dispatch({
                type: USER_EXITO,
                payload: data.user
            });

            return;

        } else if (data.status === 'notauth') {
            dispatch({
                type: USER_ERROR,
                payload: 'No se ha podido autenticar, las credenciales no coinciden.'
            });

            return;

        }

       


        //Ha ocurrido algún error
   
        console.log("Fase final")
        dispatch({
            type: USER_ERROR,
            payload: 'No se ha podido conectar con el servidor.'
        });

 } catch (error) {
     console.log("Catchamos el ultimo error")
 }
    

}