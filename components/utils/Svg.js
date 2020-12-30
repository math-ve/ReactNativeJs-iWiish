import React from 'react'
// STYLE
import { PlusSvg, StarSvg, ListSvg, LockSvg, TitleSvg, KeySvg } from '../../utils/svg/index_svg'

const HomeSvg = (props) => {

    // PROPS
    const { svg } = props

    if (svg === "PlusSvg")
        return (
            <PlusSvg />
        )
    else if (svg === "StarSvg")
        return (
            <StarSvg />
        )
    else if (svg === "ListSvg")
        return (
            <ListSvg />
        )
    else if (svg === "LockSvg")
        return (
            <LockSvg />
        )
    else if (svg === "TitleSvg")
        return (
            <TitleSvg />
        )
    else if (svg === "KeySvg")
        return (
            <KeySvg />
        )
}

export default HomeSvg