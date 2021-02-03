import React, { useState } from 'react'
import { Alert, SafeAreaView, ScrollView, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { useEffect } from 'react/cjs/react.development'
// COMPS
import TitleHeader from '../components/header/TitleHeader'
import IdeaCreationPhoto from '../components/idea_creation/ideaCreationPhoto'
import GuideFooter from '../components/utilisation_guide/GuideFooter'
import GradiantButton from '../components/utils/GradiantButton'
import Input from '../components/utils/Input'
import PhotoIdeaPickBlured from '../components/photo_picker/PhotoIdeaPickBlured'
// UTILS
import { create_item_id } from '../utils/item_id/manage_item_id'
import { delete_item, save_new_item } from '../utils/database/manage_database'
// REDUX
import { useSelector } from 'react-redux'
// DEPENDENCIES
import { useNavigation } from '@react-navigation/native'
import LoadingBlured from '../components/utils/LoadingBlured'

const IdeaCreation = (props) => {

    // PROPS
    const { route } = props;

    // LOCAL STATE
    const [listId, setListId] = useState(null)
    const [itemId, setItemId] = useState(null)

    const [title, setTitle] = useState(null)
    const [photoPATH, setPhotoPATH] = useState(null)
    const [price, setPrice] = useState(null)
    const [url, setUrl] = useState(null)
    const [description, setDescription] = useState(null)

    const [isPhotoPicking, setIsPhotoPicking] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    // NAVIGATION
    const navigation = useNavigation()

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // GET LIST ID FROM ROUTE PARAMS
    useEffect(() => {
        setListId(route.params.listId)
    }, [route])

    // CREATE ITEM IDEA AND STORE IN DATABASE
    useEffect(() => {
        const getItemId = async (UserId) => {
            const newItemId = await create_item_id(UserId)
            return newItemId
        }
        if (!itemId)
            getItemId(UserData.userID).then((res) => setItemId(res));
    }, [])

    // HANDLE LEAVE WITHOUT SAVING (REMOVE ITEMID IN DATABASE)
    const handleLeave = () => {
        delete_item(UserData.UserID, listId, itemId)
    }

    // HANDLE SUBMIT
    const handleSubmit = () => {
        if (!title)
            Alert.alert("Oups", "Vous avec oublié de donner un titre à votre produit...")
        else if (!price)
            Alert.alert("Oups", "Vous avec oublié de donner un prix à votre produit...")
        else if (!photoPATH)
            Alert.alert("Oups", "Vous avec oublié de fournir une photo à votre produit...")
        else {
            setIsLoading(true)
            save_new_item(UserData.userID, listId, itemId, title, photoPATH, price, url, description).then(() => {
                setIsLoading(false)
                navigation.goBack()
            })
        }
    }

    return (
        <SafeAreaView style={{flex:1}} >
            <TitleHeader title="Ajout produit" handleLeave={handleLeave}/>
            <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>
                <View style={styles.title_ctn}>
                    <Input 
                        placeholder="Ajoutez un titre..."
                        svg="TitleSvg"
                        width="100%"
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.photo_ctn}>
                    <IdeaCreationPhoto handleClick={setIsPhotoPicking} photoPATH={photoPATH}/>
                </View>

                <View style={styles.price_ctn}>
                    <Input 
                        placeholder="Ajoutez un prix..."
                        svg="EuroSvg"
                        width="100%"
                        onChangeText={setPrice}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.url_ctn}>
                    <Input 
                        placeholder="Ajoutez une URL... (facultatif)"
                        svg="LangSvg"
                        width="100%"
                        onChangeText={setUrl}
                    />
                </View>

                <View style={styles.description_ctn}>
                    <Input 
                        placeholder="Description... (facultatif)"
                        width="100%"
                        onChangeText={setDescription}
                        multiline={true}
                        maxLength={200}
                        numberOfLines={4}
                        ctnHeight={150}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.btn_ctn}>
                    <GradiantButton btnText="Ajouter à la liste" handleClick={handleSubmit} />
                </View>

                <GuideFooter />
            </ScrollView>
            {isPhotoPicking ?
                <PhotoIdeaPickBlured handleBack={setIsPhotoPicking} setPATH={setPhotoPATH}/> :
                <></>
            }
            {isLoading ?
                <LoadingBlured text="Ajout du produit..." /> :
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
        paddingHorizontal: 20,
    },
    title_ctn: {
        marginTop: 30,
        marginBottom: 30
    },
    photo_ctn: {
        alignItems: 'center',
        marginBottom: 30
    },
    price_ctn: {
        marginBottom: 10
    },
    url_ctn: {
        marginBottom: 10
    },
    description_ctn: {
        marginBottom: 30
    },
})

export default IdeaCreation