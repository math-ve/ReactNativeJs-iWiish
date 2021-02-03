import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View, TouchableWithoutFeedback } from 'react-native'

const MyListItem = (props) => {

    // PROPS
    const { data } = props

    // NAVIGATION
    const navigation = useNavigation()

    // LOCAL STATE
    const [itemId, setItemId] = useState(null)
    const [itemData, setItemData] = useState(null)

    // HANDLE NAVIGATE
    const handleNavigate = () => {
        navigation.navigate('ItemEdit', {itemData: itemData, itemId: itemId})
    }

    useEffect(() => {
        setItemId(data[0])
        setItemData(data[1])
    }, [data])

    return (
        <TouchableWithoutFeedback style={styles.ctn} onPress={() => handleNavigate()}>
            <View style={styles.ctn}>
                <View style={styles.photo_ctn}>
                    <ImageBackground style={styles.img} imageStyle={{borderRadius: 5}} source={{uri: itemData ? itemData.photoURL : null}}>

                    </ImageBackground>
                </View>

                <View style={styles.infos_ctn}>
                    <Text style={styles.title}>{itemData ? itemData.title : ""}</Text>
                    <Text style={styles.price}>{itemData ? itemData.price : ""} €</Text>
                </View>                
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    ctn: {
        backgroundColor: 'white',
        height: 100,
        width: '100%',
        elevation: 10,
        borderRadius: 5,
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10
    },
    photo_ctn: {
        height: 79,
        width: 79,
        marginRight: 10,
    },
    img: {
        width: '100%',
        height: '100%'
    },
    infos_ctn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        marginBottom: 2.5,
        textAlign: 'center'
    },
    price: {
        color: '#FA7A47',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        fontSize: 15
    }
})

export default MyListItem