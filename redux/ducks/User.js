import axios from 'axios'

//Initial data
const dataInicial = {
    loading: false,
    activo: true,
    user_id:1,
    user_error:''
}

//Constants
const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
//const SIGNIN_EXITO='SIGNIN_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'


//reducer
export default function userReducer(state = dataInicial, action) {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case USER_ERROR:
            return { ...state,user_error:action.payload }
        case USER_EXITO:
            return { ...state, loading: false, activo: true }
        case CERRAR_SESION:
            return { ...dataInicial}
        default:
            return { ...state }
    }

}




export const cerrarSesionAccion = () => (dispatch) => {

    dispatch({
        type: CERRAR_SESION
       
    })
}

export const loginAction = (user,pass) => async (dispatch) => {

    dispatch({
        type: LOADING
    })

  
        console.log("user")
        console.log(user)
        
        console.log("pass")
        console.log(pass)
        let data={}
        
        await axios.post(`http://elangel.tendigt.com/api/auth.php`, { "username":user,"password":pass })
        .then(res => {
            console.log("Axios");
          //console.log(res);
          console.log(res.data);
          data=res.data;
          
        })

        

      
        let type='';
        if(data.status==='auth'){
            type=USER_EXITO;

        }else{
            type=USER_ERROR;

        }
        console.log("Type: "+type)
        dispatch({
            type: type,
            payload: {
                //user: res.user.uid,
                //pass: res.user.email
            }
        })
//         localStorage.setItem('usuario', JSON.stringify({
//         uid: res.user.uid,
//         email: res.user.email
// }))

  
}