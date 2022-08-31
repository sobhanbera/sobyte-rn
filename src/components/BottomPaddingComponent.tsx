/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to provide some bottom padding. this could be used after long list to give some space at the end
 */

import React from 'react'
import {View} from 'react-native'
import {useTheme} from '@/hooks'

export interface BottomPaddingComponentProps {
    padding?: number
}
export const BottomPaddingComponent = ({
    padding,
}: BottomPaddingComponentProps) => {
    const {gutters} = useTheme()

    return (
        <View
            style={[padding ? {padding: padding} : gutters.extraLargePadding]}
        />
    )
}
