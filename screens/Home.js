import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Dimensions, Animated, Easing } from 'react-native';
// COMPS
import MainHeader from '../components/header/MainHeader'
import SearchView from '../components/home/SearchView';
import MyPageView from '../components/home/MyPageView';

const HomeScreen = () => {

    // LOCAL STATE
    const [isSearching, setIsSearching] = useState(false)

    const [searchText, setSearchText] = useState(null)

    const [deviceWidth, setDeviceWidth] = useState(Math.round(Dimensions.get('window').width))
    const [deviceHeight, setDeviceHeight] = useState(Math.round(Dimensions.get('window').height))
    const [_animX] = useState(new Animated.Value(deviceWidth))

    // ANIMATION TRANSLATE X HOME SCREEN
    useEffect(() => {
        Animated.timing(_animX, {
            toValue: isSearching ? 0 : -deviceWidth,
            duration: 350,
            easing: Easing.exp,
            useNativeDriver: true
        }).start()
    }, [isSearching])

    return (
        <SafeAreaView style={{flex: 1}}>
            <MainHeader setIsSearching={setIsSearching} isSearching={isSearching} searchText={searchText} setSearchText={setSearchText}/>
            <Animated.View style={[styles.anim_ctn, {transform: [{translateX: _animX}], height: deviceHeight}]}>
                <SearchView isSearching={isSearching} setIsSearching={setIsSearching} searchText={searchText}/>
                <MyPageView />    
            </Animated.View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    anim_ctn: {
        flex: 1,
        flexDirection: 'row',
        width: '200%',
        backgroundColor:'#F0F1F5'
    },
    scroll_ctn: {
        flex: 1,
    },
    scroll_ctn_content: {
        minHeight: '85%',
        paddingBottom: 50,
    },
    banner_ctn: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    sections_ctn: {
        paddingBottom: 20, 
    },
    section_lists_ctn: {

    },
    section_res_ctn: {
        paddingHorizontal: 20,

    },
    section_fav_ctn: {
        paddingHorizontal: 20,
    }
})

export default HomeScreen