/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - application main/root navigator....
 */

import {NavigationContainer} from '@react-navigation/native'
import React from 'react'

import AppStackNavigator from './AppStackNavigator'
import AuthStackNavigator from './AuthStackNavigator'

export default function AppNavigator() {
    const isLoggedIn = true

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}
