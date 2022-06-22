/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TyepscriptReact
 *
 * Purpose - application's final entry point after "index.js" and "app.js"
 */

import React from 'react'
import {SafeAreaView, StatusBar, useColorScheme, Text} from 'react-native'

import ErrorBoundary from '@/error/ErrorBoundary'

export function AppEntryPoint() {
    const isDarkMode = useColorScheme() === 'dark'

    return (
        <SafeAreaView>
            <StatusBar
                barStyle={isDarkMode ? 'dark-content' : 'light-content'}
            />

            <ErrorBoundary>
                <Text>{'Sobyte - Entry Point'}</Text>
            </ErrorBoundary>
        </SafeAreaView>
    )
}
