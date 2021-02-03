import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
// COMPS
import Svg from '../utils/Svg'
// android:windowSoftInputMode="adjustNothing">

const Input = (props) => {

    // PROPS
    const { placeholder, svg, width, onChangeText, defaultValue, maxLength, multiline, numberOfLines, ctnHeight, textAlignVertical, keyboardType } = props

    return (
        <View style={[styles.ctn, {width: width}, {height: ctnHeight}]}>
            <TextInput
                style={[styles.input, {textAlignVertical: textAlignVertical}]}
                placeholder={placeholder}
                maxLength={maxLength}
                placeholderTextColor='#989898'
                onChangeText={(text) => onChangeText(text)}
                defaultValue={defaultValue}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={textAlignVertical}
                keyboardType={keyboardType}
            />
            <View style={styles.svg_ctn}>
                <Svg svg={svg} />
            </View>
        </View>
    )
}

Input.defaultProps = {
    defaultValue: "",
    maxLength: 30,
    multiline: false,
    numberOfLines: 1,
    ctnHeight: 50,
    textAlignVertical: 'center',
    keyboardType: "default"
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
        flex: 1,
        height: '100%'
    },
    svg_ctn: {
        width: '12.5%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Input