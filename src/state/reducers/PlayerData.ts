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

// the bare current track without any data
export const BareCurrentTrack: TrackMetadataBase & SongObject = {
    url: '',
    title: '',
    musicId: '',
    playlistId: '',
    duration: 0,
    type: '',
    artist: '',
    description: '',
    artwork: '',
    genre: '',
    params: '',
    artworks: [
        {
            url: '',
            height: 60,
        },
        {
            url: '',
            height: 120,
        },
    ],
    album: {
        name: '',
        browseId: '',
    },
    artists: [
        {
            name: '',
            browseId: '',
        },
    ],
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

    currentTrack: BareCurrentTrack,
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
         * this action will add more tracks data to the list of tracks/queue
         * @param state initial state
         * @param param1 more track data which is to be added at the end of main "tracks"
         */
        addMoreTracksToQueue: (
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
            state.tracks = [...state.tracks, ...tracks]
            state.continuationData = continuationData
        },

        /**
         * this method adds more tracks data to the queue but forgot/deletes all the remaining tracks in the queue except the last one
         * this is because, while adding more tracks to the list (by the above @addMoreTracksToQueue method) the animation is lagging very much
         * and the indexing and playing stucks sometimes...
         * so to overcome that I have decided to delete all the tracks excecpt the last one while adding more tracks to the queue
         *
         * @param state initial state
         * @param param1 tracks data and continuation data
         */
        addMoreTracksToQueueWhileKeepingTheLastTrack: (
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
            state.tracks = [state.tracks[state.tracks.length - 1], ...tracks]
            state.continuationData = continuationData
        },

        /**
         * updates the current track
         * @param state initial state
         * @param param1 updated current
         */
        updateCurrentTrack: (
            state,
            {
                payload: {currentTrack},
            }: {payload: {currentTrack: TrackMetadataBase & SongObject}},
        ) => {
            state.currentTrack = currentTrack
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

        /**
         * reset the track players data, more specifically the currentTrack in the state
         * @param state initial state of player data
         */
        resetPlayerData: state => {
            state.currentTrack = BareCurrentTrack
        },
    },

    extraReducers: {},
})

export const {
    updateTracksData,
    updatePlayerData,
    addMoreTracksToQueue,
    addMoreTracksToQueueWhileKeepingTheLastTrack,
    updateCurrentTrack,
    updateCurrentTrackIndex,
    resetPlayerData,
} = playerDataSlice.actions

const {reducer} = playerDataSlice
export {reducer as PlayerDataReducer}
