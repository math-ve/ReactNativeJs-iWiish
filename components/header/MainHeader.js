import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Easing, Animated, NativeModules, LayoutAnimation, Keyboard} from 'react-native'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler'
// DEPENDENCIES
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// STYLE
import { SearchSvg, SettingsSvg } from '../../utils/svg/index_svg'
import ProfilePicture from './ProfilePicture'
import { BackArrowSvg } from '../../utils/svg/index_svg'

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const MainHeader = (props) => {

    // PROPS
    const { setIsSearching, isSearching, setSearchText, searchText } = props

    // LOCAL STATE
    //const [searchText, setSearchText] = useState(null)
    const [smallWidth] = useState((Dimensions.get('window').width / 100) * 62.22)
    const [bigWidth] = useState((Dimensions.get('window').width / 100) * 95.6)

    const [_animWidth, _setAnimWidth] = useState(null)
    const [_animX1] = useState(new Animated.Value(-24))
    const [_animX2] = useState(new Animated.Value(-34))

    // NAVIGATION
    const navigation = useNavigation()

    // GO TO SETTINGS SCREEN
    const goToSettingsScreen = () => {
        navigation.navigate('Settings')
    }

    // ANIM WIDHT TEXT INPUT CTN
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        if (isSearching)
            _setAnimWidth(bigWidth)
        if (!isSearching)
            _setAnimWidth(smallWidth)
    }, [isSearching])

    // ANIM X BACK ARROW 
    useEffect(() => {
        Animated.timing(_animX1, {
            toValue: isSearching ? 0 : -24,
            duration: 350,
            easing: Easing.exp,
            useNativeDriver: true
        }).start()
    }, [isSearching])

    // ANIM X TEXT INPUT
    useEffect(() => {
        Animated.timing(_animX2, {
            toValue: isSearching ? 0 : -34,
            duration: 350,
            easing: Easing.exp,
            useNativeDriver: true
        }).start()
        if (!isSearching) {
            setSearchText(null)
            Keyboard.dismiss()
        }
            
    }, [isSearching])

    return (
        <LinearGradient
            colors={['#FA7A47', '#FF5791']}
            style={styles.ctn}
            start={{x : 0.013, y : 1}}
            end={{x : 1.829, y : -1.093}}
        >
            <Animated.View style={[styles.search_bar_ctn, {width: _animWidth}]}>
                <TouchableWithoutFeedback onPress={() => setIsSearching(false)}>
                    <Animated.View style={[styles.back_ctn, {transform:[{translateX:_animX1}]}]}>
                        <BackArrowSvg />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View style={{flex: 1, transform: [{translateX:_animX2}]}}>
                    <TextInput 
                        placeholder="Chercher..."
                        placeholderTextColor="#B1C3D0"
                        style={[styles.input]}
                        onFocus={() => setIsSearching(true)}
                        maxLength={25}
                        onChangeText={(text) => setSearchText(text)}
                        value={searchText}
                    />                    
                </Animated.View>

                <View style={styles.search_icon_ctn}>
                    <SearchSvg />
                </View>
            </Animated.View>
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
        minHeight: '15%',
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
        width: 344,
        // //width: '66%',
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        paddingLeft: 20,
    },
    back_ctn: {
        marginRight: 10
    },
    input: {
        fontSize: 19,
        fontFamily: 'Quicksand-Bold',
        padding: 0,
        flex: 1,
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