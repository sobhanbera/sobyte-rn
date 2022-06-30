/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - all controls like, play/pause button, slider, next, previous button and more...
 */

import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View} from 'react-native'
import TrackPlayer, {
    useProgress,
    State,
    Event,
    RepeatMode,
} from 'react-native-track-player'
import {Slider} from '@rneui/themed'
import IoniconIcon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

import {useTheme} from '@/hooks'
import {
    NEXT_TITLE_COLOR_ALPHA,
    DEFAULT_SLIDER_THUMB_SIZE,
    DEFAULT_SLIDER_TRACK_HEIGHT,
    TRACK_ARTWORK_SPACING,
    TRACK_ARTWORK_WIDTH,
    TINY_ICON_SIZE,
    SMALL_ICON_SIZE,
    PLAY_PAUSE_ICON_SIZE,
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
} from '@/configs'
import {useSelector} from 'react-redux'
import {SobyteState} from '@/state'
import {secondsToHms} from '@/utils'
import {SobyteTextView} from './SobyteTextView'

export interface TrackControlsProps {
    onPlayNextTrack(): void
    onPlayPreviousTrack(): void
}
export const TrackControls = ({
    onPlayNextTrack,
    onPlayPreviousTrack,
}: TrackControlsProps) => {
    /**
     * theme data for the app
     */
    const {theme, layouts, gutters} = useTheme()
    /**
     * getting the number of tracks currently loaded
     * because this will be used to disable and enable the slider
     *
     * if there are no tracks then slider will be disabled and then no error like
     * null value will popup
     */
    const numberOfTracks = useSelector(
        (state: SobyteState) => state.playerdata.tracks.length,
    )
    const {position, duration} = useProgress() // getting realtime position and duration of the current track

    /**
     * state to get the data of playing status of the track like, play/pause/buffering etc...
     */
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    /**
     * this state variable shows if the track is in repeat mode
     */
    const [isPlayerRepeating, setIsPlayerRepeating] = useState<boolean>(false)

    /**
     * time in string format to show in the UI
     * first is the current position
     * next is the total duration of the track
     */
    const formattedPosition = secondsToHms(position)
    const formattedDuration = secondsToHms(duration)

    // triggered when any state changes related to song from notification/lock-screen/other parts of the android
    useEffect(() => {
        const stateChangeEvent = TrackPlayer.addEventListener(
            Event.PlaybackState,
            (state: {state: number}) => {
                // we are only containing paused state because for all other state we want to show the use a play state
                // or else it will signify that the track is being pause all the time when buffering
                if (state.state === State.Paused) {
                    setIsPlaying(false)
                } else {
                    setIsPlaying(true)
                }
            },
        )

        /**
         * a event listener for when a track is ended
         * whenever a track ends we need to call onPlayNextTrack method to play the next song
         * but wait here is a catch, we cannot change the track if repeat mode is enabled
         * so keep that edge case in mind
         */
        const trackEnded = TrackPlayer.addEventListener(
            Event.PlaybackQueueEnded,
            (_trackEndingData: {position: number; track: number}) => {
                onPlayNextTrack()
                console.log(_trackEndingData)
                console.log(onPlayNextTrack)
            },
        )

        return () => {
            stateChangeEvent.remove()
            trackEnded.remove()
        }
    }, [])

    /**
     * just a simple method to play the track
     *
     * the state of the playing status is updating on the above event listener
     * please take a look for that
     */
    const onPlayTrack = () => {
        TrackPlayer.play()
    }

    /**
     * just a simple method to pause the track
     *
     * again here the state of the playing status is updating on the above event listener
     * please take a look for that
     */
    const onPauseTrack = () => {
        TrackPlayer.pause()
    }

    /**
     * function which is play the track if pause and vice versa
     */
    const onTogglePlayStatus = () => {
        TrackPlayer.getState().then(state => {
            if (state === State.Paused) {
                onPlayTrack()
            } else if (state === State.Playing) {
                onPauseTrack()
            }
        })
    }

    /**
     * function to update the track's repeat mode
     */
    const onToggleRepeatStatus = () => {
        TrackPlayer.getRepeatMode().then(isRepeatEnabled => {
            if (isRepeatEnabled === RepeatMode.Off) {
                TrackPlayer.setRepeatMode(RepeatMode.Track)
                setIsPlayerRepeating(true)
            } else {
                TrackPlayer.setRepeatMode(RepeatMode.Off)
                setIsPlayerRepeating(false)
            }
        })
    }

    return (
        <View style={[layouts.center]}>
            {/* track player seekbar */}
            <Slider
                style={{
                    width: TRACK_ARTWORK_WIDTH,
                    borderRadius: 10,

                    marginTop: TRACK_ARTWORK_SPACING,
                }}
                disabled={numberOfTracks <= 0}
                step={1}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                allowTouchTrack
                // debugTouchArea // to see the touch area of the slider
                minimumTrackTintColor={theme.themecolorrevert}
                maximumTrackTintColor={`${theme.themecolorrevert}1F`}
                thumbTintColor={theme.themecolorrevert}
                thumbTouchSize={{
                    height: DEFAULT_SLIDER_THUMB_SIZE,
                    width: DEFAULT_SLIDER_THUMB_SIZE,
                }}
                thumbStyle={{
                    width: DEFAULT_SLIDER_THUMB_SIZE,
                    height: DEFAULT_SLIDER_THUMB_SIZE,
                }}
                trackStyle={{
                    height: DEFAULT_SLIDER_TRACK_HEIGHT,
                }}
                onSlidingComplete={(seekPostition: number) => {
                    TrackPlayer.seekTo(seekPostition)
                }}
            />

            {/* position and total duration text views */}
            <View
                style={[
                    {
                        width: TRACK_ARTWORK_WIDTH,
                        marginTop: -15, // since the above slider takes some touch area padding
                    },
                    layouts.row,
                    layouts.scrollSpaceBetween,
                ]}>
                <SobyteTextView
                    style={{
                        color: `${theme.themecolorrevert}${NEXT_TITLE_COLOR_ALPHA}`,
                    }}>
                    {formattedPosition}
                </SobyteTextView>
                <SobyteTextView
                    style={{
                        color: `${theme.themecolorrevert}${NEXT_TITLE_COLOR_ALPHA}`,
                    }}>
                    {formattedDuration}
                </SobyteTextView>
            </View>

            <View
                style={[
                    layouts.rowCenter,
                    layouts.scrollSpaceBetween,
                    gutters.regularPaddingVertical,
                    {
                        width: TRACK_ARTWORK_WIDTH,
                    },
                ]}>
                <TouchableOpacity
                    onPress={onPlayPreviousTrack}
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }>
                    <IoniconIcon
                        name="ios-heart"
                        size={TINY_ICON_SIZE}
                        color={theme.themecolorrevert}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPlayPreviousTrack}
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }>
                    <IoniconIcon
                        name="ios-play-skip-back-sharp"
                        size={SMALL_ICON_SIZE}
                        color={theme.themecolorrevert}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onTogglePlayStatus}>
                    {isPlaying ? (
                        <IoniconIcon
                            name="ios-pause-circle"
                            size={PLAY_PAUSE_ICON_SIZE}
                            style={{}}
                            color={theme.themecolorrevert}
                        />
                    ) : (
                        <IoniconIcon
                            name="ios-play-circle"
                            size={PLAY_PAUSE_ICON_SIZE}
                            color={theme.themecolorrevert}
                        />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onPlayNextTrack}
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }>
                    <IoniconIcon
                        name="ios-play-skip-forward-sharp"
                        size={SMALL_ICON_SIZE}
                        color={theme.themecolorrevert}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onToggleRepeatStatus}
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }>
                    <FeatherIcon
                        name="repeat"
                        size={TINY_ICON_SIZE}
                        color={
                            isPlayerRepeating
                                ? theme.themecolorrevert
                                : `${theme.themecolorrevert}5F`
                        }
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
