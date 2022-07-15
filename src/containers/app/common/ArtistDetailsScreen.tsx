/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen provides data about artist like, tracks, playlist and more..
 */

import React from 'react'
import {View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

export interface ArtistDetailsScreenProps {
    navigation: NavigationHelpers<any>
}
export function ArtistDetailsScreen({navigation}: ArtistDetailsScreenProps) {
    return <View></View>
}
