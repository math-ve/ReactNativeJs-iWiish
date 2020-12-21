import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
// STYLE
import Logo from '../../assets/svg/iwiish_logo.svg'

const AuthHero = () => {
    return (
        <View style={styles.hero}>
            <ImageBackground source={require('../../assets/bg/auth_bg.png')} style={styles.hero_bg}>
                <Logo width={54} height={54}/>
                <Text style={styles.logo}>iWiish</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    hero: {
        flex: 1.2,
    },
    hero_bg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logo: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 36,
        color: 'white',
        opacity: 0.87,
        paddingBottom:8,
        marginLeft:10
    }
})

export default AuthHero;