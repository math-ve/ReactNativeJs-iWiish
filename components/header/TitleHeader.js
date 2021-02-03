import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// COMPS
import ProfilePicture from './ProfilePicture'
// STYLE
import { LeftArrowSvg } from '../../utils/svg/index_svg'

const TitleHeader = (props) => {

    // PROPS
    const { title, handleLeave } = props

    // NAVIGATION
    const navigation = useNavigation()

    // HANDLE BACK NAVIGATION
    const goBackNavigation = () => {
        if (handleLeave)
            handleLeave()
        navigation.goBack()
    }

    return (
        <LinearGradient
            colors={['#FA7A47', '#FF5791']}
            style={styles.ctn}
            start={{x : 0.013, y : 1}}
            end={{x : 1.829, y : -1.093}}
        >
            <View style={styles.back_btn_ctn}>
                <TouchableOpacity style={styles.back_btn} onPress={() => goBackNavigation()}>
                    <LeftArrowSvg />
                </TouchableOpacity>
            </View>
            <View style={styles.title_ctn}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <ProfilePicture />
        </LinearGradient>
    )
}

TitleHeader.defaultProps = {
    handleLeave: () => {return 0}
}

const styles = StyleSheet.create({
    ctn: {
        minHeight: '15%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
        paddingTop: '10%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingBottom: '3%',
    },
    back_btn_ctn: {
        width: 49
    },
    back_btn: {
        flexDirection: 'row'
    },
    btn_text: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: 'white',
        marginLeft:5
    },
    title_ctn: {

    },
    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 22,
        color: 'white'
    }

})

export default TitleHeader