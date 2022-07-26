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
import LinearGradient from 'react-native-linear-gradient'

import {
    QueryTrackChunksRenderer,
    HeaderExploreScreen,
    BottomPaddingComponent,
    TitleTextIcon,
    QueryPlaylistsRenderer,
    QueryArtistRenderer,
    QueryTracksRenderer,
} from '@/components'
import {useTheme} from '@/hooks'
import {ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK} from '@/configs'

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
                    angle={180}
                    style={
                        {
                            // minHeight: SCREEN_HEIGHT * 5, // this is the minimum height of this screen
                        }
                    }>
                    <HeaderExploreScreen
                        onPressSearch={changeNavigationToSearchTab}
                    />

                    {/* today's hits */}
                    <TitleTextIcon>Today's Selection</TitleTextIcon>
                    <QueryTrackChunksRenderer searchQuery="Hindi romantic songs" />

                    {/* some artists list so render in this screen */}
                    <TitleTextIcon>Artists you may like</TitleTextIcon>
                    <QueryArtistRenderer
                        searchQueries={[
                            'Top bollywood singers',
                            'hindi romantic artist',
                            'Top bollywood singers',
                        ]}
                    />

                    {/* some artists list so render in this screen */}
                    <TitleTextIcon>Some playlists</TitleTextIcon>
                    <QueryPlaylistsRenderer
                        searchQuery={'Top bollywood singers'}
                    />

                    {/* some artists list so render in this screen */}
                    <TitleTextIcon>Some Tracks</TitleTextIcon>
                    <QueryTracksRenderer
                        searchQuery={'Top bollywood singers'}
                    />

                    <BottomPaddingComponent />
                </LinearGradient>
            </ScrollView>
        </View>
    )
}
