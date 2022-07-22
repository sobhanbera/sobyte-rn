/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - to export all the redux related codes
 */

export * from './store'
export * from './reducers'

import {
    EXPLORE_SCREEN_DATA_SLICE_NAME,
    MUSIC_CONFIG_SLICE_NAME,
    PLAYER_DATA_SLICE_NAME,
    SEARCH_RESULTS_DATA_SLICE_NAME,
    THEME_SLICE_NAME,
    TRACK_URL_DATA_SLICE_NAME,
} from '@/configs'
import {
    ExploreScreenDataState,
    ThemeState,
    MusicConfigState,
    PlayerDataState,
    TrackURLDataState,
    SearchResultsDataState,
} from './reducers'

/**
 * a interface which is a blueprint for all the states combined
 * just add other state here as new and new states are being created...
 *
 * this modal could be used in useSelector for the type of state like below
 * const themeState = useSelector((state: SobyteState) => state.theme)
 *
 */
export interface SobyteState {
    [THEME_SLICE_NAME]: ThemeState
    [MUSIC_CONFIG_SLICE_NAME]: MusicConfigState
    [PLAYER_DATA_SLICE_NAME]: PlayerDataState
    [TRACK_URL_DATA_SLICE_NAME]: TrackURLDataState
    [SEARCH_RESULTS_DATA_SLICE_NAME]: SearchResultsDataState
    [EXPLORE_SCREEN_DATA_SLICE_NAME]: ExploreScreenDataState
}
