import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
// STYLE
import { RedTrashSvg } from '../../utils/svg/index_svg'

const TrashButton = (props) => {

    // PROPS
    const { handleClick } = props

    return (
        <TouchableHighlight style={styles.ctn} onPress={() => handleClick()}>
            <View style={styles.svg_ctn}>
                <RedTrashSvg />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    ctn: {
        width: 70,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
    },
    svg_ctn: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})

export default TrashButton