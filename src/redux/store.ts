/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - one and only redux store
 */

import AsyncStorage from '@react-native-async-storage/async-storage'
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import theme from './reducers/Theme'

// all reducers at one place combined
const reducers = combineReducers({
    theme: theme,
})

// persisted reducers
const persistedReducer = persistReducer(
    {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['theme'],
    },
    reducers,
)

/**
 * using persisted reducers instead of
 * normal reducers to create redux-store
 */
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        })

        return middlewares
    },
})

/**
 * this variable is responsible for waiting till redux is being ready
 * see useage at src/exports/index.tsx for this
 */
const persistor = persistStore(store)

// start listening
setupListeners(store.dispatch)

export {store, persistor}
