import React from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
// REDUX
import { useSelector } from 'react-redux'
// STYLE
import { PencilSvg, UserPhotoSvg } from '../../utils/svg/index_svg'

const ProfilePhotoEdit = (props) => {

    // PROPS
    const { handleClick } = props

    // REDUX
    const UserData = useSelector(state => state.UserData);

    if (UserData && UserData.infos.photoURL)
        return (
            <View style={styles.photo_container}>
                <TouchableWithoutFeedback style={{borderRadius: 83}} onPress={() => handleClick(true)}>
                    <View style={styles.photo_border}>
                        <Image 
                            style={styles.photo}
                            source={{
                                uri: UserData.infos.photoURL
                            }}   
                        />
                        <View style={[styles.pencil_ctn, styles.shadow]}>
                            <PencilSvg />
                        </View>
                    </View>                    
                </TouchableWithoutFeedback>
            </View>
        )
    else
    return (
        <View style={styles.photo_container}>
            <TouchableWithoutFeedback style={{borderRadius: 83}} onPress={() => handleClick(true)}>
                <View style={styles.photo_border}>
                    <View style={styles.empty_photo_ctn}>
                        <UserPhotoSvg />
                    </View>
                    
                    <View style={[styles.pencil_ctn, styles.shadow]}>
                        <PencilSvg />
                    </View>
                </View>                    
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    photo_container: {
        flex: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo_border: {
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.63)',
        flex: 1,
        height:165,
        width: 165,
        borderRadius:165/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_photo_ctn: {
        borderWidth: 3,
        borderColor: 'white',
        width: '93%',
        height:'93%',
        backgroundColor:'rgba(255,255,255,0.20)',
        borderRadius: 83,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    photo: {
        width:'93%',
        height: '93%',
        borderRadius: 83,
        backgroundColor:'rgba(255,255,255,0.20)',
        borderWidth: 3,
        borderColor: 'white'
    },
    pencil_ctn: {
        backgroundColor: 'white',
        width: 46,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        position: 'absolute',
        right: 0,
        bottom: 0,
        elevation: 10
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 8,
    }
})

export default ProfilePhotoEdit