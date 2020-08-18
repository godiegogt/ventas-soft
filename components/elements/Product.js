const Product=({item})=>{
    const [amount,setAmount]=useState(0);
    const dispatch=useDispatch();
    let productsdetaildata = [];

 
        productsdetaildata=useSelector(state => state.sell.products);
  

    const addProduct=async ()=>{
       console.log('product');
       console.log(item);
       console.log('amount');
       console.log(amount);
       dispatch(addProductAction(item,amount));
       console.log('------Store products-------------');
        console.log(productsdetaildata);

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
                    Precio unitario: Q {item.price_in}
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
            <Text  h4 style={{alignSelf:'flex-end'}}> Subtotal: Q {item.price_in*amount}</Text>
    </View>
    )
}


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
