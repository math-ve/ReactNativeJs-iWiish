import React from 'react'
import { StyleSheet, ImageBackground, Text, View, TouchableHighlight } from 'react-native'
// STYLE
import { EditSquareSvg } from '../../../utils/svg/index_svg'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const MyListCover = (props) => {

    // PROPS
    const { listData } = props

    // NAVIGATION
    const navigation = useNavigation()

    // HANDLE CLICK FOR EDITING THE LIST
    const handleclick = () => {
        navigation.navigate("MyListEdit", {listData: listData})
    }

    return (
        <View style={styles.ctn}>
            <TouchableHighlight style={{borderRadius: 5}} onPress={() => handleclick()}>
                <ImageBackground style={styles.img_bg} imageStyle={{borderRadius: 5}} source={{uri: listData ? listData.coverURL : null}}>
                    <LinearGradient
                        colors={['#FFFFFF00', '#00000099']}
                        style={styles.shader}
                        start={{x : 0.519, y : 1.734}}
                        end={{x : 0.5, y : 0}}
                    >
                        <View style={styles.edit_svg_ctn}>
                            <EditSquareSvg />
                        </View>
                        <Text style={styles.title}>{listData ? listData.title : ""}</Text>
                        <Text style={styles.nbr_item}>{listData && listData.items ? Object.keys(listData.items).length : 0} idées cadeaux</Text>
                        <View style={styles.id_ctn}>
                            <Text style={styles.id_text}>{listData ? listData.listID : ""}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>                
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    ctn: {
        width: '100%',
        height: 155,
        borderRadius: 5,
        paddingVertical: 20,
        backgroundColor: '#F0F1F5'
    },
    img_bg: {
        width: '100%',
        height: '100%',
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    shader: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22
    },
    nbr_item: {
        color: '#FFFFFFCC',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
    },
    edit_svg_ctn: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 7.5
    },
    id_ctn: {
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 7.5
    },
    id_text: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16
    }
})

export default MyListCover