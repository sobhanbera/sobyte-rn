/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TyepscriptReact
 *
 * Purpose - application's entry point wrapper after "index.js"
 */

import React from 'react'
import 'react-native-gesture-handler'

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'

import {AppEntryPoint} from '@/export'
import {store, persistor} from '@/redux/store'

const App = () => {
    return (
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
                <AppEntryPoint />
            </PersistGate>
        </Provider>
    )
}

export default App
