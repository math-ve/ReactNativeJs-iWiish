import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native'
// DEPENDENCIES
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
// STYLE
import { WhiteCrossSvg } from '../../../utils/svg/index_svg'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
// COMPS
import GradiantButton from '../../utils/GradiantButton'

const PresetCoverPicking = (props) => {

    // PROPS
    const { handleBack, setPATH } = props

    // LOCAL STATE
    const [selectedPhoto, setSelectedPhoto] = useState("unset")

    // REDUX
    const presetImgUrls = useSelector(state => state.PresetCoverUrls)

    // HANDLE SUBMIT
    const handleSubmit = () => {
        if (selectedPhoto === "unset")
            Alert.alert("Oups", "Vous n'avez séléctionné aucune photo...")
        else {
            setPATH(selectedPhoto)
            handleBack(false)
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
                        keyExtractor={item => item}
                        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                        renderItem={(item) => (
                            <View style={[styles.cover_item, selectedPhoto === item.item ? styles.selected : {}]}>
                                <TouchableWithoutFeedback style={{width:'100%', height:'100%'}} onPress={() => setSelectedPhoto(item.item)}>
                                    <ImageBackground source={{uri: item.item ? item.item : null}} style={styles.cover_item_bg}>

                                    </ImageBackground>                                    
                                </TouchableWithoutFeedback>
                            </View>
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
        height: '70%'
    },
    title_ctn: {
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 23
    },
    cover_item: {
        width: 335,
        height: 115,
        marginBottom: 20
    },
    cover_item_bg: {
        width: '100%',
        height: '100%'
    },
    selected: {
        borderWidth: 3,
        borderColor: 'white',
    }
})

export default PresetCoverPicking