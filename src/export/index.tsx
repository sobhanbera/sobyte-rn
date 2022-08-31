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
// import {SafeAreaView} from 'react-native'

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {MenuProvider} from 'react-native-popup-menu'

import ErrorBoundary from '@/error/ErrorBoundary'
import {store, persistor} from '@/state/store'
import {AppNavigator} from '@/navigators'
import SobyteTrackPlayer from '@/services/SobyteTrackPlayer'

export function AppEntryPoint() {
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
                        <SobyteTrackPlayer>
                            {/* <SafeAreaView
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}> */}

                            {/**
                             * Wrap your application inside MenuProvider and then simply use Menu
                             * component where you need it. Below you can find a simple example.
                             *
                             * @see https://github.com/instea/react-native-popup-menu#basic-usage
                             */}
                            <MenuProvider>
                                <ErrorBoundary id="app">
                                    <AppNavigator />
                                </ErrorBoundary>
                            </MenuProvider>
                            {/* </SafeAreaView> */}
                        </SobyteTrackPlayer>
                    </PersistGate>
                </Provider>
            </ErrorBoundary>
        </GestureHandlerRootView>
    )
}
