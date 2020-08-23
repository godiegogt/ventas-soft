import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from 'react-redux'

//Redux Actions
import {loginAction,clearErrosAction} from '../redux/ducks/User'


import { Input, Button } from 'react-native-elements';

//Elements
import Alert from "../components/elements/Alert";

const LoginScreen = ({ navigation }) => {

const [username,setUserName]=React.useState();
const [pass,setPass]=React.useState();
const dispatch=useDispatch();
const user = useSelector(state => state.user);

const [alertInfo,setAlertIndo]=React.useState();

const login=()=>{
console.log(pass);
console.log(username);
//loginAction(user,pass);


    dispatch(loginAction(username,pass));


}

const clearErrors=()=>{
    console.log(user);
    dispatch(clearErrosAction());
}



    return (
        <View style={styles.container}>
            <Image
                style={styles.logoimage}
                source={require('../assets/img/ventas1.png')}
            />
            <View style={styles.formLogin}>
                <Input
                    placeholder='Ingrese su usuario'
                    onChangeText={(username)=>setUserName(username)}
                    inputStyle={{'color': '#555'}}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='#777'
                        />
                    }
                />
               
                <Input
                    placeholder='Ingrese su contraseña'
                    inputStyle={{'color': '#555'}}
                    onChangeText={pass=>setPass(pass)}
                    
                    
                    leftIcon={
                        <Icon 
                            name='unlock-alt'
                            size={24}
                            color='#777'
                        />
                    }
                />
               
                <Button
                    raised
                    title="Login"
                    containerStyle={{width:'100%',backgroundColor:'#000'}}
                    backgroundColor={"#000"}
                    inputStyle={{'color': 'red'}}
                    onPress={()=>login()}
                />
            </View>

            <Alert modalState={!user.user_error==''?true:false} modalAction={clearErrors} alarmType='alert' description={user.user_error} buttonTitle='Entendido' />




        </View>
    )
}



export default LoginScreen

const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor:'#f7f7f7'



    },
    logoimage: {
        width: 200,
        height: 200,
        marginTop: 40
    },
    formLogin: {
        flex: 1,
        marginTop: 40,
        width: 300,
        alignItems: 'center'
    }

})
