import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'

const GradiantButton = (props) => {

    // PROPS
    const { handleClick, btnText } = props

    return (
        <View style={styles.ctn}>
            <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
                <LinearGradient
                    colors={['#FA7A47', '#FF5791']}
                    style={{flex : 1}}
                    start={{x : 0.013, y : 1}}
                    end={{x : 1.829, y : -1.093}}
                    style={styles.btn_gradiant}
                >
                    <Text style={styles.text}>{btnText}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ctn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_gradiant: {
        justifyContent: 'center',
        borderRadius: 10,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:35,
        paddingRight:35,
        justifyContent: 'center',
        elevation: 10
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 19,
        fontFamily: 'Quicksand-Bold',
        color: 'white',
        paddingBottom:3
    }
})

export default GradiantButton