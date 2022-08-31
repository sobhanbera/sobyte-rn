/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - app's custom text input field.
 */

import React from 'react'
import {TextInput, TextInputProps} from 'react-native'

import {useTheme} from '@/hooks'
import {CircularRegular} from '@/configs'

export interface SobyteTextInputProps extends TextInputProps {}
export function SobyteTextInput(props: SobyteTextInputProps) {
    const {theme, fonts} = useTheme()

    return (
        <TextInput
            spellCheck={false}
            multiline={false}
            {...props}
            style={[
                fonts.textSmall,
                {
                    fontFamily: CircularRegular,
                    color: theme.themecolorrevert,
                },
                props.style, // this style should be at last, so that our styles could be overwritten by parent component
            ]}
        />
    )
}
