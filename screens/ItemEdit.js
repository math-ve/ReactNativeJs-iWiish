import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet,ScrollView, View, Alert } from 'react-native'
// COMPS
import TitleHeader from '../components/header/TitleHeader'
import IdeaCreationPhoto from '../components/idea_creation/ideaCreationPhoto'
import GuideFooter from '../components/utilisation_guide/GuideFooter'
import GradiantButton from '../components/utils/GradiantButton'
import Input from '../components/utils/Input'
import PhotoIdeaPickBlured from '../components/photo_picker/PhotoIdeaPickBlured'
import LoadingBlured from '../components/utils/LoadingBlured'
import TrashButton from '../components/utils/TrashButton'
// UTILS
import { save_item_after_edit, delete_item } from '../utils/database/manage_database'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const ItemEdit = (props) => {

    // PROPS
    const { route } = props

    // LOCAL STATE
    const [listId, setListId] = useState(route.params.itemData ? route.params.itemData.listId : null)
    const [itemId, setItemId] = useState(route.params.itemId ? route.params.itemId : null)

    const [title, setTitle] = useState(route.params.itemData ? route.params.itemData.title : null)
    const [photoPATH, setPhotoPATH] = useState(route.params.itemData ? route.params.itemData.photoURL : null)
    const [price, setPrice] = useState(route.params.itemData ? route.params.itemData.price : null)
    const [url, setUrl] = useState(route.params.itemData ? route.params.itemData.linkURL : null)
    const [description, setDescription] = useState(route.params.itemData ? route.params.itemData.description : null)

    const [isPhotoPicking, setIsPhotoPicking] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    // REDUX
    const UserData = useSelector(state => state.UserData)

    // NAVIGATION
    const navigation = useNavigation()

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
            save_item_after_edit(UserData.userID, listId, itemId, title, photoPATH, price, url, description).then(() => {
                setIsLoading(false)
                navigation.goBack()
            })
        }
    }

    // HANDLE DELETE ITEM
    const handleDelete = () => {
        Alert.alert(
            "Attention",
            "Êtes-vous sûr ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "oui",
                    onPress: () => {
                        delete_item(UserData.userID, listId, itemId)
                        navigation.goBack()                                          
                    }
                }                                
            ])
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <TitleHeader title="Paramètres"/>
            <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>
                <View style={styles.title_ctn}>
                    <Input 
                        placeholder="Ajoutez un titre..."
                        svg="TitleSvg"
                        width="100%"
                        onChangeText={setTitle}
                        defaultValue={title}
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
                        defaultValue={price}
                    />
                </View>

                <View style={styles.url_ctn}>
                    <Input 
                        placeholder="Ajoutez une URL... (facultatif)"
                        svg="LangSvg"
                        width="100%"
                        onChangeText={setUrl}
                        defaultValue={url}
                    />
                </View>

                <View style={styles.description_ctn}>
                    <Input 
                        placeholder="Description... (facultatif)"
                        width="100%"
                        onChangeText={setDescription}
                        defaultValue={description}                 
                    />
                </View>

                <View style={styles.btns_ctn}>
                    <TrashButton handleClick={handleDelete}/>
                    <GradiantButton handleClick={handleSubmit} btnText="Enregistrer" />
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
    btns_ctn: {
        marginBottom:10,
        flexDirection: 'row',
        justifyContent: 'space-around',    
    }
})

export default ItemEdit