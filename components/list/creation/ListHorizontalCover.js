import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react/cjs/react.development'
// STYLE
import { CameraSvg } from '../../../utils/svg/index_svg'
// FIREBASE
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'
// REDUX
import { useSelector } from 'react-redux'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'

const ListHorizontalCover = (props) => {

    // PROPS
    const { handleClick, listId } = props

    // LOCAL STATE
    const [photoURL, setPhotoURL] = useState("")

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // LISTEN TO COVER PICTURE CHANGE
    useEffect(() => {
        const valueChange = database()
            .ref(`/users/${UserData.userID}/lists/${listId}/coverURL`)
            .on('value', (snapshot) => {
                setPhotoURL(snapshot.val())
            })
        return () => {
            database()
                .ref(`/users/${UserData.userID}/lists/${listId}/coverURL`)
                .off('value', valueChange)
        }
    }, [UserData])

    if (photoURL === null)
        return (
            <TouchableOpacity style={styles.ctn} onPress={() => handleClick(true)}>
                <CameraSvg />
                <Text style={styles.text}>Photo de couverture</Text>                
            </TouchableOpacity>
        )
    else
        return (
            <TouchableOpacity style={styles.ctn} onPress={() => handleClick(true)}>
                <ImageBackground source={{uri: photoURL ? photoURL : null}} style={styles.bg_img} imageStyle={{borderRadius: 5}}>
                    <LinearGradient
                    colors={['#FFFFFF00', '#00000099']}
                    style={styles.shader}
                    start={{x : 0.519, y : 1.734}}
                    end={{x : 0.5, y : 0}}
                    >
                        <Text style={styles.text}>Photo de couverture</Text>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>            
        )
}

const styles = StyleSheet.create({
    ctn: {
        width: '100%',
        height: 115,
        borderRadius: 5,
        backgroundColor: '#FA7A47',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },
    text: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginTop: 3
    },
    bg_img: {
        width: '100%',
        height: '100%'
    },
    shader: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ListHorizontalCover