import React, { useState } from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableOpacity,FlatList } from 'react-native'

import { SearchBar,Input,Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";
import { materialTheme } from "../constants/";
import { useDispatch, useSelector, connect } from 'react-redux'

import {getAllProductsAction} from '../redux/ducks/Products'
import {getAllCustomersAction} from '../redux/ducks/Customer'

import {addProductAction} from '../redux/ducks/Sell'
import {deleteProductAction} from '../redux/ducks/Sell'


import AsyncStorage from '@react-native-community/async-storage';



const Product=({item})=>{
    const [amount,setAmount]=useState(0);
    const dispatch=useDispatch();
    let productsdetaildata = [];

 
        productsdetaildata=useSelector(state => state.sell.products);
  

    const addProduct=async ()=>{

       dispatch(addProductAction(item,amount));
  

    }
    
    return(
        <View style={styles.card}>
        <View style={styles.cardList}>
            <View style={styles.cardListItem}>
                <Text style={styles.cardListText}>
                    Código: {item.id}
                </Text>
            </View>
            <View style={styles.cardListItem}>
                <Text style={styles.cardListText}>
                    Nombre: {item.name}
                </Text>
            </View>
            <View style={styles.cardListItem}>
                <Text style={styles.cardListText}>
                    Unidad: {item.unit}
                </Text>
            </View>
            <View style={styles.cardListItem}>
                <Text style={styles.cardListText}>
                    Precio unitario: Q {item.price_out}
                </Text>
            </View>
            <View style={styles.cardListItem}>
                <Text style={styles.cardListText}>
                    En inventario: {item.inventary_min}
                </Text>
            </View>
        </View>
      

        <View style={styles.cardButtons}>
            <View style={{flex:1}}>
            <Input
                containerStyle={{margin:0}}
                placeholder='Cantidad'
                onChangeText={(amount)=>{setAmount(amount)}}
            />
            

            </View>
            <View style={{flex:1,height:40}}>
            <Button
                containerStyle={{height:100}}
                onPress={(item,amount)=>{addProduct()}}
                icon={
                    <Icon
                        name="plus-circle"
                        size={15}
                        color="white"
                        marginBottom={40}
                    />
                }
                title="Agregar"
            />

            </View>



        </View>
            <Text  h4 style={{alignSelf:'flex-end'}}> Subtotal: Q {item.price_out*amount}</Text>
    </View>
    )
}

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

const SellerScreen = ({ navigation ,products1}) => {
    const [search,setSearch]=React.useState('');
    
    const productsdata = useSelector(state => state.products.allProducts);
    let productsdetaildata = useSelector(state => state.sell);
    const dispatch=useDispatch();
    let [searchdata,setSearchdata]=React.useState();
    let [total,setTotal]=React.useState();
   
        

    
    React.useEffect(() => {
        dispatch(getAllProductsAction());
        dispatch(getAllCustomersAction());

        // console.log("Mi Estore Store:")
        // console.log("-------------------------------------------------------")
        // console.log(productsdetaildata.products);
        calcTotal();
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
              stores.map((result, i, store) => {
                console.log('log async: ',{ [store[i][0]]: store[i][1] });
                return true;
              });
            });
          });

          console.log("Productos:");
          console.log(products1);
      
    }, []);

    React.useEffect(() => {
       
        calcTotal();
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
              stores.map((result, i, store) => {
                console.log('log async: ',{ [store[i][0]]: store[i][1] });
                return true;
              });
            });
          });
      
    }, [productsdetaildata.products]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           //productsdetaildata = useSelector(state => state.sell);
          // Do something
          setSearch('');
        });
        
    
        return unsubscribe;
      }, [navigation]);

    const calcTotal=()=>{
      
        let temp=0;
        productsdetaildata.products.map((item)=>{
            temp=temp+item.price_out*item.amount;

        });
        setTotal(temp);
    }

    const searchfunction = (search) => {
        setSearch(search);
        if (search==='') {
            setSearchdata([]);
            return
        }
        setSearchdata(
            productsdata.filter(function (data) {
                return data.name.toLowerCase().includes(search.toLowerCase()) 

            })
        );

    }


    return (
        <ScrollView style={styles.container}>
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Buscar productos por nombre o por código:</Text>
            <SearchBar
                placeholder="Buscar productos..."
                containerStyle={{width:'100%',backgroundColor:'transparent',borderColor:'transparent'}}
                onChangeText={(search)=>searchfunction(search)}
                lightTheme={true}
                value={search}
                round={true}

               
            />
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' ,color:'#777'}}>Resultados de la búsqueda:</Text>

            <FlatList
                data={searchdata}
                renderItem={({ item }) => <Product item={item}/> }
                keyExtractor={(item) => item.id}
                
            />
        
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' ,color:'#777'}}>Detalle de venta:</Text>

            <FlatList
                data={productsdetaildata.products}
                renderItem={({item}) => <DetailSell item={item} />}
                keyExtractor={(item) => item.uuid}

            />



            <Text style={{alignSelf:'flex-end',color:materialTheme.colors.primary,fontSize:20,fontWeight:'bold'}}>
            
            Total: Q {total}
            </Text>

            <Button
                        containerStyle={{height:70}}
                        title="Vender"
                        buttonStyle={{backgroundColor:materialTheme.colors.success,borderRadius:5}}
                        onPress={()=>navigation.navigate('Checkin')}
                    />


            

            

        </ScrollView>
    )
}


export default SellerScreen

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
