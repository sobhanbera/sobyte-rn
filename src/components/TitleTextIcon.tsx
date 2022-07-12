/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component for title text with an optional right aligned text and optional icon
 */

import React from 'react'
import {TextProps, View} from 'react-native'

import {useTheme} from '@/hooks'
import {SobyteTextView} from './SobyteTextView'
import {TINY_ICON_SIZE} from '@/configs'
import {TouchableScalable} from './TouchableScalable'
import {IconTypeOptions, SobyteIcon} from './SobyteIcon'

export interface TitleTextIconProps extends TextProps {
    children: React.ReactChild

    /**
     * a boolean value to control if to show the icon on the right
     *
     * defalut to false, since we are also rendering some search suggestions
     * and we don't want to delete them, because they could not be deleted, HAHA
     */
    text?: string
    showIcon?: boolean

    iconName?: string
    IconType: IconTypeOptions
    onPressTextOrIcon?(): void
}
export const TitleTextIcon = ({
    text = '',

    showIcon = false,
    onPressTextOrIcon = () => {},

    IconType,
    iconName,

    ...props
}: TitleTextIconProps) => {
    const {gutters, layouts, fonts, theme} = useTheme()

    return (
        <View
            style={[
                layouts.row,
                layouts.alignItemsCenter,
                layouts.justifyContentBetween,
                layouts.fullWidth,
                gutters.regularMarginTop,
                gutters.tinyMarginBottom,
            ]}>
            <SobyteTextView
                {...props}
                style={[
                    fonts.titleTiny,
                    gutters.smallPadding,
                    gutters.regularPaddingHorizontal,
                    props.style, // this style should be at last, so that our styles could be overwritten by parent component
                ]}>
                {props.children}
            </SobyteTextView>

            <TouchableScalable
                onPress={onPressTextOrIcon}
                style={[layouts.row, layouts.alignItemsCenter]}>
                {text ? (
                    <SobyteTextView
                        {...props}
                        style={[
                            fonts.textSmall,
                            gutters.smallPaddingExceptRight,
                            // gutters.regularMarginRight,
                            props.style, // this style should be at last, so that our styles could be overwritten by parent component
                        ]}>
                        {text}
                    </SobyteTextView>
                ) : null}

                {showIcon && IconType && iconName ? (
                    <SobyteIcon
                        IconType={IconType}
                        name={iconName}
                        size={TINY_ICON_SIZE}
                        color={theme.themecolorrevert}
                        style={[
                            gutters.regularMarginRight,
                            gutters.smallPaddingExceptLeft, // since this is the last component as icon in a row
                        ]}
                    />
                ) : null}
            </TouchableScalable>
        </View>
    )
}
