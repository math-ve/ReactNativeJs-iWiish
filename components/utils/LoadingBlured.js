import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
// DEPENDENCIES
import { BlurView } from '@react-native-community/blur'

const LoadingBlured = (props) => {

    // PROPS
    const { text } = props

    return (
        <View style={styles.ctn}>
            <BlurView
                style={[styles.ctn]}
                blurType="dark"
                blurAmount={7}
                reducedTransparencyFallbackColor="#989898"
                
            />
            <Text style={styles.text}>{text}</Text>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}

const styles = StyleSheet.create({
    ctn: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'        
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 10,
        textAlign: 'center'
    }
})

export default LoadingBlured