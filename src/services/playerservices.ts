/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Tyepscript
 *
 * Purpose - notification events for track player
 */

import TrackPlayer, {Event} from 'react-native-track-player'

/**
 * here are all the events which are needed to make the notification work properly
 *
 * here are some of the capable events which we are providing to the user
 * which can be accessed through the notification of the device
 */
export default async function () {
    /**
     * when a song is paused, play button will be displayed in the notification
     * for which pressing on it redirects to this callback function
     */
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })

    /**
     * if the song is being paused from notifications
     */
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })

    /**
     * if the song is being stopped from the notification panel
     */
    TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop())

    /**
     * we are seeking the song/track to the position where the user has seeked
     * using the notification of the player
     */
    TrackPlayer.addEventListener(
        Event.RemoteSeek,
        (seekData: {position: number}) => {
            TrackPlayer.seekTo(seekData.position)
        },
    )

    /**
     * this function will be executed when the user wants to skip some seconds forward
     * using the notification button again
     */
    TrackPlayer.addEventListener(
        Event.RemoteJumpForward,
        async (jumpData: {interval: number}) => {
            const currPos = await TrackPlayer.getPosition()
            TrackPlayer.seekTo(currPos + jumpData.interval)
        },
    )

    /**
     * this function will be executed when the user wants to skip some seconds backward
     * using the notification button again
     */
    TrackPlayer.addEventListener(
        Event.RemoteJumpBackward,
        async (jumpData: {interval: number}) => {
            const currPos = await TrackPlayer.getPosition()
            TrackPlayer.seekTo(currPos - jumpData.interval)
        },
    )
}
