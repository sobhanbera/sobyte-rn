/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - screen where the user can search songs....
 */

import React from 'react'
import {Text, View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

export interface SearchScreenProps {
    navigation: NavigationHelpers<any>
}
export function SearchScreen({navigation}: SearchScreenProps) {
    return (
        <View>
            <Text>ASD</Text>
        </View>
    )
}
