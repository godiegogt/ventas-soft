import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import axios from 'axios'

import { Picker } from '@react-native-community/picker'

//Import elements
import RadioButton,{RadioButtonCustomers}  from '../components/elements/RadioButton'
import Alert from '../components/elements/Alert'

import { SearchBar, Input, Button } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";
import { materialTheme } from "../constants/";
import { useDispatch, useSelector } from 'react-redux'

    //Import actions
    import { addCustomerAction } from "../redux/ducks/Customer";
    import {createSellAction,clearProductsAction} from "../redux/ducks/Sell";

const CheckinScreen = ({navigation}) => {
   
    const [paymentstate, setpaymentstate] = React.useState(1);
    const [deliverystate, setdeliverystate] = React.useState(1);
    const [paymentype, setpaymentype] = React.useState(1);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [customerSelected, setCustomerSelected] = React.useState({})
    const [invoiceNo, setInvoiceNo] = React.useState('')
    const [cash, setCash] = React.useState('');
    const [descount, setDescount] = React.useState('');
    const [isSuccess, setIsSuccess] = React.useState(false);

    const [modalAlert,setModalAlert]=React.useState(false);
    
    
    //Inf Customer
    const [name, setName] = React.useState('1');
    const [DPI, setDPI] = React.useState('2');
    const [NIT, setNIT] = React.useState('3');
    const [address, setAddress] = React.useState('4');
    const [phone, setPhone] = React.useState('5');
    const [search,setSearch]=React.useState();
    let [searchdata,setSearchdata]=React.useState([]);
    let [total,setTotal]=React.useState();

    //Initilization of dispatch from redux
    const dispatch=useDispatch();

    //Selectors 
    let customers=useSelector(state => state.customer.allCustomers);
    let products=useSelector(state => state.sell.products);
    let user=useSelector(state => state.user);



     React.useEffect(()=>{

        console.log("CLientes:");
        console.log(customers);

        calcTotal();

        console.log("Search data:");
        console.log(searchdata);



     },[]);

     React.useEffect(() => {
       
        calcTotal();
      
    }, [products]);

    const calcTotal=()=>{
      
        let temp=0;
        products.map((item)=>{
            temp=temp+item.price_out*item.amount;

        });
        setTotal(temp);
    }



    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // Screen was focused
          // Do something
        });
       
    
        return unsubscribe;
      }, [navigation]);

      const searchfunction = (search) => {
        
        setCustomerSelected({});
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

        console.log("Search data:");
        console.log(searchdata);

    }

      const changeCustomer=(customer)=>{
          console.log("Custome");
          console.log(customer);

        setCustomerSelected(customer)
          
      }

      const createCustomer= ()=>{
          const customer={name,DPI,NIT,phone,address}

          dispatch(addCustomerAction(customer))
          setModalVisible(false) 
      }

      const createSell=async ()=>{
      

        if(invoiceNo!=='' && paymentstate!=='' && deliverystate!=='' && paymentype!=='' && customerSelected!=={} && products!=[]){


          let sell={
            customerSelected,
            products,
            user,
            
            invoiceData:{
                invoiceNo,
                paymentstate,
                deliverystate,
                paymentype,
                cash,
                descount,
                total
            },
            
            
          }

          console.log("Venta:");
          console.log(sell);

         dispatch(createSellAction(sell));
          //Liampiamos el carro ce compra
        //   dispatch(clearProductsAction());
          setIsSuccess(true);
          console.log("Productos:");
          console.log(products);
          



        }else{
            changeModalAlert();
        }


        
        //navigation.navigate('Seller');
      }

      //Set alert modal
      const changeModalAlert=()=>{
          setModalAlert(!modalAlert);
      }

      const completeProcess=()=>{
          setIsSuccess(false);
          navigation.navigate('Seller');
      }


    return (
        <View style={{ width: '100%' }}>
            <ScrollView style={styles.card}>

                <SearchBar
                    placeholder="Nombre del cliente"
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

                {(typeof searchdata != "undefined" && searchdata != null && searchdata.length != null && searchdata.length > 0)?<RadioButtonCustomers 
                customers={searchdata} 
                valueSelected={changeCustomer}
                selected={customerSelected}
                />: <Text style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold', color: '#777' }}>No hay resultados en su búsqueda.</Text>}

                
               
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
                    <Picker.Item label="Pagado" value={1} />
                    <Picker.Item label="Pendiente" value={2} />
                    <Picker.Item label="Cancelado" value={3} />
                    <Picker.Item label="Credito" value={4} />
                </Picker>

                <Picker
                    selectedValue={deliverystate}
                    style={{ borderWidth: 4, borderColor: '#f7f7f7' }}
                    onValueChange={(itemValue, itemIndex) => setpaymentype(itemValue)}
                >
                    <Picker.Item label="Entregado" value={1} />
                    <Picker.Item label="Pendiente" value={2} />
                    <Picker.Item label="Cancelado" value={3} />
                </Picker>

                <Picker
                    selectedValue={paymentype}

                    onValueChange={(itemValue, itemIndex) => setdeliverystate(itemValue)}
                >
                    <Picker.Item label="Efectivo" value={1} />
                    <Picker.Item label="Deposito" value={2} />
                    <Picker.Item label="Cheque" value={3} />
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

            <Alert modalState={modalAlert} alarmType='alert' modalAction={changeModalAlert} description="Debe completar todos los datos." buttonTitle="Entendido" />

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
                        onChangeText={(address)=>{setAddress(address)}}

                    />
                    <Input
                        placeholder='Teléfono o celular'
                        inputStyle={{ color: '#777', fontSize: 18 }}
                        onChangeText={(phone)=>{setPhone(phone)}}

                    />
                    <View style={{ position: 'absolute', right: 10, top: 10 }}>
                        <TouchableOpacity
                            style={{padding:10}}
                            onPress={() => {setModalVisible(false) }}>
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

            <Alert modalState={isSuccess} modalAction={completeProcess} description='¡Se ha creado con éxito la venta!' buttonTitle='Entendido' alarmType='success'/>


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
