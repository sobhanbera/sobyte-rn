/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen will render more tracks/songs for any query
 */

import React from 'react'
import {View} from 'react-native'
import {NavigationHelpers, RouteProp} from '@react-navigation/native'
import {useMusic, useTheme} from '@/hooks'
import {SobyteTextView} from '@/components'

export interface MoreTrackDetailsScreenRouteParams {
    searchQuery: string
}
export interface MoreTrackDetailsScreenProps {
    navigation: NavigationHelpers<any>
    route: RouteProp<{params: MoreTrackDetailsScreenRouteParams}>
}
export function MoreTrackDetailsScreen({route}: MoreTrackDetailsScreenProps) {
    const {searchQuery} = route.params
    const {search} = useMusic()
    const {theme, layouts, gutters, variables, fonts} = useTheme()

    return (
        <View>
            <SobyteTextView>{searchQuery}</SobyteTextView>
        </View>
    )
}
