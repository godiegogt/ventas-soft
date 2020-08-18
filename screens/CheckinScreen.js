import React from 'react'
import { StyleSheet, Text, View, ScrollView, Picker,TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import RadioButton,{RadioButtonCustomers}  from '../components/elements/RadioButton'

import { SearchBar, Input, Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";
import { materialTheme } from "../constants/";
import { useDispatch, useSelector } from 'react-redux'

    //Import actions
    import { addCustomerAction } from "../redux/ducks/Customer";

const PROP = [
	{
		key: 'samsung',
		text: 'Samsung',
	},
	{
		key: 'apple',
		text: 'Apple',
	},
	{
		key: 'motorola',
		text: 'Motorola',
	},
	{
		key: 'lenovo',
		text: 'Lenovo',
  },
];

const CheckinScreen = ({navigation}) => {
   
    const [paymentstate, setpaymentstate] = React.useState('Credito');
    const [deliverystate, setdeliverystate] = React.useState('Entregado');
    const [paymentype, setpaymentype] = React.useState('Efectivo');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [customerSelected, setCustomerSelected] = React.useState('')
    const [invoiceNo, setInvoiceNo] = React.useState('')
    const [cash, setCash] = React.useState('');
    const [descount, setDescount] = React.useState('');
    
    
    //Inf Customer
    const [name, setName] = React.useState('1');
    const [DPI, setDPI] = React.useState('2');
    const [NIT, setNIT] = React.useState('3');
    const [adress, setAdress] = React.useState('4');
    const [phone, setPhone] = React.useState('5');
    const [search,setSearch]=React.useState();
    let [searchdata,setSearchdata]=React.useState();
    let [total,setTotal]=React.useState();

    //Initilization of dispatch from redux
    const dispatch=useDispatch();

    //Selectors 
    let customers=useSelector(state => state.customer.allCustomers);
    let products=useSelector(state => state.sell.products);



     React.useEffect(()=>{

        calcTotal();



     },[]);

     React.useEffect(() => {
       
        calcTotal();
      
    }, [products]);

    const calcTotal=()=>{
        console.log("Store:")
        console.log(products);
        let temp=0;
        products.map((item)=>{
            temp=temp+item.price_in*item.amount;

        });
        setTotal(temp);
    }



    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // Screen was focused
          // Do something
        });
        console.log("CUstomers:")
        console.log(customers)
    
        return unsubscribe;
      }, [navigation]);

      const searchfunction = (search) => {
        setSearch(search);
        if (search==='') {
            setSearchdata([]);
            return
        }
        setSearchdata(
            customers.filter(function (data) {
                return data.name.toLowerCase().includes(search.toLowerCase()) 

            })
        );

    }

      const changeCustomer=(id)=>{

        setCustomerSelected(id)
          
      }

      const createCustomer=()=>{
          const customer={name,DPI,NIT,phone,adress}

          dispatch(addCustomerAction(customer))
          setModalVisible(false) 
      }

      const createSell=()=>{
        console.log(invoiceNo);
          console.log(paymentstate);
          console.log(deliverystate);
          console.log(paymentype);
          console.log(customerSelected);
          console.log(cash);
          console.log(descount);
          console.log(products);
        //navigation.navigate('Seller');
      }

    return (
        <View style={{ width: '100%' }}>
            <ScrollView style={styles.card}>

                <SearchBar
                    placeholder="NIT"
                    containerStyle={{ width: '100%', backgroundColor: 'transparent', borderColor: 'transparent' }}
                    onChangeText={(search)=>searchfunction(search)}
                    inputStyle={{ color: '#777', fontSize: 16 }}
                    lightTheme={true}
                    value={search}
                    round={true}
                />
                <Button
                    onPress={() => {
                        setModalVisible(true);
                    }}

                    buttonStyle={{ borderRadius: 10 }}
                    icon={
                        <Icon
                            name="plus-circle"
                            size={15}
                            color="white"
                            marginBottom={40}
                        />
                    }
                    title="Agregar cliente"
                />

                {searchdata?<RadioButtonCustomers 
                customers={searchdata} 
                valueSelected={changeCustomer}
                />: <Text style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold', color: '#777' }}>No hay resultados en su búsqueda.</Text>}

                <Text>{customerSelected}</Text>
               
                <Input
                    placeholder='Número de fáctura'
                    inputStyle={{ color: '#777', fontSize: 16 }}
                    onChangeText={(invoiceNo)=>{setInvoiceNo(invoiceNo)}}
                />

                <Picker
                    selectedValue={paymentstate}
                    style={{ borderWidth: 4, borderColor: '#f7f7f7' }}
                    onValueChange={(itemValue, itemIndex) => setpaymentstate(itemValue)}
                >
                    <Picker.Item label="Pagado" value="Pagado" />
                    <Picker.Item label="Pendiente" value="Pendiente" />
                    <Picker.Item label="Cancelado" value="Cacelado" />
                    <Picker.Item label="Credito" value="Credito" />
                </Picker>

                <Picker
                    selectedValue={deliverystate}
                    style={{ borderWidth: 4, borderColor: '#f7f7f7' }}
                    onValueChange={(itemValue, itemIndex) => setdeliverystate(itemValue)}
                >
                    <Picker.Item label="Entregado" value="Entregado" />
                    <Picker.Item label="Pendiente" value="Pendiente" />
                    <Picker.Item label="Cancelado" value="Cacelado" />
                </Picker>

                <Picker
                    selectedValue={paymentype}

                    onValueChange={(itemValue, itemIndex) => setdeliverystate(itemValue)}
                >
                    <Picker.Item label="Efectivo" value="Efectivo" />
                    <Picker.Item label="Deposito" value="Deposito" />
                    <Picker.Item label="Cheque" value="Cheque" />
                </Picker>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text h4 style={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}>Descuento</Text>
                        <Input
                            placeholder='0%'
                            inputStyle={{ color: '#777', fontSize: 16 }}
                            onChangeText={(descount)=>{setDescount(descount)}}

                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text h4 style={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}>Efectivo</Text>
                        <Input
                            placeholder='Q 0.00'
                            inputStyle={{ color: '#777', fontSize: 16 }}
                            onChangeText={(cash)=>{setCash(cash)}}

                        />
                    </View>

                </View>

                <Text style={{ padding: 10, alignSelf: 'flex-end', fontSize: 16, color: '#777', fontWeight: 'bold' }}>Total: Q {total}</Text>
                <Button
                    onPress={() => {
                        createSell();
                    }}
                    title="Finalizar venta"
                    buttonStyle={{ backgroundColor: materialTheme.colors.success, borderRadius: 5, marginBottom: 40 }}


                />



            </ScrollView>

            <Modal isVisible={modalVisible}>
                <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, maxHeight: 500,borderRadius: 20 }}>
                    <Text style={{ fontSize: 18, color: '#555', fontWeight: 'bold' }}>Crear nuevo cliente</Text>
                    <Input
                        
                        placeholder='Nombre completo'
                        inputStyle={{ color: '#777', fontSize: 18 }}
                        onChangeText={(name)=>{setName(name)}}

                    />
                   
                    <Input
                        placeholder='NIT'
                        inputStyle={{ color: '#777', fontSize: 18 }}
                        onChangeText={(NIT)=>{setNIT(NIT)}}

                    />
                    <Input
                        placeholder='DPI'
                        inputStyle={{ color: '#777', fontSize: 18 }}
                        onChangeText={(DPI)=>{setDPI(DPI)}}

                    />
                    <Input
                        placeholder='Dirección'
                        inputStyle={{ color: '#777', fontSize: 18 }}
                        onChangeText={(adress)=>{setAdress(adress)}}

                    />
                    <Input
                        placeholder='Teléfono o celular'
                        inputStyle={{ color: '#777', fontSize: 18 }}
                        onChangeText={(phone)=>{setPhone(phone)}}

                    />
                    <View style={{ position: 'absolute', right: 10, top: 10 }}>
                        <TouchableOpacity
                            style={{padding:10}}
                            onPress={() => { console.log('Presionado'); setModalVisible(false) }}>
                            <Icon
                                name="times"
                                size={20}
                                color="#555"

                            />
                           
                        </TouchableOpacity>
                    </View>
                    <Button

                        onPress={() => { createCustomer() }}

                        buttonStyle={{ borderRadius: 10 }}
                        icon={
                            <Icon
                                name="plus-circle"
                                size={15}
                                color="white"
                                marginBottom={40}
                            />
                        }
                        title="Crear cliente"
                    />

                </View>

            </Modal>

        </View>
    )
}

export default CheckinScreen

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    card: {
      
        padding: 15,
        width: '100%',
   
        backgroundColor: '#fff',
       
 
    },
    container: {
        flex: 1,

        padding: 15,
        backgroundColor: 'white',

    }
})
