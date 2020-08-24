import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from 'react-native-elements'

import { useSelector, useDispatch } from 'react-redux'

import { Images, materialTheme } from "../constants/";

//Actions
import {closeSessionAction} from '../redux/ducks/User'

export default function Profile() {

    const user=useSelector(state => state.user);

React.useEffect(() => {

    console.log(user);

}, [user])


    const dispatch=useDispatch();
    return (
        <View>
            <Text>Mi perfil</Text>

            <Button
                containerStyle={{ height: 70 }}
                title="Salir"
                buttonStyle={{ backgroundColor: materialTheme.colors.error, borderRadius: 5 }}
                onPress={() =>dispatch(closeSessionAction())}
            />

        </View>
    )
}

const styles = StyleSheet.create({})
