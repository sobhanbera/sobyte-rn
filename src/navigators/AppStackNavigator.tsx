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

import {SOBYTE_PLAYER_SCREEN} from '@/configs/screens'
import {SobytePlayerScreen} from '@/containers/app'

const AppNavigationStack = createNativeStackNavigator()
export default function AppStackNavigator() {
    return (
        <AppNavigationStack.Navigator
            screenOptions={{
                headerShown: false,

                animation: 'fade',

                statusBarAnimation: 'slide',
                statusBarStyle: 'auto',

                orientation: 'portrait_up',
            }}>
            {/* main music player screen */}
            <AppNavigationStack.Screen
                name={SOBYTE_PLAYER_SCREEN}
                component={SobytePlayerScreen}
            />
        </AppNavigationStack.Navigator>
    )
}
