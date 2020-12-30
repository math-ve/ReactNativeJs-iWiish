import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
// REDUX
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react/cjs/react.development'
// FIREBASE
import database from '@react-native-firebase/database'
// COMPS
import HomeListCover from './HomeListCover'

const HomeSectionContent = (props) => {

    // PROPS
    const { section } = props

    // LOCAL STATE
    const [lists, setLists] = useState({})
    const [nbrLists, setNbrLists] = useState(0)

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // SAVE LIST IN LOCAL STATE FROM DATABASE
    useEffect(() => {
        database()
            .ref(`/users/${UserData.userID}/lists/`)
            .on('value', snapshot => {
                setLists(snapshot.val())
            })
    },[UserData.userID])

    // SET NBR LIST (FOR MARGINS)
    useEffect(() => {
        if (lists)
            setNbrLists(Object.keys(lists).length)
    }, [lists])

    if (section === "Mes listes") {
        if (UserData.lists)
            return (
                <View style={[styles.lists_ctn]}>
                    <FlatList 
                        data={lists ? Object.values(lists) : []}
                        keyExtractor={(index) => index.listID}
                        renderItem={(item) => (
                            <HomeListCover listId={item.item.listID} index={item.index} nbrLists={nbrLists}/>
                        )}
                        style={{flex:1}}
                        horizontal={true}
                    />
                </View>
            )
        else 
            return (
                <View style={{marginHorizontal: 20}}>
                    <View style={[styles.section_content_ctn]}>
                        <View style={styles.empty_data_ctn}>
                            <Text style={styles.empty_data_text}>Tu n'as pas encore créé de liste...</Text>
                        </View>                    
                    </View>                    
                </View>

            )
    }
    else if (section === "Mes réservations") {
        if (UserData.reservations)
            return (
                <View>
                    <Text>THERE ARE resa</Text>
                </View>
            )
        else 
            return (
                <View style={[styles.section_content_ctn]}>
                    <View style={styles.empty_data_ctn}>
                        <Text style={styles.empty_data_text}>Tu n'as encore rien réservé...</Text>
                    </View>                    
                </View>
            )
    }
    else if (section === "Mes favoris") {
        if (UserData.favourite)
            return (
                <View>
                    <Text>THERE ARE fav</Text>
                </View>
            )
        else 
            return (
                <View style={[styles.section_content_ctn]}>
                    <View style={styles.empty_data_ctn}>
                        <Text style={styles.empty_data_text}>Tu n'as ajouté personne en favoris...</Text>
                    </View>                    
                </View>
            )
    }
}

const styles = StyleSheet.create({
    section_content_ctn: {
        minHeight: 50,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 10,
        marginTop: 10,
    },
    empty_data_ctn : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty_data_text: {
        color: '#989898',
        fontFamily: 'Montserrat-Regular',
        fontSize: 15
    },
    lists_ctn: {
        //marginBottom: -12.5,
    }
})

export default HomeSectionContent