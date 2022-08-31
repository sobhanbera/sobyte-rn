/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - app specific text view component with custom style
 */

import React from 'react'
import {Text, TextProps} from 'react-native'

import {CircularRegular, NEXT_TITLE_COLOR_ALPHA} from '@/configs'
import {useTheme} from '@/hooks'

export interface SobyteTextViewProps extends TextProps {
    children: React.ReactChild
    subTitle?: boolean
}
const SobyteTextView = ({subTitle, ...props}: SobyteTextViewProps) => {
    const {theme, fonts} = useTheme()

    return (
        <Text
            {...props}
            style={[
                fonts.textSmall,
                {
                    fontFamily: CircularRegular,
                    color: subTitle
                        ? theme.themecolorrevert + NEXT_TITLE_COLOR_ALPHA
                        : theme.themecolorrevert,
                },
                props.style, // this style should be at last, so that our styles could be overwritten by parent component
            ]}>
            {props.children}
        </Text>
    )
}

export {SobyteTextView}
