import React from 'react'
import { ActivityIndicator, StyleSheet, Button } from 'react-native'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
// FIREBASE
import auth from '@react-native-firebase/auth'
// REDUX
import { useDispatch } from 'react-redux'
import { setCurrentUserData, setLogStatus, setCurrentUserID } from '../redux/actions/index_actions'

const Loader = () => {

    // REDUX
    const dispatch = useDispatch()

    // const signOut = () => {
    //     auth().signOut()
    //     dispatch(setLogStatus(false))
    //     dispatch(setCurrentUserData(null))
    //     dispatch(setCurrentUserID(null))
    // }

    return (
        <LinearGradient
            colors={['#FA7A47', '#FF5791']}
            style={styles.ctn}
            start={{x : 0.013, y : 1}}
            end={{x : 1.829, y : 1}}
        >
            <ActivityIndicator
                size="large"
                style={styles.loader}
                animating={true}
                color="white"
            />
            {/* <Button title="SignOut" onPress={() => signOut()}/> */}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    ctn :{
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
    },
    loader: {
        color: 'white'
    }
})

export default Loader