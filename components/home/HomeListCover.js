import React from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import { useEffect, useState } from 'react/cjs/react.development'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// FIREBASE
import database from '@react-native-firebase/database'
// REDUX
import { useSelector } from 'react-redux'
// STYLE
import { LockLSvg, OpenLockSvg } from '../../utils/svg/index_svg'

const HomeListCover = (props) => {

    // PROPS
    const { listId, index, nbrLists } = props

    // LOCAL STATE
    const [listData, setListData] = useState({})
    const [nbrItems, setNbrItems] = useState(0)

    // NAVIGATION
    const navigation = useNavigation()

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // GET LIST DATA FROM DATABASE
    useEffect(() => {
        database()
            .ref(`/users/${UserData.userID}/lists/${listId}/`)
            .on('value', (snapshot) => {
                setListData(snapshot.val())
            })
    }, [listId])

    // COUNT NBR OF ITEM IN LIST
    useEffect(() => {
        if (listData && listData.items) {
            const count = Object.keys(listData.items).length
            setNbrItems(count)
        }
    }, [listData])

    // NAVIGATE TO MYLIST
    const handleNavigate = () => {
        navigation.navigate("MyList", {listId: listId})
    }

    return (
        <TouchableHighlight style={[styles.ctn, styles.shadow, index === 0 ? {marginLeft: 20} : {}, index === nbrLists - 1 ? {marginRight: 20} : {}]} onPress={() => handleNavigate()}>
            <ImageBackground
                source={{uri: listData ? listData.photoURL : null}}
                style={[{width: '100%', height: '100%'}]}
                imageStyle={{borderRadius: 5}}
            >
                <LinearGradient
                    colors={['#00000000', '#000000']}
                    start={{x : 0.5, y : 0}}
                    end={{x : 0.5, y : 1}}
                    style={styles.shader}
                >
                    <View style={styles.content_ctn}>
                        <Text style={styles.title}>{listData ? listData.title : ""}</Text>
                        <Text style={styles.nbr}>{nbrItems} produits</Text>
                        {listData && listData.isPublic ? 
                            <OpenLockSvg /> :
                            <LockLSvg />    
                        }
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    ctn: {
        height:230,
        width: 170,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    shader: {
        justifyContent: 'flex-end',
        height: '100%',
        borderRadius: 5,
        padding: 17        
    },
    content_ctn: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        width: '100%'
    },
    nbr: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        width: '70%',
        lineHeight: 20
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
})

export default HomeListCover