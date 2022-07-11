/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component for title along with an optional icon
 */

import React from 'react'
import {TextProps, View} from 'react-native'

import {useTheme} from '@/hooks'
import {SobyteTextView} from './SobyteTextView'
import {TINY_ICON_SIZE} from '@/configs'
import {IconProps} from 'react-native-vector-icons/Icon'

export interface TitleIconProps extends TextProps {
    children: React.ReactChild

    /**
     * a boolean value to control if to show the icon on the right
     *
     * defalut to false, since we are also rendering some search suggestions
     * and we don't want to delete them, because they could not be deleted, HAHA
     */
    showIcon?: boolean
    onPressIcon?(): void

    IconComponentType: React.ComponentClass<IconProps> // type of icon
    iconName: string
}
export const TitleIcon = ({
    showIcon = false,
    onPressIcon = () => {},
    IconComponentType,
    iconName,
    ...props
}: TitleIconProps) => {
    const {gutters, layouts, fonts, theme} = useTheme()

    return (
        <View
            style={[
                layouts.row,
                layouts.alignItemsCenter,
                layouts.justifyContentBetween,
                gutters.regularMarginTop,
                gutters.tinyMarginBottom,
            ]}>
            <SobyteTextView
                {...props}
                style={[
                    fonts.titleTiny,
                    gutters.smallPadding,
                    props.style, // this style should be at last, so that our styles could be overwritten by parent component
                ]}>
                {props.children}
            </SobyteTextView>

            {showIcon ? (
                <IconComponentType
                    name={iconName}
                    size={TINY_ICON_SIZE}
                    color={theme.themecolorrevert}
                    style={[gutters.regularMarginRight, gutters.tinyPadding]}
                    onPress={onPressIcon}
                />
            ) : null}
        </View>
    )
}
