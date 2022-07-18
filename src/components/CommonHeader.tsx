/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - the common bare minimum header component for screens
 */

import React from 'react'
import {View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

import {useTheme} from '@/hooks'
import {DEFAULT_HEADER_HEIGHT, DEFAULT_ICON_SIZE} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {SobyteIcon} from './SobyteIcon'
import {TouchableScalable} from './TouchableScalable'

export interface CommonHeaderProps {
    title: string
    navigation: NavigationHelpers<any>
}
export function CommonHeader({title, navigation}: CommonHeaderProps) {
    const {fonts, gutters, layouts, theme} = useTheme()

    return (
        <View
            style={[
                layouts.row,
                layouts.alignItemsCenter,
                gutters.statusBarHeightMarginTop,
                gutters.regularPaddingHorizontal,
                {
                    height: DEFAULT_HEADER_HEIGHT,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                },
            ]}>
            <TouchableScalable
                onPress={() => navigation.goBack()}
                style={[gutters.tinyPadding]}>
                <SobyteIcon
                    IconType="Ionicons"
                    name="arrow-back"
                    size={DEFAULT_ICON_SIZE}
                />
            </TouchableScalable>

            <SobyteTextView
                style={[gutters.regularPaddingHorizontal, fonts.titleTiny]}>
                {title}
            </SobyteTextView>
        </View>
    )
}
