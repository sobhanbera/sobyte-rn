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
import {
    REMOTE_ORIGIN_MUSIC_ID_MAXIMUM_LENGTH,
    TRACK_URL_DATA_SLICE_NAME,
} from '@/configs'

/**
 * the state of track url data
 */
export interface TrackURLDataState {
    trackURLs: {
        [key: string]: string
    }
}
export interface TrackURLDataPayload {
    payload: {
        musicId: string
        url: string
    }
}

/**
 * reducers, state, name, and slices imp
 */
const trackURLDataSlice = createSlice({
    name: TRACK_URL_DATA_SLICE_NAME,
    initialState: {
        trackURLs: {},
    } as TrackURLDataState,

    reducers: {
        /**
         * adds a new key/value pair of musicId and URL to its value
         * these values are URL of tracks which could be used again
         * so that no need to fetch the url again and again...
         * @param state initial state
         * @param param1 the data of track with URL and its ID
         */
        addTrackURL: (state, {payload}: TrackURLDataPayload) => {
            if (
                payload.url &&
                payload.musicId.length >= REMOTE_ORIGIN_MUSIC_ID_MAXIMUM_LENGTH
            ) {
                if (payload.musicId in state.trackURLs) {
                    // checking if it already exists here
                    console.log('already exists')
                } else {
                    // if not then add it
                    state.trackURLs = {
                        ...state.trackURLs,
                        [payload.musicId]: payload.url,
                    }
                }
            }
        },
    },
})

export const {addTrackURL} = trackURLDataSlice.actions

const {reducer} = trackURLDataSlice
export {reducer as TrackURLDataReducer}
