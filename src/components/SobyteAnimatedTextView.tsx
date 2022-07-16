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
import {Animated, TextProps} from 'react-native'

import {CircularRegular, NEXT_TITLE_COLOR_ALPHA} from '@/configs'
import {useTheme} from '@/hooks'

export interface SobyteAnimatedTextViewProps
    extends Animated.WithAnimatedObject<TextProps> {
    children: React.ReactChild
    subTitle?: boolean
}
const SobyteAnimatedTextView = ({
    subTitle,
    ...props
}: SobyteAnimatedTextViewProps) => {
    const {theme, fonts} = useTheme()

    return (
        <Animated.Text
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
        </Animated.Text>
    )
}

export {SobyteAnimatedTextView}
