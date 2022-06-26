/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TyepscriptReact
 *
 * Purpose - wrapper to initialize app's track player
 */

import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import TrackPlayer, {Capability, RatingType} from 'react-native-track-player'

import {useMusic} from '@/hooks'
import playerServices from './playerservices'
import {SobyteState} from '@/state'

const SobyteTrackPlayerContext = React.createContext<boolean>(false)
interface SobyteTrackPlayerProps {
    children: React.ReactChild
}
export default function SobyteTrackPlayer(props: SobyteTrackPlayerProps) {
    const {initMusicApi, search} = useMusic()
    const musicConfigError = useSelector(
        (state: SobyteState) => state.musicconfig.error,
    )

    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false)

    const initializeAppTrackPlayer = () => {
        /**
         * settings the options for track player which are very neccessary for this app
         * these are like icons of some buttons in notification
         * or configs..
         */
        TrackPlayer.updateOptions({
            icon: require('@/assets/images/logos/sobyte_white.png'),

            rewindIcon: require('@/assets/images/icons/backward.png'),
            forwardIcon: require('@/assets/images/icons/forward.png'),
            playIcon: require('@/assets/images/icons/play.png'),
            pauseIcon: require('@/assets/images/icons/pause.png'),

            // nextIcon: require(''), maybe
            // previousIcon: require(''), maybe
            // stopIcon: require(''), maybe

            stopWithApp: false,
            forwardJumpInterval: 5,
            backwardJumpInterval: 5,

            color: 50,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.Stop,
                Capability.SeekTo,
                Capability.JumpForward,
                Capability.JumpBackward,

                // Capability.Skip,
                // Capability.SkipToNext,
                // Capability.SkipToPrevious,
            ],
            notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SeekTo,
                Capability.JumpBackward,
                Capability.JumpForward,
                Capability.SetRating,

                // Capability.Skip,
                // Capability.SkipToPrevious,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SeekTo,
                Capability.JumpBackward,
                Capability.JumpForward,
                Capability.SetRating,

                // Capability.Skip,
                // Capability.SkipToPrevious,
            ],
            alwaysPauseOnInterruption: true,
            ratingType: RatingType.Heart,
        })

        /**
         * registering all the services (we want to provide to the user) in notification
         *
         * this services will be evaluated through the notificaions (phone/lock) of device only...
         */
        TrackPlayer.registerPlaybackService(() => playerServices)

        /**
         * setting up the player's config
         * with some metadata about the track which is to be played in the future of this instance
         */
        TrackPlayer.setupPlayer({
            // minBuffer: 15, // Minimum time in seconds that needs to be buffered
            maxBuffer: 45, // Maximum time in seconds that needs to be buffered
            playBuffer: 3, // Minimum time in seconds that needs to be buffered to start playing
            // backBuffer: 0, // Time in seconds that should be kept in the buffer behind the current playhead time.
            maxCacheSize: 1024 * 1024, // Maximum cache size in kilobytes, currenly it is 1GB
            // waitForBuffer: false, // Indicates whether the player should automatically delay playback in order to minimize stalling. If you notice that network media immediately pauses after it buffers, setting this to true may help.
            // autoUpdateMetadata: false, // Indicates whether the player should automatically update now playing metadata data in control center / notification.
        })
            .then(async () => {
                setIsPlayerReady(true)
            })
            .catch(_err => {
                console.log("Failed to Init Sobyte's Track Player Services!")
            })
    }
    useEffect(() => {
        initializeAppTrackPlayer()
    }, [])

    /**
     * this is the function which will be used to initialize the service
     * for music api, like the search, getSearchSuggestions, getPlayer, getAlbums searching and all...
     */
    const initializeAppMusicService = useCallback(() => {
        /**
         * it is not updating the state, don't why, so we need to call it at least twice
         * so that the previous state data could be fetched
         */
        initMusicApi()
            .then(_result => {
                // the 2nd time

                /**
                 * we are searching for song because this will indirectly trigger the _createApiRequest function to call initialize once more...
                 * then we can continue to make any other requests
                 *
                 * this makes sure that the api is up and running
                 * with a status of 200 always...
                 */
                search('any random query here', 'SONG')
            })
            .catch(_error => {
                // if any error occurs at least try once again to init the service
                initMusicApi().then(_result => {
                    // if passes this time then call it again, and we are done!

                    /**
                     * we are searching for song because this will indirectly trigger the _createApiRequest function to call initialize once more...
                     * then we can continue to make any other requests
                     *
                     * this makes sure that the api is up and running
                     * with a status of 200 always...
                     */
                    search('any random query here', 'SONG')
                })
            })
    }, [musicConfigError])
    useEffect(() => {
        initializeAppMusicService()
    }, [])

    return (
        <SobyteTrackPlayerContext.Provider value={isPlayerReady}>
            {props.children}
        </SobyteTrackPlayerContext.Provider>
    )
}
