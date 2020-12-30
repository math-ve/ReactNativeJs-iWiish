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

const ListCover = (props) => {

    // PROPS
    const { title, handleClick, type, imgUrl, selectedPhoto, listId } = props

    // LOCAL STATE
    const [photoURL, setPhotoUrl] = useState("https://firebasestorage.googleapis.com/v0/b/iwiish-ed11d.appspot.com/o/default%2Fdeffault_cover_list.png?alt=media&token=6e869104-936a-4c3e-ba42-2b0b4b53789e")

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // SAVE ALL DATABASE CHANGES IN REDUX STATE
    useEffect(() => {
        const onValueChange = database()
        .ref(`/users/${UserData.userID}/lists/${listId}/photoURL`)
        .on('value', snapshot => {
            setPhotoUrl(snapshot.val())
        })
        return () => {
        database()
            .ref(`/users/${UserData.userID}/lists/${listId}/photoURL`)
            .off('value', onValueChange)
        }
    }, [UserData])

    if (type === 0) {    // LIST CREATION COVER
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
                        <View style={styles.text_ctn}>
                            <Text style={styles.text_1}>{title === "" ? "Titre de la liste" : title}</Text>
                            <Text style={styles.text_2}>0 produits</Text>
                        </View>
                    </LinearGradient>               
                </ImageBackground>
            </TouchableOpacity>
        )      
    }
    else if (type === 1)    // PRESET IMAGES COVER
        return (
            <TouchableOpacity 
                style={[styles.ctn, {marginHorizontal: 8, padding: 0}, selectedPhoto === imgUrl.item ? styles.selected : {}]}
                onPress={() => handleClick(imgUrl.item)}
            >
                <ImageBackground 
                    source={{uri: imgUrl.item ? imgUrl.item : null}}
                    style={styles.bg_img}
                    imageStyle={{borderRadius: 5}}
                >
                    <LinearGradient
                        colors={['#00000000', '#000000']}
                        start={{x : 0.5, y : 0}}
                        end={{x : 0.5, y : 1}}
                        style={styles.bg_content}
                    >
                        <View style={styles.text_ctn}>
                            <Text style={styles.text_1}>{title === "" ? "Titre de la liste" : title}</Text>
                            <Text style={styles.text_2}>0 produits</Text>
                        </View> 
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
        justifyContent: 'space-between'
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
        borderRadius: 5
    },
    selected: {
        borderWidth: 3,
        borderColor: 'white',
    }
})

export default ListCover