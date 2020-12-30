import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// DEPENDENCIES
import { BlurView } from '@react-native-community/blur'
import ImagePicker from 'react-native-image-crop-picker'
import LinearGradient from 'react-native-linear-gradient'
// STYLE
import { CameraSvg, GallerySvg, WhiteCrossSvg } from '../../utils/svg/index_svg'
// FIREBASE
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'
// REDUX
import { useSelector } from 'react-redux'

const PhotoProfilePickBlured = (props) => {

    // PROPS
    const { handleBack } = props

    // REDUX
    const UserData = useSelector(state => state.UserData);

    // SEND IMG TO FIREBASE & GET URL
    const saveImageFirebase = async (path) => {
        const reference = storage().ref(`/${UserData.userID}/profile_picture.jpg`)
        await reference.putFile(path)
            .then(async () => {
                const url = await storage()
                    .ref(`/${UserData.userID}/profile_picture.jpg`)
                    .getDownloadURL()
                    .then((url) => saveUrlInDatabase(url))
            })
    }

    // SAVE URL IN DATABASE
    const saveUrlInDatabase = (url) => {
        database()
            .ref(`users/${UserData.userID}/infos/photoURL`)
            .set(url)
        database()
            .ref(`profile_pictures/${UserData.userID}`)
            .set(url)
    }

    // HANDLE CHOICE
    const handleChoice = (source) => {
        handleBack(false)
        if (source === "camera") {
            ImagePicker.openCamera({
                width:300,
                height:300,
                cropping: true,
            }).then(image => {
                saveImageFirebase(image.path)
            })
        }
        else if (source === "gallery") {
            ImagePicker.openPicker({
                width:300,
                height:300,
                cropping: true,
            }).then(image => {
                saveImageFirebase(image.path)
            })
        }
    }

    return (
        <View style={[styles.photo_picker_ctn]}>
            <BlurView
                style={[styles.photo_picker_ctn]}
                blurType="dark"
                blurAmount={7}
                reducedTransparencyFallbackColor="#989898"
                
            />
            <LinearGradient
                colors={['#FA7A47', '#FF5791']}
                style={styles.choice_ctn}
                start={{x : 0.013, y : 1}}
                end={{x : 1.829, y : 1}}
            >
                <TouchableOpacity style={styles.choice_item} onPress={() => handleChoice('camera')}>
                    <CameraSvg />
                    <Text style={styles.choice_text}>Photo</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>
                <TouchableOpacity style={styles.choice_item} onPress={() => handleChoice('gallery')}>
                    <GallerySvg />
                    <Text style={styles.choice_text}>Galerie</Text>
                </TouchableOpacity>
            </LinearGradient>
            <View style={{position:'absolute', top: 20, width: '90%', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => handleBack(false)}>
                    <WhiteCrossSvg />
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    photo_picker_ctn: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    choice_ctn: {
        width: '90%',
        height: '30%',
        position: 'absolute',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center'
    },
    separator: {
        width: 2,
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 50
    },
    choice_item: {
        alignItems: 'center',
        justifyContent:'center',
        padding: 30
    },
    choice_text: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: 'white',
        marginTop:7
    },
    back_text: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
    }
})

export default PhotoProfilePickBlured