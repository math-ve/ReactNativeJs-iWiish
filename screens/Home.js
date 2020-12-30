import React from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
// COMPS
import MainHeader from '../components/header/MainHeader'
import WelcomeBanner from '../components/banners/WelcomeBanner'
import HomeSection from '../components/home/HomeSection'
import GuideFooter from '../components/utilisation_guide/GuideFooter';

const HomeScreen = () => {

    // REDUX
    const UserData = useSelector(state => state.UserData)

    return (
        <SafeAreaView style={{flex: 1}}>
            <MainHeader />
            <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>

                {UserData.status.ShowWelcomeBanner ?
                <View style={styles.banner_ctn}>
                    <WelcomeBanner />
                </View> : <></>
                }

                <View style={styles.sections_ctn}>
                    <View style={styles.section_lists_ctn}>
                        <HomeSection title="Mes listes" svg="ListSvg"/>
                    </View>
                    <View style={styles.section_res_ctn}>
                        <HomeSection title="Mes réservations" svg="LockSvg"/>
                    </View>
                    <View style={styles.section_fav_ctn}>
                        <HomeSection title="Mes favoris" svg="StarSvg"/>
                    </View>               
                </View>

                <GuideFooter />
            </ScrollView>            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    scroll_ctn: {
        flex: 1,
    },
    scroll_ctn_content: {
        justifyContent: 'space-between',
        flexGrow: 1
    },
    banner_ctn: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    sections_ctn: {
        paddingBottom: 20
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