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

import {CircularRegular} from '@/configs'

export interface SobyteTextViewProps extends TextProps {
    children: React.ReactChild
}
const SobyteTextView = (props: SobyteTextViewProps) => {
    return (
        <Text
            {...props}
            style={[
                {
                    fontFamily: CircularRegular,
                },
                props.style, // this style should be at last, so that our styles could be overwritten by parent component
            ]}>
            {props.children}
        </Text>
    )
}

export {SobyteTextView}
