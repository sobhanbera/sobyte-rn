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

import {EXPLORE_SCREEN, EXPLORE_STACK_NAVIGATOR_ID} from '@/configs'
import {ExploreScreen} from '@/containers/app'
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
        </StackNavigator.Navigator>
    )
}
