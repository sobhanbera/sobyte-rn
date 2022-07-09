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

import {USER_PROFILE_SCREEN, USER_PROFILE_STACK_NAVIGATOR_ID} from '@/configs'
import {UserProfileScreen} from '@/containers/app'
import {useTheme} from '@/hooks'

const StackNavigator = createNativeStackNavigator()
export function UserProfileStackNavigator() {
    const {theme} = useTheme()

    return (
        <StackNavigator.Navigator
            id={USER_PROFILE_STACK_NAVIGATOR_ID}
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
            {/* main search screen */}
            <StackNavigator.Screen
                name={USER_PROFILE_SCREEN}
                component={UserProfileScreen}
            />
        </StackNavigator.Navigator>
    )
}
