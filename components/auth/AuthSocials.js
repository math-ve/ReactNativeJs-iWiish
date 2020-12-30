import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
// STYLE
import GoogleSvg from '../../assets/svg/google.svg'
import FacebookSvg from '../../assets/svg/facebook.svg'
// FIREBASE
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
// DEPENDENCIES
import { LoginManager, AccessToken } from 'react-native-fbsdk'
// TOOLS
import { newUserDataWithGoogle, newUserDataWithFacebook } from '../../utils/user_creation/new_user_data'

const AuthSocials = (props) => {

    // CREATE USER WITH GOOGLE
    const createNewUserWithGoogle = async () => {
        const { idToken } = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredential)
            .then((res) => newUserDataWithGoogle(res))
    }
    
    // CREATE USER WITH FACEBOOK
    const createNewUserWithFacebook = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled)
            throw 'User cancelled the login process';
        const data = await AccessToken.getCurrentAccessToken();
        if (!data)
            throw 'Something went wrong obtaining access token';
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        auth().signInWithCredential(facebookCredential)
            .then((res) => newUserDataWithFacebook(res))
    }

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