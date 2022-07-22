/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - the header of track player UI, this contains - search button, queue button, sobyte logo and more...
 */

import React from 'react'
import {Image, TouchableOpacity, View} from 'react-native'

import {useTheme} from '@/hooks'
import {
    DEFAULT_LOGO_WIDTH,
    DEFAULT_LOGO_HEIGHT,
    DEFAULT_ICON_SIZE,
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    TRACK_ARTWORK_WIDTH_LARGE,
} from '@/configs'

import {SobyteIcon} from './SobyteIcon'

/**
 * sobyte white colored logo
 */
const SobyteLogo = require('../assets/images/logos/sobyte_white.png')
export interface HeaderTrackPlayerProps {
    onPressSearch(): void
}
export const HeaderTrackPlayer = ({onPressSearch}: HeaderTrackPlayerProps) => {
    const {gutters, layouts, variables} = useTheme()

    return (
        <View
            style={[
                gutters.statusBarHeightMarginTop, // just to be in safe side
                layouts.row, // to get everything in row and center, to make the header at center parallel to other UI components
                layouts.justifyContentCenter, // center everything
            ]}>
            <View
                style={[
                    layouts.row,
                    layouts.justifyContentBetween,
                    layouts.alignItemsCenter, // centering vertically
                    gutters.regularPaddingTop, // an extra margin on top to make a distance from statusbar
                    {width: TRACK_ARTWORK_WIDTH_LARGE}, // somewhat larger than track artwork's width
                ]}>
                <Image
                    source={SobyteLogo}
                    style={[
                        gutters.regularMarginHorizontal, // a few padding, horizontal but needed on left side...
                        {
                            height: DEFAULT_LOGO_HEIGHT,
                            width: DEFAULT_LOGO_WIDTH,
                        },
                    ]}
                />

                {/**
                 * the right part of the header, with "search" and "option" button
                 * this part must not be included inside the space betwen flexbox,
                 * so we have to separate it from the left part of header */}
                <View style={[layouts.row]}>
                    {/* universal header search button */}
                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={onPressSearch}
                        style={[
                            gutters.tinyPadding,
                            gutters.tinyMarginRight, // since this is the first icon
                        ]}>
                        <SobyteIcon
                            IconType="Ionicons"
                            name="ios-search-outline"
                            size={DEFAULT_ICON_SIZE}
                            color={variables.colors.white}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
