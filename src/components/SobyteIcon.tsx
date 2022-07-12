/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - default app's icon rendering component
 */

import React from 'react'

import {IconProps} from 'react-native-vector-icons/Icon'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import OcticonsIcon from 'react-native-vector-icons/Octicons'
import ZocialIcon from 'react-native-vector-icons/Zocial'
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons'

import {useTheme} from '@/hooks'
import {DEFAULT_ICON_SIZE} from '@/configs'

/**
 * all the icons list available to render and its type
 */
export const IconOptions = {
    AntDesign: AntDesignIcon,
    Entypo: EntypoIcon,
    EvilIcons: EvilIconsIcon,
    Feather: FeatherIcon,
    FontAwesome: FontAwesomeIcon,
    FontAwesome5: FontAwesome5Icon,
    Fontisto: FontistoIcon,
    Foundation: FoundationIcon,
    Ionicons: IoniconsIcon,
    MaterialIcons: MaterialIconsIcon,
    MaterialCommunityIcons: MaterialCommunityIconsIcon,
    Octicons: OcticonsIcon,
    Zocial: ZocialIcon,
    SimpleLineIcons: SimpleLineIconsIcon,
}
export type IconTypeOptions = keyof typeof IconOptions

export interface SobyteIconProps extends IconProps {
    IconType: keyof typeof IconOptions
}
export const SobyteIcon = ({IconType, ...props}: SobyteIconProps) => {
    const {theme} = useTheme()
    const IconComponent = IconOptions[IconType] // getting the icon to render from the prop

    return (
        <IconComponent
            {...props}
            // some defaults
            color={props.color ?? theme.themecolorrevert}
            size={props.size ?? DEFAULT_ICON_SIZE}
        />
    )
}

export const s = () => {}
