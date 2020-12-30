import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const GuideFooter = (props) => {
    return (
        <View style={styles.ctn}>
            <Text style={styles.text}>Besoin d'aide ? </Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btn_text}>Guide d'utilisation</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ctn: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black'
    },
    btn_text: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#FA7A47'
    }
})

export default GuideFooter