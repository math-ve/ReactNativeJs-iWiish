import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
// COMPS
import Svg from '../utils/Svg'

const Input = (props) => {

    // PROPS
    const { placeholder, svg, width, onChangeText } = props

    return (
        <View style={[styles.ctn, {width: width}]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                maxLength={30}
                placeholderTextColor='#989898'
                onChangeText={(text) => onChangeText(text)}
            />
            <View style={styles.svg_ctn}>
                <Svg svg={svg} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ctn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#B1C3D0',
        borderRadius: 5,
        paddingLeft: 7,
        height: 50
    },
    input: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 16,
        flex: 1
    },
    svg_ctn: {
        width: '12.5%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Input