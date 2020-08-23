import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";

import { materialTheme } from "../../constants/";


//Import elements
import Modal from 'react-native-modal'
import { SearchBar, Input, Button } from 'react-native-elements'
const Alert = ({ modalState, modalAction, alarmType, description, buttonTitle }) => {
    return (

        <Modal isVisible={modalState}>
            <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, maxHeight: 200, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>

                {alarmType === 'alert'
                    ?
                    <Icon
                        name="exclamation-triangle"
                        size={60}
                        color="#ffd43b"
                        marginBottom={40}
                    />
                    :
                    <Icon
                        name="check-circle"
                        size={60}
                        color={materialTheme.colors.success}
                        marginBottom={40}
                    />

                }

                <Text style={{ fontSize: 16, color: '#555', fontWeight: 'bold',textAlign:'center',padding:10 }}>{description}</Text>

                <Button
                    onPress={() => { modalAction() }}
                    buttonStyle={{ borderRadius: 10 }}
                    title={buttonTitle}
                    containerStyle={{ width: '80%' }}
                />

            </View>

        </Modal>


    )
}

export default Alert

const styles = StyleSheet.create({})
