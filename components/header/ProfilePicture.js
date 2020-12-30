import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
// REDUX
import { useSelector } from 'react-redux'

const ProfilePicture = (props) => {

    const UserData = useSelector(state => state.UserData)

    return (
        <View style={styles.picture_ctn}>
            <View style={styles.outline_border}>
                <Image 
                    source={{
                        uri: UserData ? UserData.infos.photoURL : ""
                    }}
                    style={styles.img} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    picture_ctn: {
        justifyContent:'center',
        alignItems: 'flex-start',
    },
    outline_border: {
        borderWidth: 2,
        borderColor :'rgba(255,255,255,0.56)',
        borderRadius: 28
    },
    img: {
        height: 49,
        width: 49,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white'
    }
})

export default ProfilePicture