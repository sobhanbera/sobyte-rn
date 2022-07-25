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
import {ScrollView, View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

import {TrackChunksRenderer, HeaderExploreScreen} from '@/components'
import {useTheme} from '@/hooks'
import {ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK} from '@/configs'
import LinearGradient from 'react-native-linear-gradient'

export interface ExploreScreenProps {
    navigation: NavigationHelpers<any>
}
export function ExploreScreen({navigation}: ExploreScreenProps) {
    const {theme, colorscheme} = useTheme()

    /**
     * this function will launch search songs/tracks, artists tab
     */
    function changeNavigationToSearchTab() {
        /**
         * getting the parent navigator which is the bottom tab bar
         * and then navigating to the search stack navigator
         */
        navigation.getParent()?.navigate(ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK)
    }

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled>
                <LinearGradient
                    colors={[
                        ...colorscheme,
                        theme.background,
                        theme.background,
                        theme.background,
                        theme.background,
                        theme.background,
                    ]}
                    useAngle
                    angle={135}>
                    <HeaderExploreScreen
                        onPressSearch={changeNavigationToSearchTab}
                    />

                    <TrackChunksRenderer searchQuery="today's romantic songs" />
                </LinearGradient>
            </ScrollView>
        </View>
    )
}
