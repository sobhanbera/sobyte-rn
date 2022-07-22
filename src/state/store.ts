/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - one and only redux store
 */

import {combineReducers} from 'redux'
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'

import {
    MusicConfigReducer,
    ThemeReducer,
    PlayerDataReducer,
    TrackURLDataReducer,
    SearchResultsDataReducer,
    ExploreScreenDataReducer,
} from './reducers'
import {SobyteState} from '.'
import {
    EXPLORE_SCREEN_DATA_SLICE_NAME,
    MUSIC_CONFIG_SLICE_NAME,
    PLAYER_DATA_SLICE_NAME,
    SEARCH_RESULTS_DATA_SLICE_NAME,
    THEME_SLICE_NAME,
    TRACK_URL_DATA_SLICE_NAME,
} from '@/configs'

/**
 * default persisting config for the reducers...
 */
const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['theme'],
    // blacklist: [''],
}

/**
 * all reducers at one place combined
 * different reducers could have different persisting configs
 * according to there use case...
 */
const rootReducers = combineReducers<SobyteState>({
    [THEME_SLICE_NAME]: ThemeReducer, // theme data
    [MUSIC_CONFIG_SLICE_NAME]: MusicConfigReducer, // music api data
    [PLAYER_DATA_SLICE_NAME]: PlayerDataReducer,
    [TRACK_URL_DATA_SLICE_NAME]: TrackURLDataReducer,
    [SEARCH_RESULTS_DATA_SLICE_NAME]: SearchResultsDataReducer,
    [EXPLORE_SCREEN_DATA_SLICE_NAME]: ExploreScreenDataReducer,
})

// persisted reducers
const persistedReducer = persistReducer(rootPersistConfig, rootReducers)

/**
 * using persisted reducers instead of
 * normal reducers to create redux-store
 */
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
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
