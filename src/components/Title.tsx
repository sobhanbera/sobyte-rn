/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component for title text
 */

import React from 'react'
import {TextProps} from 'react-native'

import {useTheme} from '@/hooks'
import {SobyteTextView} from './SobyteTextView'

export interface TitleProps extends TextProps {
    children: React.ReactChild
}
export const Title = (props: TitleProps) => {
    const {gutters, fonts, variables} = useTheme()

    return (
        <SobyteTextView
            {...props}
            style={[
                fonts.titleTiny,
                gutters.smallPadding,
                gutters.regularMarginTop,
                {color: variables.colors.white},
                props.style, // this style should be at last, so that our styles could be overwritten by parent component
            ]}>
            {props.children}
        </SobyteTextView>
    )
}
