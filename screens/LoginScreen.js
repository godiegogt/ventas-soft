import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";

import { Input, Button } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logoimage}
                source={require('../assets/img/ventas1.png')}
            />
            <View style={styles.formLogin}>
                <Input
                    placeholder='Ingrese su usuario'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />

                <Input
                    placeholder='Ingrese su contraseña'
                    inputStyle={{'color': 'red'}}
                    containerStyle={{color:'#000'}}
                    
                    leftIcon={
                        <Icon 
                            name='unlock-alt'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Button
                    raised
                    title="Login"
                    containerStyle={{width:'100%',backgroundColor:'#000'}}
                    backgroundColor={"#000"}
                    inputStyle={{'color': 'red'}}
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
