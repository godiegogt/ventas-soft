import React, { useState } from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableOpacity,FlatList } from 'react-native'

import { SearchBar,Input,Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";
import { materialTheme } from "../../constants/";
import { useDispatch, useSelector, connect } from 'react-redux'

import {getAllProductsAction} from '../../redux/ducks/Products'
import {getAllCustomersAction} from '../../redux/ducks/Customer'

import {addProductAction} from '../../redux/ducks/Sell'
import {deleteProductAction} from '../../redux/ducks/Sell'


import AsyncStorage from '@react-native-community/async-storage';


const DetailSell=({item})=>{

    const dispatch=useDispatch();

    const deleteProduct=()=>{
       

        dispatch(deleteProductAction(item));
        
      
    }

    return(
        <View style={{...styles.card,flexDirection:'row'}}>
        <View style={{flex:5,marginLeft:20}}>

            <Text style={{fontSize:20,fontWeight:'bold',color:materialTheme.colors.primary}}>
                <Text>
                {item.name}/ {item.unit}/{item.amount} Unidades
                </Text>
            </Text>
            <Text style={{color:materialTheme.colors.primary}}>
            Q {item.price_out*item.amount}
            </Text>
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
            onPress={()=>{deleteProduct()}}
            >

                

            <Icon
                        name="trash"
                        size={30}
                        color="#DD0000"
                        marginBottom={40}
                    />
            </TouchableOpacity>

        </View>


    </View>
    )

}

export default DetailSell;


const styles = StyleSheet.create({
    

    cardButtons:{
        flexDirection:'row',
        
       

    },
    cardListText:{
        fontSize:16

    },
    cardListItem:{
        borderBottomColor:'#f7f7f7',
        borderBottomWidth:3,
        fontSize:16,
        alignItems:'center',
        padding:15
    },
    card: {
        borderRadius: 10,
        padding: 15,
        width:'100%',
        shadowColor: "#000",
        backgroundColor:'#fff',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
        marginBottom:18,
        marginTop:10
    },
    container: {
        flex: 1,
        
        padding: 15,
        backgroundColor: 'white'
    }

})
