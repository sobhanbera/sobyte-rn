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
import {AlbumObject, ArtistObject, PlaylistObject, SongObject} from '@/schemas'

/**
 * the state of track url data
 */
export interface SearchResultsDataState {
    searchHistory: string[]
    songsData: Array<SongObject>
    artistsData: Array<ArtistObject>
    playlistsData: Array<PlaylistObject>
    albumsData: Array<AlbumObject>
}
export interface SearchResultsDataPayload {
    payload: SearchResultsDataState
}

/**
 * reducers, state, name, and slices imp
 */
const searchResultsDataSlice = createSlice({
    name: SEARCH_RESULTS_DATA_SLICE_NAME,

    initialState: {
        searchHistory: [],
        songsData: [],
        artistsData: [],
        playlistsData: [],
        albumsData: [],
    } as SearchResultsDataState,

    reducers: {
        /**
         * this action will update the search history array in the store
         * @param state initial state
         * @param param1 array data about search history
         */
        updateSearchHistories: (
            state,
            {payload}: {payload: {searchHistory: string[]}},
        ) => {
            if (payload?.searchHistory)
                state.searchHistory = payload.searchHistory
        },
    },
})

export const {updateSearchHistories} = searchResultsDataSlice.actions

const {reducer} = searchResultsDataSlice
export {reducer as SearchResultsDataReducer}
