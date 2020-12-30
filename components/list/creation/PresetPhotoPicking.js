import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
// DEPENDENCIES
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
// STYLE
import { WhiteCrossSvg } from '../../../utils/svg/index_svg'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
// COMPS
import ListCover from './ListCover'
import GradiantButton from '../../utils/GradiantButton'
// FIREBASE
import database from '@react-native-firebase/database'
// UTILS
import { delete_main_image_from_storage } from '../../../utils/storage/manage_storage'

const PresetPhotoPicking = (props) => {

    // PROPS
    const { handleBack, title, listId } = props

    // LOCAL STATE
    const [selectedPhoto, setSelectedPhoto] = useState("unset")

    // REDUX
    const UserData = useSelector(state => state.UserData)
    const presetImgUrls = useSelector(state => state.PresetImgUrls)

    // HANDLE CLICK
    const handlePhotoClick = (url) => {
        setSelectedPhoto(url)
    }

    // HANDLE SUBMIT
    const handleSubmit = () => {
        if (selectedPhoto === "unset")
            Alert.alert("Oups", "Vous n'avez séléctionné aucune photo...")
        else {
            database()
                .ref(`users/${UserData.userID}/lists/${listId}/photoURL`)
                .set(selectedPhoto)
                .then(() => {
                    handleBack(false)
                    delete_main_image_from_storage(listId, UserData.userID)
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
            <View style={styles.content_ctn}>
                <View style={styles.title_ctn}>
                    <Text style={styles.title}>Choisis ta photo</Text>
                </View>
                <View style={styles.list_ctn}>
                    <FlatList 
                        data={presetImgUrls}
                        horizontal={true}
                        keyExtractor={item => item}
                        renderItem={(item) => (
                            <ListCover
                                type={1}
                                title={title}
                                imgUrl={item}
                                title={title}
                                selectedPhoto={selectedPhoto}
                                handleClick={handlePhotoClick}    
                            />
                        )}
                    />
                </View>                
                <GradiantButton btnText="Enregistrer" handleClick={() => handleSubmit()}/>
            </View>



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
    content_ctn: {
        height: '65%',
        justifyContent: 'space-between'
    },
    list_ctn: {
        height: 240
    },
    title_ctn: {
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 23
    }
})

export default PresetPhotoPicking