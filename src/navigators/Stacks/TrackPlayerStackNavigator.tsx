/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - Track Player's screens navigator....
 */

import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {
    SOBYTE_PLAYER_QUEUE_SCREEN,
    SOBYTE_PLAYER_SCREEN,
    TRACK_PLAYER_STACK_NAVIGATOR_ID,
} from '@/configs'
import {SobytePlayerScreen, TrackPlayerQueueScreen} from '@/containers/app'
import {useTheme} from '@/hooks'

const TrackPlayerNavigationStack = createNativeStackNavigator()
export function TrackPlayerStackNavigator() {
    const {theme} = useTheme()

    return (
        <TrackPlayerNavigationStack.Navigator
            id={TRACK_PLAYER_STACK_NAVIGATOR_ID}
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
            }}
            initialRouteName={SOBYTE_PLAYER_SCREEN}>
            {/* main music player screen */}
            <TrackPlayerNavigationStack.Screen
                name={SOBYTE_PLAYER_SCREEN}
                component={SobytePlayerScreen}
            />

            {/* queue screen */}
            <TrackPlayerNavigationStack.Screen
                name={SOBYTE_PLAYER_QUEUE_SCREEN}
                component={TrackPlayerQueueScreen}
            />
        </TrackPlayerNavigationStack.Navigator>
    )
}
