import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";


//Import elements
import Modal from 'react-native-modal'
import { SearchBar, Input, Button } from 'react-native-elements'
const Alert = ({modalAlert,changeModalAlert}) => {
    return (
       
            <Modal isVisible={modalAlert}>
                <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, maxHeight: 200, borderRadius: 20,justifyContent:'center',alignItems:'center' }}>
                    <Icon
                        name="exclamation-triangle"
                        size={60}
                        color="#ffd43b"
                        marginBottom={40}
                    />

                    <Text style={{ fontSize: 16, color: '#555', fontWeight: 'bold' }}>Complete todos los campos</Text>

                    <Button
                        onPress={() => { changeModalAlert() }}
                        buttonStyle={{ borderRadius: 10 }}
                        title="Ok"
                        containerStyle={{width:'80%'}}
                    />

                </View>

            </Modal>

        
    )
}

export default Alert

const styles = StyleSheet.create({})
