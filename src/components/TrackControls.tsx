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
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu'

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
    DEFAULT_TRACK_PLAYER_RATE,
    DEFAULT_BORDER_RADIUS,
} from '@/configs'
import {useSelector} from 'react-redux'
import {SobyteState} from '@/state'
import {secondsToHms} from '@/utils'

import {SobyteTextView} from './SobyteTextView'
import {SobyteIcon} from './SobyteIcon'

const {SlideInMenu} = renderers

export interface RateObject {
    rate: number
    id: number
    extraText: string
}
export const TrackPlayerRateOptions: Array<RateObject> = [
    {
        rate: 0.5,
        id: DEFAULT_TRACK_PLAYER_RATE - 2,
        extraText: 'Very Slow',
    },
    {
        rate: 0.75,
        id: DEFAULT_TRACK_PLAYER_RATE - 1,
        extraText: 'Slow',
    },
    {
        rate: 1,
        id: DEFAULT_TRACK_PLAYER_RATE,
        extraText: 'Normal',
    },
    {
        rate: 1.25,
        id: DEFAULT_TRACK_PLAYER_RATE + 1,
        extraText: 'Bit Faster',
    },
    {
        rate: 1.5,
        id: DEFAULT_TRACK_PLAYER_RATE + 2,
        extraText: 'Very Faster',
    },
    {
        rate: 2,
        id: DEFAULT_TRACK_PLAYER_RATE + 3,
        extraText: 'Terribly Fast',
    },
]

