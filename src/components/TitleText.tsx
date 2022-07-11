/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component for title text with an optional right aligned text
 */

import React from 'react'
import {TextProps, View} from 'react-native'

import {useTheme} from '@/hooks'
import {SobyteTextView} from './SobyteTextView'

export interface TitleTextProps extends TextProps {
    children: React.ReactChild

    /**
     * a boolean value to control if to show the icon on the right
     *
     * defalut to false, since we are also rendering some search suggestions
     * and we don't want to delete them, because they could not be deleted, HAHA
     */
    showText?: boolean
    onPressText?(): void
    text: string
}
export const TitleText = ({
    showText = false,
    onPressText = () => {},
    text = '',
    ...props
}: TitleTextProps) => {
    const {gutters, layouts, fonts} = useTheme()

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

            {showText ? (
                <SobyteTextView
                    {...props}
                    onPress={onPressText}
                    style={[
                        fonts.titleTiny,
                        gutters.smallPadding,
                        gutters.regularMarginRight,
                        props.style, // this style should be at last, so that our styles could be overwritten by parent component
                    ]}>
                    {props.children}
                </SobyteTextView>
            ) : null}
        </View>
    )
}
