import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
// STYLE
import { CameraSvg } from '../../utils/svg/index_svg'

const IdeaCreationPhoto = (props) => {

    // PROPS
    const { handleClick, photoPATH } = props

    return (
        <TouchableHighlight style={styles.btn} onPress={() => handleClick(true)}>
            <ImageBackground style={styles.ctn} imageStyle={{borderRadius: 5}} source={{uri:photoPATH}}>
                {photoPATH ? 
                    <></> :
                    <>
                    <CameraSvg />
                    <Text style={styles.empty_text}>Ajoutez une photo</Text>    
                    </>                
                }
            </ImageBackground>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 220,
        height: 220,
        backgroundColor: '#FA7A47',
        borderRadius: 5,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctn: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_text: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginTop: 5
    }
})

export default IdeaCreationPhoto