export interface TrackControlsProps {
    onPlayNextTrack(): void
    onPlayPreviousTrack(): void
    closeAllMenu(): void
}
export const TrackControls = ({
    onPlayNextTrack,
    onPlayPreviousTrack,
    closeAllMenu,
}: TrackControlsProps) => {
    /**
     * theme data for the app
     */
    const {theme, layouts, gutters, fonts} = useTheme()
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
    const currentTrack = useSelector(
        (state: SobyteState) => state.playerdata.currentTrack,
    )
    const {position} = useProgress() // getting realtime position and duration of the current track

    /**
     * state to get the data of playing status of the track like, play/pause/buffering etc...
     */
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    /**
     * this state variable shows if the track is in repeat mode
     */
    const [isPlayerRepeating, setIsPlayerRepeating] = useState<boolean>(false)

    /**
     * current speed of tracks
     */
    const [trackPlayerRate, setTrackPlayerRate] = useState<number>(
        DEFAULT_TRACK_PLAYER_RATE,
    )

    /**
     * time in string format to show in the UI
     * first is the current position
     * next is the total duration of the track
     */
    const formattedPosition = secondsToHms(position)
    const formattedDuration = secondsToHms(currentTrack.duration)

    // triggered when any state changes related to song from notification/lock-screen/other parts of the android
    useEffect(() => {
        const stateChangeEvent = TrackPlayer.addEventListener(
            Event.PlaybackState,
            (stateData: {state: number}) => {
                // we are only containing paused state because for all other state we want to show the use a play state
                // or else it will signify that the track is being pause all the time when buffering
                // if (stateData.state === State.Paused) {
                //     setIsPlaying(false)
                // } else {
                //     setIsPlaying(true)
                // }

                /**
                 * or we can do an alternative in this way
                 * we are enabling play when buffering or else actually playing,
                 * else we are saying its been paused...
                 */
                if (
                    stateData.state === State.Buffering ||
                    stateData.state === State.Playing
                ) {
                    setIsPlaying(true)
                } else {
                    setIsPlaying(false)
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
        TrackPlayer.getState()
            .then(state => {
                if (state === State.Paused) {
                    onPlayTrack()
                } else if (state === State.Playing) {
                    onPauseTrack()
                }
            })
            .catch(_ERR => {})
    }

    /**
     * function to update the track's repeat mode
     */
    const onToggleRepeatStatus = () => {
        TrackPlayer.getRepeatMode()
            .then(isRepeatEnabled => {
                if (isRepeatEnabled === RepeatMode.Off) {
                    TrackPlayer.setRepeatMode(RepeatMode.Track)
                    setIsPlayerRepeating(true)
                } else {
                    TrackPlayer.setRepeatMode(RepeatMode.Off)
                    setIsPlayerRepeating(false)
                }
            })
            .catch(_ERR => {})
    }

    /**
     * a simple function which changes the playing speed of the track player
     * we can change this rate to anything but the current limits are let's say from 0.5 to 2 only
     * just that the good experience of the user, haha :)
     *
     * @param rate a number between 0.5 & 2 inclusive
     */
    const updateTrackPlayerRate = (rateObject: RateObject) => {
        TrackPlayer.setRate(rateObject.rate)
            .then(res => {
                console.log('changed', res)
                setTrackPlayerRate(rateObject.id)
            })
            .catch(_ERR => {})
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
                maximumValue={currentTrack.duration}
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
                {/* current position of the track */}
                <SobyteTextView
                    style={{
                        color: `${theme.themecolorrevert}${NEXT_TITLE_COLOR_ALPHA}`,
                    }}>
                    {formattedPosition}
                </SobyteTextView>

                {/* total duration of the track */}
                <SobyteTextView
                    style={{
                        color: `${theme.themecolorrevert}${NEXT_TITLE_COLOR_ALPHA}`,
                    }}>
                    {formattedDuration}
                </SobyteTextView>
            </View>

            {/* buttons for rate, previous, play/pause, next and repeat mode */}
            <View
                style={[
                    layouts.rowCenter,
                    layouts.scrollSpaceBetween,
                    {
                        width: TRACK_ARTWORK_WIDTH,
                    },
                ]}>
                <Menu renderer={SlideInMenu}>
                    <MenuTrigger>
                        <SobyteIcon
                            IconType="Ionicons"
                            name="ios-speedometer-outline"
                            size={TINY_ICON_SIZE}
                            color={theme.themecolorrevert + 'DF'}
                        />
                    </MenuTrigger>

                    <MenuOptions
                        optionsContainerStyle={{
                            backgroundColor: theme.surface,
                            borderTopEndRadius: DEFAULT_BORDER_RADIUS,
                            borderTopStartRadius: DEFAULT_BORDER_RADIUS,
                        }}>
                        {/* text about what to change */}
                        <SobyteTextView
                            style={[
                                gutters.regularPaddingVertical,
                                fonts.textCenter,
                                fonts.boldFont,
                                fonts.textRegular,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.surfaceborder,
                                },
                            ]}>
                            Change Track Speed
                        </SobyteTextView>

                        {TrackPlayerRateOptions.map(rateOption => {
                            return (
                                <MenuOption
                                    key={rateOption.rate}
                                    onSelect={() =>
                                        updateTrackPlayerRate(rateOption)
                                    }
                                    style={[
                                        layouts.row,
                                        layouts.scrollSpaceBetween,
                                        {
                                            backgroundColor:
                                                trackPlayerRate ===
                                                rateOption.id
                                                    ? theme.surfacelight
                                                    : theme.surface,
                                        },
                                    ]}>
                                    {/* the actual speed */}
                                    <SobyteTextView
                                        style={[
                                            gutters.smallPaddingVertical,
                                            gutters.smallPaddingHorizontal,
                                        ]}>
                                        {rateOption.rate + 'x'}
                                    </SobyteTextView>

                                    {/* a small detail about the speed */}
                                    <SobyteTextView
                                        style={[
                                            gutters.smallPaddingVertical,
                                            gutters.smallPaddingHorizontal,
                                        ]}>
                                        {rateOption.extraText}
                                    </SobyteTextView>
                                </MenuOption>
                            )
                        })}

                        <TouchableOpacity
                            onPress={closeAllMenu}
                            activeOpacity={
                                DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                            }>
                            <SobyteTextView
                                style={[
                                    layouts.fullWidth,
                                    gutters.regularPaddingVertical,
                                    fonts.textMedium,
                                    {
                                        backgroundColor: theme.surfacelight,
                                        color: theme.text,
                                        textAlign: 'center',
                                    },
                                ]}>
                                Cancel
                            </SobyteTextView>
                        </TouchableOpacity>
                    </MenuOptions>
                </Menu>

                {/* <TouchableOpacity
                    onPress={onPlayPreviousTrack}
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }>
                    <SobyteIcon
                    IconType='Ionicons'
                        name="ios-heart"
                        size={TINY_ICON_SIZE}
                        color={theme.themecolorrevert}
                    />
                </TouchableOpacity> */}

                <TouchableOpacity
                    onPress={onPlayPreviousTrack}
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }>
                    <SobyteIcon
                        IconType="Ionicons"
                        name="ios-play-skip-back-sharp"
                        size={SMALL_ICON_SIZE}
                        color={theme.themecolorrevert}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onTogglePlayStatus}>
                    {isPlaying ? (
                        <SobyteIcon
                            IconType="Ionicons"
                            name="ios-pause-circle"
                            size={PLAY_PAUSE_ICON_SIZE}
                            style={{}}
                            color={theme.themecolorrevert}
                        />
                    ) : (
                        <SobyteIcon
                            IconType="Ionicons"
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
                    <SobyteIcon
                        IconType="Ionicons"
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
                    <SobyteIcon
                        IconType="Feather"
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
