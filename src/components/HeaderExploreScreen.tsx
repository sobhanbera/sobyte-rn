/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component is the header for explore screen only
 */

import React from 'react'
import {View} from 'react-native'
import FastImage from 'react-native-fast-image'

import {
    DEFAULT_HEADER_HEIGHT,
    DEFAULT_ICON_SIZE,
    DEFAULT_NAMED_LOGO_HEIGHT,
    DEFAULT_NAMED_LOGO_WIDTH,
} from '@/configs'
import {useTheme} from '@/hooks'

import {TouchableScalable} from './TouchableScalable'
import {SobyteIcon} from './SobyteIcon'

export interface HeaderExploreScreenProps {
    onPressSearch(): void
}
export function HeaderExploreScreen({onPressSearch}: HeaderExploreScreenProps) {
    const {gutters, layouts, assets, variables} = useTheme()

    return (
        <View style={[gutters.statusBarHeightPaddingTop, {}]}>
            <View
                style={[
                    layouts.row,
                    layouts.justifyContentBetween,
                    layouts.alignItemsCenter,
                    gutters.mediumPaddingHorizontal,
                    gutters.largePaddingVertical,
                    {minHeight: DEFAULT_HEADER_HEIGHT},
                ]}>
                {/* this is the app's logo image on left */}
                <FastImage
                    source={assets.images.logos.named}
                    style={[
                        {
                            width: DEFAULT_NAMED_LOGO_WIDTH * 1.1,
                            height: DEFAULT_NAMED_LOGO_HEIGHT * 1.1,
                        },
                    ]}
                />

                {/* and this is the search button on the right */}
                <TouchableScalable onPress={onPressSearch}>
                    <SobyteIcon
                        IconType="Ionicons"
                        name="ios-search-outline"
                        size={DEFAULT_ICON_SIZE}
                        color={variables.colors.white}
                    />
                </TouchableScalable>
            </View>
        </View>
    )
}
