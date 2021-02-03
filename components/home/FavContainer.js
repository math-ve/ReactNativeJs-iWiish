import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
// REDUX
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react/cjs/react.development'
// FIREBASE
import database from '@react-native-firebase/database'
// COMPS
import FavItem from './FavItem'

const FavContainer = (props) => {

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // LOCAL STATE
    const [favorites, setFavorites] = useState([])
    const [nbrFav, setNbrFav] = useState(0)

    // GET FAVORITES
    useEffect(() => {
        setFavorites(null)
        const favArray = []
        for (var i = 0; i < Object.values(UserData.favorites).length; i++)
        {
            database()
                .ref(`/users/${Object.values(UserData.favorites)[i]}/`)
                .on('value', res => favArray.push(res.val()))
        }
        setFavorites(favArray)
    },[UserData.favorites])

    // SET NBR FAV (FOR MARGINS)
    useEffect(() => {
        if (favorites)
            setNbrFav(favorites.length)
    }, [favorites])

    useEffect(() => {
        console.log(favorites)
    }, [favorites])

    return (
        <View style={styles.fav_ctn}>
            <FlatList 
                data={favorites}
                renderItem={(item) => (
                    <FavItem item={item.item} index={item.index} nbrFav={nbrFav}/>
                )}
                keyExtractor={(item) => item.userID}
                horizontal={true}
            />
        </View>        
    )
}

const styles = StyleSheet.create({
    fav_ctn: {
        marginBottom: 50,
    }
})

export default FavContainer