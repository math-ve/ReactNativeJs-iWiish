import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { useEffect, useState } from 'react/cjs/react.development'
// STYLE
import { CameraSvg } from '../../../utils/svg/index_svg'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
// FIREBASE
import database from '@react-native-firebase/database'
// REDUX
import { useSelector } from 'react-redux'

const ListVerticalCover = (props) => {

    // PROPS
    const { handleClick, listId } = props

    // LOCAL STATE
    const [photoURL, setPhotoURL] = useState("")

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // SAVE ALL DATABASE CHANGES IN REDUX STATE
    useEffect(() => {
        const onValueChange = database()
        .ref(`/users/${UserData.userID}/lists/${listId}/photoURL`)
        .on('value', snapshot => {
            setPhotoURL(snapshot.val())
        })
        return () => {
        database()
            .ref(`/users/${UserData.userID}/lists/${listId}/photoURL`)
            .off('value', onValueChange)
        }
    }, [UserData])

    useEffect(() => {
        console.log(photoURL)
    },[photoURL])

    if (photoURL === null)
        return (
            <TouchableOpacity style={[styles.ctn, {padding: 17}]} onPress={() => handleClick(true)}>
                <CameraSvg />
                <Text style={styles.text}>Photo principale</Text>
            </TouchableOpacity>
        )
    else
        return (
            <TouchableOpacity style={styles.ctn} onPress={() => handleClick(true)}>
                <ImageBackground source={{uri : photoURL ? photoURL : null}} style={{width: '100%', height: '100%', justifyContent: 'flex-end'}} imageStyle={{resizeMode: "cover", borderRadius: 5}}>
                    <LinearGradient
                        colors={['#00000000', '#000000']}
                        style={styles.choice_ctn}
                        start={{x : 0.5, y : 0}}
                        end={{x : 0.5, y : 1}}
                        style={styles.bg_content}
                    >
                        <Text style={styles.text}>Photo principale</Text>
                    </LinearGradient>               
                </ImageBackground>
            </TouchableOpacity>
        )
}


const styles = StyleSheet.create({
    ctn: {
        width: 170,
        height: 235,
        backgroundColor: '#FA7A47',
        borderRadius: 5,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginTop: 3,
        textAlign: 'center'
    },
    svg_ctn: {
        width: '100%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_ctn: {
        width: '100%',
        padding: 12
    },
    text_1: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: 'white'
    },
    text_2: {
        fontSize: 12,
        fontFamily: 'Montserrat-regular',
        color: 'white'
    },
    bg_img: {
        height: '100%',
        width: '100%',
        borderRadius: 5
    },
    bg_content: {
        justifyContent: 'flex-end',
        height: '100%',
        borderRadius: 5,
        padding: 17
    },
    selected: {
        borderWidth: 3,
        borderColor: 'white',
    }
})

export default ListVerticalCover