import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Button, ScrollView, BackHandler } from 'react-native'
// COMPS
import MainHeader from '../header/MainHeader'
import GuideFooter from '../utilisation_guide/GuideFooter'
// FIREBASE
import database from '@react-native-firebase/database'
import ResultItem from './ResultItem'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { back } from 'react-native/Libraries/Animated/src/Easing'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const SearchView = (props) => {

    // PROPS
    const { setIsSearching, isSearching, searchText } = props

    // LOCAL STATE
    const [results, setResults] = useState(null)

    const [isUser, setIsUser] = useState(0)

    // NAVIGATION
    const navigation = useNavigation()
    const route = useRoute()

    // HANDLE SEARCH TEXT IN DATABASE
    useEffect(() => {
        setIsUser(0)
        if (!searchText)
            setResults(null)
        if (searchText && searchText.length > 0)
            database()
                .ref(`/users/`)
                .orderByChild('infos/username')
                .startAt(searchText)
                .endAt(`${searchText}\uf8ff`)
                .once('value')
                .then((res) => {
                    if (res.val())
                        setResults(Object.entries(res.val()))
                    else
                        setResults(null)
                })
    }, [searchText])

    // HANDLE BACK BUTTON
    useEffect(() => {
        const backButton = () => {
            const currentRoute = navigation.dangerouslyGetState().routes[1]
            if (isSearching && currentRoute == undefined) {
                setIsSearching(false)
                return true
            }
            else {
                return false
            }   
        }
        BackHandler.addEventListener(
            'hardwareBackPress',
            backButton
        )
        return () => BackHandler.removeEventListener('hardwareBackPress', backButton)
    }, [isSearching])

    return (
        <View style={[styles.ctn]}>
            <View style={styles.title_ctn}>
                <Text style={styles.title}>Résultats</Text>
                <LinearGradient
                    colors={['#FA7A47', '#FF5791']}
                    style={{flex : 1}}
                    start={{x : 0.013, y : 1}}
                    end={{x : 1.829, y : -1.093}}
                    style={styles.nbr_ctn}
                >
                    <Text style={styles.nbr}>{results ? results.length - isUser : 0}</Text>
                </LinearGradient>
            </View>
            <FlatList 
                data={searchText ? results : []}
                renderItem={(item) => (
                    <ResultItem data={item} setIsUser={setIsUser} />
                )}
                keyExtractor={item => item[0]}
                style={styles.list_ctn}
                contentContainerStyle={styles.list_content}
            />
            <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
                <GuideFooter />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ctn: {
        flex: 1,
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#F0F1F5',
        paddingTop: 20,
    },
    title_ctn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginRight: 7.5
    },
    nbr_ctn: {
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nbr: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12
    },
    list_ctn: {

    },
    list_content: {
        paddingHorizontal: 20,
        paddingTop: 20
    }

})

export default SearchView