/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - this reducer is to store the data of ExploreScreen
 */

import {createSlice} from '@reduxjs/toolkit'

import {EXPLORE_SCREEN_DATA_SLICE_NAME} from '@/configs'
import {ExploreScreenDataModal, ExploreScreenDataCategory} from '@/schemas'

/**
 * the state type of the explore screen data
 */
export type ExploreScreenDataState = {
    [key in ExploreScreenDataCategory]: ExploreScreenDataModal
}
export interface ExploreScreenDataPayload {
    payload: Partial<ExploreScreenDataState>
}
/**
 * state without any data in it
 */
export const BareExploreScreenDataState: ExploreScreenDataState = {
    romantic_songs: {dataCategory: 'romantic_songs', results: [], searchQuery: ''},
    bollywood_songs: {dataCategory: 'bollywood_songs', results: [], searchQuery: ''},
    todays_hits: {dataCategory: 'todays_hits', results: [], searchQuery: ''},
    new_release: {dataCategory: 'new_release', results: [], searchQuery: ''},
    romance_2010: {dataCategory: 'romance_2010', results: [], searchQuery: ''},
    made_for_you: {dataCategory: 'made_for_you', results: [], searchQuery: ''},
    evergreen: {dataCategory: 'evergreen', results: [], searchQuery: ''},
    trending_songs: {dataCategory: 'trending_songs', results: [], searchQuery: ''},
    blockbuster_romance: {dataCategory: 'blockbuster_romance', results: [], searchQuery: ''},
    popular_tracks: {dataCategory: 'popular_tracks', results: [], searchQuery: ''},
    popular_artists: {dataCategory: 'popular_artists', results: [], searchQuery: ''},
    top_tracks: {dataCategory: 'top_tracks', results: [], searchQuery: ''},
    top_playlists: {dataCategory: 'top_playlists', results: [], searchQuery: ''},
    new_artists: {dataCategory: 'new_artists', results: [], searchQuery: ''},
    sad_tracks: {dataCategory: 'sad_tracks', results: [], searchQuery: ''},
    lofi_tracks: {dataCategory: 'lofi_tracks', results: [], searchQuery: ''},
}

/**
 * reducers, state, name, and slices imp
 */
const exploreScreenDataSlice = createSlice({
    name: EXPLORE_SCREEN_DATA_SLICE_NAME,
    initialState: BareExploreScreenDataState as ExploreScreenDataState,

    reducers: {
        /**
         * this method will add or update data for the explore screen for different quries...
         *
         * @param state the initial state
         * @param param1 what data is loaded and to be stored in this state
         */
        updateExploreScreenData: (state, {payload}: ExploreScreenDataPayload) => {
            return {
                ...state,
                ...payload,
            }
        },
    },
})

export const {} = exploreScreenDataSlice.actions

const {reducer} = exploreScreenDataSlice
export {reducer as ExploreScreenDataReducer}
