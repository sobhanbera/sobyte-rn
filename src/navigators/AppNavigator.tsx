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

import {RootBottomBarNavigator} from './BottomBars'
import {AuthStackNavigator} from './Stacks'

export function AppNavigator() {
    const isLoggedIn = true

    return (
        <NavigationContainer>
            {isLoggedIn ? <RootBottomBarNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}
