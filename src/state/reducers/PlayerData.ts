/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - this is the reducer for music player's data
 */

import {createSlice} from '@reduxjs/toolkit'

import {ContinuationObjectKeys, SongObject, TrackMetadataBase} from '@/schemas'
import {PLAYER_DATA_SLICE_NAME} from '@/configs'

/**
 * the state of player screen data
 * this is the type which gives a basic blueprint of player screen data state...
 */
export interface PlayerDataState {
    tracks: Array<SongObject>
    continuationData: ContinuationObjectKeys

    currentTrack: TrackMetadataBase & SongObject
    currentTrackIndex: number
}
// default payload type
type PlayerDataPayload = {
    payload: Partial<PlayerDataState>
}

/**
 * default initial state of the player data state
 */
const initialState: PlayerDataState = {
    tracks: [],
    continuationData: {
        clickTrackingParams: '',
        continuation: '',
    },

    currentTrack: {
        url: '',
        title: '',
        musicId: '',
        playlistId: '',
        duration: 0,
        type: 'song',
        description: '',
        artwork: '',
        genre: '',
        params: '',
        artworks: [
            {
                url: '',
                height: 0,
            },
        ],
        album: {
            name: '',
            browseId: '',
        },
        artist: [
            {
                name: '',
                browseId: '',
            },
        ],
    },

    currentTrackIndex: 0,
}

/**
 * reducers, state, name, and slices imp
 */
const playerDataSlice = createSlice({
    name: PLAYER_DATA_SLICE_NAME,
    initialState,

    reducers: {
        /**
         * updates the track's list in the state of player data
         * @param state initial state of player data
         * @param param1 the tracks list and continuation data
         */
        updateTracksData: (
            state,
            {
                payload: {
                    tracks = [],
                    continuationData = initialState.continuationData,
                },
            }: {
                payload: {
                    tracks: Array<SongObject>
                    continuationData: ContinuationObjectKeys
                }
            },
        ) => {
            state.tracks = [...tracks]
            state.continuationData = continuationData
        },

        /**
         * this function can update the whole state at once,
         * so be careful and don't try to update any useful and persisting data here
         * like tracks, continuation data etc. when they are once updated...
         * @param state initial state of player data
         * @param param1 {PlayerDataPayload}
         */
        updatePlayerData: (state, {payload}: PlayerDataPayload) => {
            state = {
                ...state,
                ...payload,
            }
        },

        /**
         * updates the current track index
         * @param state initial state
         * @param param1 updated current index
         */
        updateCurrentTrackIndex: (
            state,
            {payload: {index = 0}}: {payload: {index: number}},
        ) => {
            state.currentTrackIndex = index
        },
    },

    extraReducers: {},
})

export const {updateTracksData, updatePlayerData, updateCurrentTrackIndex} =
    playerDataSlice.actions

const {reducer} = playerDataSlice
export {reducer as PlayerDataReducer}
