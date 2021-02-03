import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useEffect } from 'react/cjs/react.development'
// COMPS
import TitleHeader from '../components/header/TitleHeader'
import MyListCover from '../components/list/mylist/MyListCover'
import GuideFooter from '../components/utilisation_guide/GuideFooter'
import MyListItem from '../components/list/mylist/MyListItem'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// STYLE
import { AddCrossSvg, EmptyBoxSvg } from '../utils/svg/index_svg'
// FIREBASE
import database from '@react-native-firebase/database'
// REDUX
import { useSelector } from 'react-redux'

const MyList = (props) => {

    // PROPS
    const { route } = props

    // LOCAL STATE
    const [listData, setListData] = useState(null)
    const [items, setItems] = useState(null)

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

    // HANDLE CLICK ADD NEW ITEM
    const handleClickNewItem = () => {
        navigation.navigate('IdeaCreation', {listId: listData.listID})
    }

    useEffect(() => {
        if (listData && listData.items)
            setItems(Object.entries(listData.items))
        else if (listData && listData.items === undefined)
            setItems(null)
    }, [listData])

    return (
        <SafeAreaView style={{flex:1}}>
            <TitleHeader title="Ma liste"/>

            <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>
                    <View>
                        <MyListCover listData={listData}/>
                        {items ? 
                            items.map((item, index) => (
                                <MyListItem data={item} key={item.index}/>
                            )) : 
                            <View style={styles.empty_data_ctn}>
                                <EmptyBoxSvg />
                                <Text style={styles.empty_data_text}>Aucun article n'a encore été ajouté</Text>
                            </View>                    
                        }                        
                    </View>

                    <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
                        <GuideFooter />
                    </View>
                    

            </ScrollView>
            
            <View style={styles.btn_ctn}>
                <TouchableWithoutFeedback style={styles.btn} onPress={() => handleClickNewItem()}>
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
        paddingHorizontal: 20,
        paddingBottom: 50,
        minHeight: '85%'
    },
    empty_data_ctn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65%'
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
        bottom: 20,
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