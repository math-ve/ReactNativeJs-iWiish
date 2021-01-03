import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
// STYLE
import { PlusSvg } from '../../utils/svg/index_svg'
// DEPENDENCIES
import { useNavigation } from '@react-navigation/native'


const HomeSectionBtn = (props) => {

    // PROPS
    const { section } = props

    // NAVIGATION
    const navigation = useNavigation()

    const navigateTo = (target) => {
        navigation.navigate(target)
    }

    if (section === "Mes listes")
        return (
            <TouchableOpacity onPress={() => navigateTo("ListCreation")} style={{paddingLeft:15}}>
                <PlusSvg />
            </TouchableOpacity>
        )
    else if (section === "Mes réservations")
        return (
            <TouchableOpacity>
                <Text style={styles.btn_text}>Voir tout</Text>
            </TouchableOpacity>
        )
    else if (section === "Mes favoris")
        return (
            <TouchableOpacity>
                <Text style={styles.btn_text}>Voir tout</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    btn_text : {
        color: '#FA7A47',
        fontSize: 16,
        fontFamily: 'Quicksand-Bold'
    }
})

export default HomeSectionBtn