import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useEffect } from 'react/cjs/react.development'
// COMPS
import TitleHeader from '../components/header/TitleHeader'
import MyListCover from '../components/list/mylist/MyListCover'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// STYLE
import { AddCrossSvg, EmptyBoxSvg } from '../utils/svg/index_svg'
// FIREBASE
import database from '@react-native-firebase/database'
// REDUX
import { useSelector } from 'react-redux'
import GuideFooter from '../components/utilisation_guide/GuideFooter'

const MyList = (props) => {

    // PROPS
    const { route } = props

    // LOCAL STATE
    const [listData, setListData] = useState(null)

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // NAVIGATION
    const navigation = useNavigation()

    // GET LIST DATA
    useEffect(() => {
        const onValuechange = database()
            .ref(`/users/${UserData.userID}/lists/${route.params.listId}/`)
            .on('value', (snapshot) => {
                setListData(snapshot.val())
            })
        return () => {
            database()
                .ref(`/users/${UserData.userID}/lists/${route.params.listId}/`)
                .off('value', onValuechange)
        }
    }, [route, UserData])

    return (
        <SafeAreaView style={{flex:1}}>
            <TitleHeader title="Ma liste"/>

            <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>
                <MyListCover listData={listData}/>
                {listData && listData.items ? 
                    <></> : 
                    <View style={styles.empty_data_ctn}>
                        <EmptyBoxSvg />
                        <Text style={styles.empty_data_text}>Aucun article n'a encore été ajouté</Text>
                    </View>                    
                }

                <GuideFooter />
            </ScrollView>

            <View style={styles.btn_ctn}>
                <TouchableWithoutFeedback style={styles.btn} onPress={() => console.log("hey")}>
                    <LinearGradient
                        colors={['#FA7A47', '#FF5791']}
                        style={{flex : 1}}
                        start={{x : 0.013, y : 1}}
                        end={{x : 1.829, y : -1.093}}
                        style={styles.btn_gradiant}
                    >
                        <AddCrossSvg />
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll_ctn: {
        flex: 1,
    },
    scroll_ctn_content: {
        justifyContent: 'space-between',
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    empty_data_ctn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_data_text: {
        color: '#C6C6C6',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 10
    },
    btn_ctn: {
        width: '100%',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0
    },
    btn: {
        right: 0,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_gradiant: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        elevation: 10,
    }
})

export default MyList