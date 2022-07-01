/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - app screens navigator....
 */

import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {SOBYTE_PLAYER_QUEUE_SCREEN, SOBYTE_PLAYER_SCREEN} from '@/configs'
import {SobytePlayerScreen, TrackPlayerQueueScreen} from '@/containers/app'
import {useTheme} from '@/hooks'

const AppNavigationStack = createNativeStackNavigator()
export default function AppStackNavigator() {
    const {theme} = useTheme()

    return (
        <AppNavigationStack.Navigator
            screenOptions={{
                headerShown: false,

                animation: 'fade',

                statusBarAnimation: 'slide',
                statusBarStyle: 'auto',

                orientation: 'portrait_up',

                contentStyle: {
                    backgroundColor: theme.background, // default bg color for all screens
                },
            }}>
            {/* main music player screen */}
            <AppNavigationStack.Screen
                name={SOBYTE_PLAYER_SCREEN}
                component={SobytePlayerScreen}
            />

            {/* queue screen */}
            <AppNavigationStack.Screen
                name={SOBYTE_PLAYER_QUEUE_SCREEN}
                component={TrackPlayerQueueScreen}
            />
        </AppNavigationStack.Navigator>
    )
}
