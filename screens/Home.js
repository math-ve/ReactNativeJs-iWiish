import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';
// FIREBASE
import auth from '@react-native-firebase/auth'
// REDUX
import { useDispatch } from 'react-redux';
import { setCurrentUserID, setLogStatus, setCurrentUserData } from '../redux/actions/index_actions'

const HomeScreen = () => {

    // REDUX
    const dispatch = useDispatch();


    const SignOut = () => {
        dispatch(setCurrentUserID(null))
        dispatch(setLogStatus(false))
        dispatch(setCurrentUserData(null))
        auth().signOut()
    }

    return (
        <View>
            <Text>Home Page</Text>
            <Button title="SignOut" onPress={() => SignOut()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default HomeScreen