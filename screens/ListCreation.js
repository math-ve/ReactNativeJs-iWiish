import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
// REDUX
import { useSelector } from 'react-redux'
// COMPS
import TitleHeader from '../components/header/TitleHeader'
import ListVerticalCover from '../components/list/creation/ListVerticalCover'
import ListHorizontalCover from '../components/list/creation/ListHorizontalCover'
import PresetPhotoPicking from '../components/list/creation/PresetPhotoPicking'
import PresetCoverPicking from '../components/list/creation/PresetCoverPicking'
import VisibilityForm from '../components/list/creation/VisibilityForm'
import PhotoListPickBlured from '../components/photo_picker/PhotoListPickBlured'
import PhotoListHorizontalPickBlured from '../components/photo_picker/PhotoListHorizontalPickBlured'
import GuideFooter from '../components/utilisation_guide/GuideFooter'
import GradiantButton from '../components/utils/GradiantButton'
import Input from '../components/utils/Input'
import LoadingBlured from '../components/utils/LoadingBlured'
// UTILS
import { create_list_id } from '../utils/list_id/manage_list_id'
import { delete_main_image_from_storage, delete_cover_image_from_storage } from '../utils/storage/manage_storage'
import { save_new_list, delete_list } from '../utils/database/manage_database'
// DEPENDENCIES
import { useNavigation } from '@react-navigation/native'

const ListCreation = () => {

    // LOCAL STATE
    const [listId, setListId] = useState("")

    const [title, setTitle] = useState("")
    const [isPublic, setIsPublic] = useState(true)
    const [password, setPassword] = useState("")
    const [photoPATH, setPhotoPATH] = useState(null)
    const [coverPATH, setCoverPATH] = useState(null)

    const [isCoverPicking, setIsCoverPicking] = useState(false)
    const [isPresetCoverPicking, setIsPresetCoverPicking] = useState(false)
    const [isPhotoPicking, setIsPhotoPicking] = useState(false)
    const [isPresetPhotoPicking, setIsPresetPhotoPicking] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // NAVIGATION
    const navigation = useNavigation()

    // CREATE LIST ID AND STORE IN DATABASE
    useEffect(() => {
        const getListId = async (UserID) => {
            const newListId = await create_list_id(UserID)
            return newListId
        }
        if (listId === "")
            getListId(UserData.userID).then((res) => setListId(res))
    }, [])

    // HANDLE SUBMIT
    const handleSubmit = () => {
        if (title !== "") {
            if (!isPublic && password === "") {
                Alert.alert("Oups", "Une liste privée a besoin d'un mot de passe...")
            } else if (!photoPATH) {
                Alert.alert("Oups", "Une photo principale est requise. Vous pouvez choisir une image prédéfinie si vous n'en avez pas.")
            } else if (!coverPATH) {
                Alert.alert("Oups", "Une photo de couverture est requise. Vous pouvez choisir une image prédéfinie si vous n'en avez pas.")
            } else {
                setIsLoading(true)
                save_new_list(UserData.userID, listId, title, isPublic, password, photoPATH, coverPATH).then(() => {
                    setIsLoading(false)
                    navigation.goBack()
                })
            }
        }
        else
            Alert.alert("Oups", "Votre liste a besoin d'un titre")
    }

    // HANDLE COVER PICKING BOOL
    const handleClickCover = (bool) => {
        setIsCoverPicking(bool)
    }

    // HANDLE PRESET COVER PICKING BOOL
    const handleClickPresetCover = (bool) => {
        setIsPresetCoverPicking(bool)
    }

    // HANDLE PHOTO PICKING BOOL
    const handleClickPhoto = (bool) => {
        setIsPhotoPicking(bool)
    }

    // HANDLE PRESET PHOTO PICKING BOOL
    const handleClickPresetPhoto = (bool) => {
        setIsPresetPhotoPicking(bool)
    }

    // HANDLE LEAVE WITHOUT SAVING (REMOVE LISTID IN DATABASE & REMOVE IMG FROM STORAGE)
    const handleLeave = () => {
        delete_list(UserData.userID, listId)
        delete_main_image_from_storage(listId, UserData.userID)
        delete_cover_image_from_storage(listId, UserData.userID)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <TitleHeader title="Nouvelle liste" handleLeave={handleLeave}/>
            <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>
                <View style={styles.horizontal_cover_ctn}>
                    <ListHorizontalCover handleClick={handleClickCover} coverPATH={coverPATH}/>
                </View>
                <View style={styles.title_ctn}>
                    <Input
                        placeholder="Ajoutez un titre à votre liste..."
                        svg="TitleSvg"
                        width="100%"
                        onChangeText={setTitle}
                    />
                </View>
                <View style={styles.list_cover_ctn}>
                    <ListVerticalCover  handleClick={handleClickPhoto} photoPATH={photoPATH}/>
                </View>
                <VisibilityForm isPublic={isPublic} setIsPublic={setIsPublic} setPassword={setPassword}/>
                <View style={{marginBottom:10}}>
                    <GradiantButton handleClick={handleSubmit} btnText="Créer la liste" />
                </View>
                
                <GuideFooter />
            </ScrollView>
            {isCoverPicking ?
                <PhotoListHorizontalPickBlured handleBack={handleClickCover} handlePreset={handleClickPresetCover} setPATH={setCoverPATH}/> :
                <></>
            }
            {isPresetCoverPicking ?
                <PresetCoverPicking handleBack={handleClickPresetCover} setPATH={setCoverPATH}/> :
                <></>
            }
            {isPhotoPicking ?
                <PhotoListPickBlured handleBack={handleClickPhoto} handlePreset={handleClickPresetPhoto} setPATH={setPhotoPATH}/> :
                <></>
            }
            {isPresetPhotoPicking ?
                <PresetPhotoPicking handleBack={handleClickPresetPhoto} setPATH={setPhotoPATH}/> :
                <></>        
            }
            {isLoading ?
                <LoadingBlured text="Création de la liste..."/> :
                <></>
            }
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
    horizontal_cover_ctn: {
        height: 155,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    title_ctn: {
        marginBottom: 30
    },
    list_cover_ctn: {
        width: '100%',
        alignItems: 'center',
        flex:1,
        justifyContent: 'center',
        marginBottom: 30
    }
})

export default ListCreation