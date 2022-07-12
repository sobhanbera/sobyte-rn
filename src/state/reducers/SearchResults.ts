/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - this is the reducer for containing tracks URLs
 */

import {createSlice} from '@reduxjs/toolkit'

import {SEARCH_RESULTS_DATA_SLICE_NAME} from '@/configs'
import {
    ArtistObject,
    ContinuationObjectKeys,
    PlaylistObject,
    SongObject,
} from '@/schemas'

/**
 * the state of track url data
 */
export interface SearchResultsDataState {
    searchQueryText: string

    searchHistory: string[]

    searchSuggestions: string[]

    songsData: Array<SongObject>
    artistsData: Array<ArtistObject>
    playlistsData: Array<PlaylistObject>

    songsContinuationData: ContinuationObjectKeys
    artistsContinuationData: ContinuationObjectKeys
    playlistsContinuationData: ContinuationObjectKeys
}
export interface SearchResultsDataPayload {
    payload: Partial<SearchResultsDataState>
}

/**
 * reducers, state, name, and slices imp
 */
const searchResultsDataSlice = createSlice({
    name: SEARCH_RESULTS_DATA_SLICE_NAME,

    initialState: {
        searchQueryText: '',

        searchHistory: [],

        searchSuggestions: [],

        songsData: [],
        artistsData: [],
        playlistsData: [],

        songsContinuationData: {
            clickTrackingParams: '',
            continuation: '',
        },
        artistsContinuationData: {
            clickTrackingParams: '',
            continuation: '',
        },
        playlistsContinuationData: {
            clickTrackingParams: '',
            continuation: '',
        },
    } as SearchResultsDataState,

    reducers: {
        /**
         * this action will update the search query in the this store
         * @param state initial state
         * @param param1 a string denoting search query text
         */
        updateSearchQueryText: (
            state,
            {payload}: {payload: {query: string}},
        ) => {
            state.searchQueryText = payload.query
        },

        /**
         * this action will update the search history array in the store
         * @param state initial state
         * @param param1 array data about search history
         */
        updateSearchHistories: (
            state,
            {payload}: {payload: {searchHistory: string[]}},
        ) => {
            if (Array.isArray(payload.searchHistory))
                state.searchHistory = payload.searchHistory
        },

        /**
         * this action will update the search sugestions array in the store
         * @param state initial state
         * @param param1 array data about search suggestions
         */
        updateSearchSuggestions: (
            state,
            {payload}: {payload: {suggestions: string[]}},
        ) => {
            if (Array.isArray(payload.suggestions))
                state.searchSuggestions = payload.suggestions
        },

        /**
         * this action will update the actual search results in the store
         *
         * @param state initial state
         * @param param1 this data could be song, artists, playlist, albums data which is to be saved
         */
        updateSearchResultData: (
            state,
            {payload}: SearchResultsDataPayload,
        ) => {
            return {
                ...state,
                ...payload,
            }
        },
    },
})

export const {
    updateSearchQueryText,
    updateSearchHistories,
    updateSearchSuggestions,
    updateSearchResultData,
} = searchResultsDataSlice.actions

const {reducer} = searchResultsDataSlice
export {reducer as SearchResultsDataReducer}
