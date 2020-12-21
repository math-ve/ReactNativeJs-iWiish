import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
// STYLE
import GoogleSvg from '../../assets/svg/google.svg'
import FacebookSvg from '../../assets/svg/facebook.svg'

const AuthSocials = (props) => {

    // PROPS
    const { createNewUserWithGoogle, createNewUserWithFacebook } = props

    return (
        <View style={styles.social_auth_container}>
            <TouchableOpacity style={[styles.social_svg_container, styles.shadow]} onPress={() => createNewUserWithGoogle()}>
                <GoogleSvg/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.social_svg_container, styles.shadow]} onPress={() => createNewUserWithFacebook()}>
                <FacebookSvg/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    social_auth_container: {
        flexDirection: 'row',
        flex: 19,
        justifyContent: 'space-between',
        width: '47%',

    },
    social_svg_container: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 100,
        borderColor: '#B1C3D0',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.40,
        shadowRadius: 4.65,
        elevation: 8,
    }
})

export default AuthSocials;