import React from 'react'
import { StyleSheet, Text, View,ScrollView, TouchableOpacity } from 'react-native'

import { SearchBar,Input,Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";

const SellerScreen = ({ navigation }) => {
    const [search,setSearch]=React.useState();
    return (
        <ScrollView style={styles.container}>
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Buscar productos por nombre o por código:</Text>
            <SearchBar
                placeholder="Buscar productos..."
                containerStyle={{width:'100%',backgroundColor:'transparent',borderColor:'transparent'}}
                onChangeText={(search)=>setSearch(search)}
                lightTheme={true}
                value={search}
                round={true}

               
            />
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' ,color:'#777'}}>Resultados de la búsqueda:</Text>
            <View style={styles.card}>
                <View style={styles.cardList}>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Código: 12244
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Nombre: La chula
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Unidad: Fardo
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Precio unitario: Q 10.00
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            En inventario: 44
                        </Text>
                    </View>
                </View>
              

                <View style={styles.cardButtons}>
                    <View style={{flex:1}}>
                    <Input
                        containerStyle={{margin:0}}
                        placeholder='Cantidad'
                    />

                    </View>
                    <View style={{flex:1,height:40}}>
                    <Button
                        containerStyle={{height:100}}
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
                <Text  h4 style={{alignSelf:'flex-end'}}> Subtotal: Q 150.00</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.cardList}>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Código: 12244
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Nombre: La chula
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Unidad: Fardo
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            Precio unitario: Q 10.00
                        </Text>
                    </View>
                    <View style={styles.cardListItem}>
                        <Text style={styles.cardListText}>
                            En inventario: 44
                        </Text>
                    </View>
                </View>
              

                <View style={styles.cardButtons}>
                    <View style={{flex:1}}>
                    <Input
                        containerStyle={{margin:0}}
                        placeholder='Cantidad'
                    />

                    </View>
                    <View style={{flex:1,height:40}}>
                    <Button
                        containerStyle={{height:100}}
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
                <Text  h4 style={{alignSelf:'flex-end'}}> Subtotal: Q 150.00</Text>
            </View>
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
            width: 0,
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
