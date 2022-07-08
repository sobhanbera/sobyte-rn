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

import {EXPLORE_SCREEN} from '@/configs'
import {ExploreScreen} from '@/containers/app'
import {useTheme} from '@/hooks'

const StackNavigator = createNativeStackNavigator()
export function ExploreStackNavigator() {
    const {theme} = useTheme()

    return (
        <StackNavigator.Navigator
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
            {/* main explore screen */}
            <StackNavigator.Screen
                name={EXPLORE_SCREEN}
                component={ExploreScreen}
            />
        </StackNavigator.Navigator>
    )
}
