import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

import { SearchBar } from 'react-native-elements'

const SellerScreen = ({ navigation }) => {
    const [search,setSearch]=React.useState();
    return (
        <View style={styles.container}>
            <Text h4 style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold' }}>Buscar productos por nombre o por código:</Text>
            <SearchBar
                placeholder="Type Here..."
                inputContainerStyle={{width:'100%'}}
                onChangeText={()=>setSearch(search)}
                value={search}

               
            />
            <Text>{search}</Text>
        </View>
    )
}

export default SellerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white'
    }

})
