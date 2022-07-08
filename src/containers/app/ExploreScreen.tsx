/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - screen where the user can explore different tracks/artists/playlists/albums etc....
 */

import React from 'react'
import {Text, View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

export interface ExploreScreenProps {
    navigation: NavigationHelpers<any>
}
export function ExploreScreen({navigation}: ExploreScreenProps) {
    return (
        <View>
            <Text>EXPLORE SCREEN</Text>
        </View>
    )
}
