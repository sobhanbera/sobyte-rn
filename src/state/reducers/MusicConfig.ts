/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - this is the reducer which contains configs for music fetching
 */

import {createSlice} from '@reduxjs/toolkit'

export interface MusicConfigState {
    musicConfigData: {[key: string]: any}
    error: boolean
    ready: boolean
}
// default payload type
type MusicConfigPayload = {
    payload: Partial<MusicConfigState>
}

const musicConfigSlice = createSlice({
    name: 'musicconfig',
    initialState: {
        musicConfigData: {},
        error: false,
        ready: false,
    } as MusicConfigState,

    reducers: {
        /**
         * updates the value of music config in the reducer's state
         * @param state initial state
         * @param param1 the key value pairs of music config data which we will get from useMusic hook
         * @returns the updated state
         */
        updateMusicConfigState: (
            state: MusicConfigState,
            {
                payload: {musicConfigData = {}, error = false, ready = false},
            }: MusicConfigPayload,
        ) => {
            state.musicConfigData = musicConfigData
            state.error = error
            state.ready = ready
        },

        /**
         * only update the music config field
         * @param state initial state
         * @param param1 only data about music config
         */
        updateMusicConfig: (
            state: MusicConfigState,
            {payload: {musicConfigData = {}}}: MusicConfigPayload,
        ) => {
            state.musicConfigData = musicConfigData
        },

        /**
         * only update error and ready status of the state
         * @param state initial state
         * @param param1 data about error and ready status
         */
        updateMusicConfigStatus: (
            state: MusicConfigState,
            {payload: {error = false, ready = false}}: MusicConfigPayload,
        ) => {
            state.error = error
            state.ready = ready
        },

        /**
         * updates only error status
         * @param state initial state
         * @param param1 data about error status
         */
        updateMusicConfigErrorStatus: (
            state: MusicConfigState,
            {payload: {error = false}}: MusicConfigPayload,
        ) => {
            state.error = error
        },

        /**
         * updates only ready status
         * @param state initial state
         * @param param1 data about ready status
         */
        updateMusicConfigReadyStatus: (
            state: MusicConfigState,
            {payload: {ready = false}}: MusicConfigPayload,
        ) => {
            state.ready = ready
        },
    },
})

export const {
    updateMusicConfigState,
    updateMusicConfig,
    updateMusicConfigStatus,
    updateMusicConfigErrorStatus,
    updateMusicConfigReadyStatus,
} = musicConfigSlice.actions

const {reducer} = musicConfigSlice
export {reducer as MusicConfigReducer}
