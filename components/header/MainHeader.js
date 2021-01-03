import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// STYLE
import { SearchSvg, SettingsSvg } from '../../utils/svg/index_svg'
import ProfilePicture from './ProfilePicture'

const MainHeader = (props) => {

    // NAVIGATION
    const navigation = useNavigation()

    // GO TO SETTINGS SCREEN
    const goToSettingsScreen = () => {
        navigation.navigate('Settings')
    }

    return (
        <LinearGradient
            colors={['#FA7A47', '#FF5791']}
            style={styles.ctn}
            start={{x : 0.013, y : 1}}
            end={{x : 1.829, y : -1.093}}
        >
            <View style={styles.search_bar_ctn}>
                <TextInput 
                    placeholder="Chercher..."
                    placeholderTextColor="#B1C3D0"
                    style={styles.input}
                />
                <View style={styles.search_icon_ctn}>
                    <SearchSvg />
                </View>
            </View>
            <TouchableOpacity style={styles.settings_ctn} onPress={() => goToSettingsScreen()}>
                <SettingsSvg width={29} height={28}/>
            </TouchableOpacity>
            <ProfilePicture />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    ctn: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        paddingTop: 42,
        alignItems: 'center',
        paddingRight: 20,
        paddingBottom: 10
    },
    search_bar_ctn: {
        backgroundColor: '#F0F1F5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '66%',
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        paddingLeft: 20
    },
    input: {
        fontSize: 19,
        fontFamily: 'Quicksand-Bold',
        padding: 0,

    },
    search_icon_ctn: {
        backgroundColor: '#F0F1F5',
        paddingRight: 12,
        height: '65%',
        justifyContent:'center',
        paddingLeft: 12,
        position:'absolute',
        right: 0,
        borderLeftWidth: 1,
        borderColor:"#B1C3D0"

    },
    settings_ctn: {
        width: '19%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default MainHeader