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
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native'

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'

import ErrorBoundary from '@/error/ErrorBoundary'
import {store, persistor} from '@/state/store'
import AppNavigator from '@/navigators/AppNavigator'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export function AppEntryPoint() {
    const isDarkMode = useColorScheme() === 'dark'

    return (
        /* this wrapper is needed to work with react-native-gesture-handler package */
        <GestureHandlerRootView style={{flex: 1}}>
            <ErrorBoundary id="root">
                <Provider store={store}>
                    {/**
                     * DOCUMENTATION:
                     *
                     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
                     * and saved to redux.
                     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
                     * for example `loading={<SplashScreen />}`.
                     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
                     */}
                    <PersistGate loading={null} persistor={persistor}>
                        <SafeAreaView
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                            {/* the status bar of device */}
                            <StatusBar
                                barStyle={
                                    isDarkMode
                                        ? 'dark-content'
                                        : 'light-content'
                                }
                            />

                            <ErrorBoundary id="app">
                                <AppNavigator />
                            </ErrorBoundary>
                        </SafeAreaView>
                    </PersistGate>
                </Provider>
            </ErrorBoundary>
        </GestureHandlerRootView>
    )
}
