import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Text, FlatList } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
// COMPS
import TitleHeader from '../components/header/TitleHeader'
// STYLE
import { Star2Svg, GreyStarSvg, ListSvg } from '.././utils/svg/index_svg'
// REDUX
import { useSelector } from 'react-redux'
import GuideFooter from '../components/utilisation_guide/GuideFooter'
import UserListCover from '../components/user_profile/UserListCover'
// FIREBASE
import database from '@react-native-firebase/database'
// TOOLS
import { add_favorite, remove_favourite } from '../utils/database/manage_database'
import { set } from 'react-native-reanimated'

const UserProfile = (props) => {

    // PROPS
    const { route } = props

    // LOCAL STATE
    const [data, setData] = useState(null)
    const [lists, setLists] = useState([])
    const [userId, setUserId] = useState(null)

    const [nbrLists, setNbrLists] = useState(0)

    const [isFav, setIsFav] = useState(false)
    const [favToken, setFavToken] = useState(null)
    const [test, setTest] = useState(false)

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // GET DATA FROM ROUTE
    useEffect(() => {
        if (route.params.UserProfileData)
            setUserId(route.params.UserProfileData.userID)
    }, [route.params])

    // SAVE LIST IN LOCAL STATE FROM DATABASE
    useEffect(() => {
        if (userId)
            database()
                .ref(`/users/${userId}/`)
                .on('value', snapshot => {
                    if (snapshot.val()){
                        setData(snapshot.val())
                    }      
                })
    },[userId])

    // CHECK IF USER IS IN FAV
    useEffect(() => {
        if (UserData && userId && UserData.favorites) {
            const favorites = Object.values(UserData.favorites)
            if (favorites.indexOf(userId) != -1) {
                setIsFav(true)
                setFavToken(Object.entries(UserData.favorites)[favorites.indexOf(userId)][0])  // PUT INDEX HERE ???
            }
            else
                setIsFav(false)
        }
    }, [UserData, userId])

    // GET LISTS
    useEffect(() => {
        if (data && data.lists)
            setLists(Object.values(data.lists))
        else
            setLists([])
    }, [data])

    // SET NBR LIST (FOR MARGINS)
    useEffect(() => {
        if (lists)
            setNbrLists(Object.keys(lists).length)
    }, [lists])

    // HANDLE CLICK FAVORITE
    const handleClickFavorite = () => {
        if (isFav)
            remove_favourite(UserData.userID, favToken)
        else
            add_favorite(UserData.userID, userId)
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <TitleHeader title={data ? data.infos.username : null}/>
            <View style={styles.ctn}>
                
                    <View style={styles.fav_ctn}>
                        <TouchableWithoutFeedback style={{padding: 10}} onPress={() => handleClickFavorite()}>
                            {isFav ? <Star2Svg /> : <GreyStarSvg />}
                        </TouchableWithoutFeedback>
                    </View>           
                
                <View style={styles.infos_ctn}>
                    <View style={styles.img_border}>
                        <Image style={styles.img} source={{uri : data ? data.infos.photoURL : null}}/>
                    </View>                   
                </View>

                <View style={styles.lists_ctn}>
                    <View style={styles.lists_header_ctn}>
                        <Text style={styles.lists_header_text}>Listes</Text>
                        <ListSvg />
                    </View>
                    <View style={styles.lists_covers_ctn}>
                        <FlatList 
                            data={lists ? lists : []}
                            keyExtractor={(item) => item.listID}
                            renderItem={(item) => (
                                <UserListCover listData={item.item} index={item.index} nbrLists={nbrLists}/>
                            )}
                            horizontal={true}
                            style={nbrLists === 1 ? {alignSelf:'center'} : {}}
                        />
                    </View>
                </View>
                <GuideFooter />                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ctn: {
        flex: 1,
        backgroundColor:'#F0F1F5',
        justifyContent: 'space-between'
    },
    fav_ctn: {
        height: 50,
        width: 50,
        borderRadius: 5,
        elevation: 10,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infos_ctn: {
        marginTop: '-12.5%',
        marginBottom: '10%'
    },
    img_border: {
        width: 160,
        height: 160,
        borderColor: '#FA7A47',
        borderWidth: 2,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    img: {
        width: 151,
        height: 151,
        borderRadius: 75.5
    },
    username: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 19,
        fontFamily: 'Montserrat-Semibold'
    },
    lists_ctn: {

    },
    lists_header_ctn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    lists_header_text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginRight: 7.5
    },
    lists_covers_ctn: {

    }
})

export default UserProfile