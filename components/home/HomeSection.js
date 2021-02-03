import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
// COMPS
import Svg from '../utils/Svg'
import HomeSectionBtn from './HomeSectionBtn'
import HomeSectionContent from './HomeSectionContent'

const HomeSection = (props) => {

    const { title, svg } = props

    return (
        <View style={[styles.section_ctn, title === "Mes listes" ? {marginBottom: -30} : {}]}>
            <View style={[styles.section_header, title === "Mes listes"  || title === "Mes favoris" ? {paddingHorizontal: 20} : {}]}>
                <View style={[styles.section_title_ctn]}>
                    <Text style={[styles.section_title]}>{title}</Text>
                    <View style={[styles.title_svg_ctn]}>
                        <Svg svg={svg} />
                    </View>
                </View>
                <View style={[styles.section_header_btn]}>
                    <HomeSectionBtn section={title}/>
                </View>
            </View>
            <HomeSectionContent section={title}/>
        </View>
    )
}

const styles = StyleSheet.create({
    section_ctn: {
        width: '100%',
        marginTop: 20,
    },
    section_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
        alignItems: 'center'
    },
    section_title_ctn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    section_title: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
        fontSize: 18
    },
    title_svg_ctn: {
        marginLeft: 7,
        paddingTop: 3
    },
    section_content_ctn: {
        minHeight: 50,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 10
    }
})

export default HomeSection