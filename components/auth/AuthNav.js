import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const AuthNav = (props) => {

    // PROPS
    const { to, text, link, navigation} = props;

    return (
        <View style={styles.nav_signup}>
            <Text style={styles.signup_text}>{text}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(to)}>
                <Text style={[styles.signup_text, styles.signup_btn]}>{link}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nav_signup: {
        flex: 11,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    signup_text:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginRight: 7
    },
    signup_btn: {
        color: '#FA7A47'
    }
})

export default AuthNav;