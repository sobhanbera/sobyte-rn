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
    ACTUAL_SEARCH_SCREEN,
    SEARCH_SCREEN,
    SEARCH_STACK_NAVIGATOR_ID,
} from '@/configs'
import {SearchScreen, ActualSearchScreen} from '@/containers/app'
import {useTheme} from '@/hooks'

const StackNavigator = createNativeStackNavigator()
export function SearchStackNavigator() {
    const {theme} = useTheme()

    return (
        <StackNavigator.Navigator
            id={SEARCH_STACK_NAVIGATOR_ID}
            screenOptions={{
                headerShown: false,

                animation: 'simple_push',
                animationTypeForReplace: 'push',

                orientation: 'portrait_up',

                gestureEnabled: true,
                customAnimationOnGesture: true,
                fullScreenGestureEnabled: true,

                contentStyle: {
                    backgroundColor: theme.background, // default bg color for all screens
                },
            }}>
            {/* main search screen */}
            <StackNavigator.Screen
                name={SEARCH_SCREEN}
                component={SearchScreen}
            />

            {/* the actual screen where the queries will be done */}
            <StackNavigator.Screen
                name={ACTUAL_SEARCH_SCREEN}
                component={ActualSearchScreen}
            />
        </StackNavigator.Navigator>
    )
}
