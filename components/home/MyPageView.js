import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
// REDUX
import { useSelector } from 'react-redux';
// COMPS
import WelcomeBanner from '../../components/banners/WelcomeBanner'
import HomeSection from '../../components/home/HomeSection'
import GuideFooter from '../../components/utilisation_guide/GuideFooter';

const MyPageView = (props) => {

    // REDUX
    const UserData = useSelector(state => state.UserData)

    return (
        <ScrollView style={styles.scroll_ctn} contentContainerStyle={styles.scroll_ctn_content}>     
            {UserData.status.ShowWelcomeBanner ?
            <View style={styles.banner_ctn}>
                <WelcomeBanner />
            </View> : <></>
            }

            <View style={[styles.sections_ctn]}>
                <View style={[styles.section_lists_ctn]}>
                    <HomeSection title="Mes listes" svg="ListSvg"/>
                </View>
                <View style={styles.section_res_ctn}>
                    <HomeSection title="Mes réservations" svg="LockSvg"/>
                </View>
                <View style={styles.section_fav_ctn}>
                    <HomeSection title="Mes favoris" svg="StarSvg"/>
                </View>               
            </View>
            <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
                <GuideFooter />  
            </View>       
        </ScrollView>    
    )
}

const styles = StyleSheet.create({
    scroll_ctn: {
        flex: 1,
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#F0F1F5'
    },
    scroll_ctn_content: {
        minHeight: '100%',
        backgroundColor: '#F0F1F5'
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

    }
})

export default MyPageView