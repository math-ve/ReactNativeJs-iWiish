import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { useEffect } from 'react/cjs/react.development'
// STYLE
import { List2Svg } from '../../utils/svg/index_svg'

const ResultItem = (props) => {     // AJOUT FAVORIS ICON IF IN FAVOURITE

    // PROPS
    const { data, setIsUser } = props

    // LOCAL STATE
    const [dataItem, setDataItem] = useState(null)

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // NAIVGATION
    const navigation = useNavigation()

    // GET DATAITEM
    useEffect(() => {
        if (data)
            setDataItem(data.item[1])
    },[data])

    // REMOVE 1 RESULT NBR IF PROFILE OF CURRENT USER
    useEffect(() => {
        if (dataItem && UserData && dataItem.userID === UserData.userID)
            setIsUser(1)
    }, [dataItem, UserData])

    // HANDLE NAVIGATE TO USER PROFILE
    const handleNavigate = () => {
        navigation.navigate('UserProfile', {UserProfileData : dataItem})
    }

    if (UserData && dataItem && UserData.userID !== dataItem.userID)
        return (
            <TouchableWithoutFeedback style={[styles.ctn , {elevation: 7.5,}]} onPress={() => handleNavigate()}>
                <View style={styles.ctn}>
                    <View style={styles.left_ctn}>
                        <Image style={styles.img} source={{uri: dataItem ? dataItem.infos.photoURL : null}}/>
                        <View style={styles.username_ctn}>
                            <Text style={styles.username}>{dataItem ? dataItem.infos.username : null}</Text>
                        </View>                    
                    </View>

                    <View style={styles.lists_ctn}>
                        <List2Svg />
                        <Text style={styles.lists_nbr}>{dataItem && dataItem.lists ? Object.entries(dataItem.lists).length : 0}</Text>
                    </View>
                </View>            
            </TouchableWithoutFeedback>
        )
    else
        return (
            <></>
        )
}

const styles = StyleSheet.create({
    ctn: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 12,
        flexDirection: 'row',
    },
    left_ctn: {
        height: '100%',
        width:'80%',
        flexDirection: 'row'
    },
    img: {
        height: '100%',
        width: 60,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginRight: 12
    },
    username_ctn: {
        justifyContent: 'center'
    },
    username: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular'
    },
    lists_ctn: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },
    lists_nbr: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
        color: '#B1C3D0',
        marginLeft: 10
    }
})

export default ResultItem