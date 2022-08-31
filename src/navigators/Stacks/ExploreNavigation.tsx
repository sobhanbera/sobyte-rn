/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - search screens navigators....
 */

import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {
    COMMON_ARTIST_DETAILS_SCREEN,
    COMMON_PLAYLIST_DETAILS_SCREEN,
    EXPLORE_SCREEN,
    EXPLORE_STACK_NAVIGATOR_ID,
} from '@/configs'
import {
    ArtistDetailsScreen,
    ExploreScreen,
    PlaylistDetailsScreen,
} from '@/containers'
import {useTheme} from '@/hooks'

const StackNavigator = createNativeStackNavigator()
export function ExploreStackNavigator() {
    const {theme} = useTheme()

    return (
        <StackNavigator.Navigator
            id={EXPLORE_STACK_NAVIGATOR_ID}
            screenOptions={{
                headerShown: false,

                animation: 'slide_from_bottom',
                animationTypeForReplace: 'push',

                orientation: 'portrait_up',

                gestureEnabled: true,
                customAnimationOnGesture: true,
                fullScreenGestureEnabled: true,

                contentStyle: {
                    backgroundColor: theme.background, // default bg color for all screens
                },
            }}>
            {/* main explore screen */}
            <StackNavigator.Screen
                name={EXPLORE_SCREEN}
                component={ExploreScreen}
            />

            {/* screen to render songs and playlist of any particular singer/artist */}
            <StackNavigator.Screen
                name={COMMON_ARTIST_DETAILS_SCREEN}
                component={ArtistDetailsScreen}
            />

            {/* screen to render songs and playlist with any browseID */}
            <StackNavigator.Screen
                name={COMMON_PLAYLIST_DETAILS_SCREEN}
                component={PlaylistDetailsScreen}
            />
        </StackNavigator.Navigator>
    )
}
