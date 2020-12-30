import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
// COMPS
import Input from '../../utils/Input'

const VisibilityForm = (props) => {

    // PROPS
    const { isPublic, setIsPublic, setPassword } = props

    // HANDLE CLICK
    const handleClick = () => {
        setIsPublic(!isPublic)
    }

    return (
        <View style={styles.ctn}>
            <View style={[styles.choice_ctn, !isPublic ? {marginBottom: 20} : {}]}>
                    <View style={styles.left_ctn}>
                        <Text style={[styles.text, isPublic ? styles.active : {}]}>Publique</Text>
                    </View>
                    <TouchableWithoutFeedback style={[styles.mid_ctn, isPublic ? styles.active : {alignItems: 'flex-end'}]}onPress={() => handleClick()}>
                        <View style={styles.btn}>

                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.right_ctn}>
                        <Text style={[styles.text, !isPublic ? styles.active : {}]}>Privée</Text>
                    </View>    
            </View>
        
            <View style={[styles.input_ctn, !isPublic ? {display : 'flex'} : {display: 'none'}]}>
                <Input
                    placeholder="Ajoutez un mot de passe..."
                    svg="KeySvg"
                    width="100%"
                    onChangeText={setPassword}
                />
                <Text style={styles.input_text_infos}>Ne partagez ce mot de passe qu'avec les personnes dont vous autorisez l’accès à votre liste.</Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    ctn: {
        //height: 130,
        justifyContent: 'space-between',
        marginBottom: 30,
        //backgroundColor: 'red'
    },
    choice_ctn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        flex:1,
    },
    left_ctn: {
        position: 'absolute',
        left: 0
    },
    mid_ctn: {
        backgroundColor: 'white',
        width: 75,
        height: 40,
        borderRadius: 19.5,
        borderWidth: 2,
        borderColor: '#B1C3D0',
        justifyContent: 'center',
        padding: 5,

    },
    btn: {
        backgroundColor: '#B1C3D0',
        width: '42%',
        height: '100%',
        borderRadius: 20,
    },
    right_ctn: {
        position: 'absolute',
        right: 0
    },
    text: {
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
        color: '#B1C3D0'
    },
    active: {
        color: '#FA7A47',
        fontFamily: 'Montserrat-SemiBold'
    },
    input_ctn: {
        width: '100%'
    },
    input_text_infos: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 11,
        color: '#989898',
    }
})

export default VisibilityForm