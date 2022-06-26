/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - this is the reducer which contains configs for music fetching
 */

import {MUSIC_CONFIG_SLICE_NAME} from '@/configs'
import {createSlice} from '@reduxjs/toolkit'

/**
 * these are the fields we are using currently,
 * in future more fields could be introduced for testing and deployment purpose and more...
 */
export interface MusicConfig {
    VISITOR_DATA: string
    INNERTUBE_CONTEXT_CLIENT_NAME: string
    INNERTUBE_CLIENT_VERSION: string
    DEVICE: string
    PAGE_CL: string
    PAGE_BUILD_LABEL: string
    INNERTUBE_API_VERSION: string
    INNERTUBE_API_KEY: string

    /**
     * extra fields
     * these are not needed during api request
     * instead needed during initialization of API
     *
     * it contains more fields which are only needed when making api request
     * so saving it as anonymous data
     * since they are a huge number of fields to be manually create a modal for it
     */
    [key: string]: any
}
/**
 * the state of music config
 * this is the type which gives a basic blueprint of music config data state...
 */
export interface MusicConfigState {
    musicConfigData: MusicConfig
    error: boolean
    ready: boolean
}
// default payload type
type MusicConfigPayload = {
    payload: Partial<MusicConfigState>
}

export const BareMusicConfig: MusicConfig = {
    VISITOR_DATA: '',
    INNERTUBE_CONTEXT_CLIENT_NAME: '',
    INNERTUBE_CLIENT_VERSION: '',
    DEVICE: '',
    PAGE_CL: '',
    PAGE_BUILD_LABEL: '',
    INNERTUBE_API_VERSION: '',
    INNERTUBE_API_KEY: '',
}
export const BareMusicConfigState: MusicConfigState = {
    musicConfigData: BareMusicConfig,
    error: false,
    ready: false,
}

const musicConfigSlice = createSlice({
    name: MUSIC_CONFIG_SLICE_NAME,
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
                payload: {
                    musicConfigData = BareMusicConfig, // null backup data
                    error = false,
                    ready = false,
                },
            }: MusicConfigPayload,
        ) => {
            state.musicConfigData = musicConfigData

            state.error = error
            state.ready = ready
            // console.log(state.musicConfigData)
        },

        /**
         * only update the music config field
         * @param state initial state
         * @param param1 only data about music config
         */
        updateMusicConfig: (
            state: MusicConfigState,
            {payload: {musicConfigData = BareMusicConfig}}: MusicConfigPayload,
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
