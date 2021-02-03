import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useEffect } from 'react/cjs/react.development'

const FavItem = (props) => {

    // PROPS
    const { item, nbrFav, index } = props

    useEffect(() => {
        console.log("hey")
    },[])

    return (

        <TouchableWithoutFeedback onPress={() => console.log("TEST")}>
            <View style={[styles.ctn, index === 0 ? {marginLeft: 20} : {}, index === nbrFav - 1 ? {marginRight: 20} : {}]}>
                <Image source={{uri : item.infos.photoURL}} style={styles.img}/>
                <Text style={styles.username}>{item.infos.username}</Text>
            </View>            
        </TouchableWithoutFeedback>

    )

}

const styles = StyleSheet.create({
    ctn: {
        width: 120,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center'
    },
    img : {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FA7A47',
        alignSelf: 'center',
        marginBottom: 10
    },
    username: {
        textAlign: 'center'
    }
})

export default FavItem