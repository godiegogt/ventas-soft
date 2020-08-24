import React, { useState } from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'

import { SearchBar,Input,Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";
import { materialTheme } from "../constants/";
import { useDispatch, useSelector, connect } from 'react-redux'


//Actions
import {getAllProductsAction} from '../redux/ducks/Products'
import {getAllCustomersAction} from '../redux/ducks/Customer'
 import {syncAllSellsAction} from '../redux/ducks/Sell'


//Elements
import Product from '../components/elements/Product'
import DetailSell from '../components/elements/DetailSell'


const SellerScreen = ({ navigation ,products1}) => {
    const [search,setSearch]=React.useState('');
    
    const productsdata = useSelector(state => state.products);
    const sellstate = useSelector(state => state.sell);
    let productsdetaildata = useSelector(state => state.sell);
    const dispatch=useDispatch();
    let [searchdata,setSearchdata]=React.useState([]);
    let [total,setTotal]=React.useState();
   
        

    
    React.useEffect(() => {
        dispatch(getAllProductsAction());
        dispatch(getAllCustomersAction());
        dispatch(syncAllSellsAction());
        calcTotal();


      
    }, []);

    React.useEffect(() => {
       console.log("Sells:");
       console.log(sellstate.sells);
    }, [sellstate])

    React.useEffect(() => {
       
        calcTotal();
      
    }, [productsdetaildata.products]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
           //productsdetaildata = useSelector(state => state.sell);
          // Do something
          setSearch('');
          setSearchdata([]);
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
            productsdata.allProducts.filter(function (data) {
                return data.name.toLowerCase().includes(search.toLowerCase()) 

            })
        );

    }


    return (

        <ScrollView style={styles.container}>
            
            {productsdata.loading=='false'
            ?<View>
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Buscar productos por nombre o por código:</Text>
            <SearchBar
                placeholder="Buscar productos..."
                containerStyle={{width:'100%',backgroundColor:'transparent',borderColor:'transparent'}}
                onChangeText={(search)=>searchfunction(search)}
                lightTheme={true}
                value={search}
                round={true}

               
            />
            {!(typeof searchdata != "undefined" && searchdata != null && searchdata.length != null && searchdata.length > 0)
            ?
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' ,color:'#777'}}>No hay resultados de búsqueda.</Text>
            :searchdata.map((item)=>{
              return  <Product item={item}/>
            })
            }

            {!(typeof productsdetaildata.products != "undefined" && productsdetaildata.products != null && productsdetaildata.products != null && productsdetaildata.products.length > 0)
            ?
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' ,color:'#777'}}>No tiene productos seleccionados.</Text>
            :
            <><Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' ,color:'#777'}}>Detalle de venta:</Text>
            {
                productsdetaildata.products.map((item,key)=>{
                  return  <DetailSell key={key} item={item} />
                })
            }</>
            }

            <Text style={{alignSelf:'flex-end',color:materialTheme.colors.primary,fontSize:20,fontWeight:'bold'}}>
            
            Total: Q {total}
            </Text>

            <Button
                        containerStyle={{height:70}}
                        title="Vender"
                        buttonStyle={{backgroundColor:materialTheme.colors.success,borderRadius:5}}
                        onPress={()=>navigation.navigate('Checkin')}
                    />
            </View>
            :<View>
                <ActivityIndicator size="large" color={materialTheme.colors.primary} />
            </View>
            }
           

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
