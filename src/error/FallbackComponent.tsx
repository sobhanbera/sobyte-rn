/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TyepscriptReact
 *
 * Purpose - fallback component which will be rendered when any error occurs..
 */

import {View, Text} from 'react-native'
import React from 'react'

interface FallbackComponentProps {
    error: Error
}
export default function FallbackComponent(props: FallbackComponentProps) {
    return (
        <View>
            <Text>Oops...</Text>
            <Text>Error: {props.error.message}</Text>
        </View>
    )
}
