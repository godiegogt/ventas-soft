import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from 'react-redux'

import {loginAction} from '../redux/ducks/User'


import { Input, Button } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {

const [user,setUser]=React.useState();
const [pass,setPass]=React.useState();
const dispatch=useDispatch();
const isLogin = useSelector(state => state.user.usererror)

const login=()=>{
console.log(pass);
console.log(user);
//loginAction(user,pass);
dispatch(loginAction(user,pass));

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
                    onChangeText={(user)=>setUser(user)}
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
