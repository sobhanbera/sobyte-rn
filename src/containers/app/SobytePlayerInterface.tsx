/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - music player....
 */

import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Animated, FlatList, ListRenderItemInfo, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import {useMusic, useTheme, useTrackPlayer} from '@/hooks'
import {
    updateTracksData,
    SobyteState,
    updatePlayerData,
    updateCurrentTrackIndex,
    addMoreTracksToQueue,
} from '@/state'
import {
    DEFAULT_QUERY,
    LAST_TRACKS_REMAIN_TO_LOAD_MORE_TRACK,
    MAX_DISPLAY_HEIGHT_OF_TRACK_ARTWORK_WRAPPER,
    MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
    SOBYTE_PLAYER_QUEUE_SCREEN,
} from '@/configs'
import {FetchedSongObject, SongObject} from '@/schemas'
import {
    Directions,
    FlingGestureHandler,
    State,
} from 'react-native-gesture-handler'
import {
    PlayerTrackImage,
    BluredImageBackgroundRenderer,
    TrackPlayerDescriptionRenderer,
    TrackControls,
    TrackPlayerHeader,
} from '@/components'
import {getSmoothLinearGradient} from '@/utils'
import {TrackPlayerFooter} from '@/components/TrackPlayerFooter'

interface SobytePlayerInterfaceProps {
    navigation: {
        navigate(screenName: string, routeProps: any): void
    }
}
export default function SobytePlayerInterface(
    props: SobytePlayerInterfaceProps,
) {
    const {layouts, variables} = useTheme()
    const {search, getContinuation} = useMusic()
    const {playTrack, getTrackURL} = useTrackPlayer()

    const {tracks, currentTrackIndex, continuationData} = useSelector(
        (state: SobyteState) => state.playerdata,
    )
    const dispatch = useDispatch()

    const scrollXIndex = useRef(new Animated.Value(0)).current
    const scrollXAnimated = useRef(new Animated.Value(0)).current

    /**
     * an extra local current index is also needed for a realtime animation
     * I don't know why, but when the index is taken from reducer's state, this component is no longer animating
     * wierd right! that's why this state
     */
    const [localCurrentTrackIndex, setLocalCurrentTrackIndex] = useState(0)

    // getting the initial tracks data when the application is being loaded...
    const getInitialTracksData = useCallback(() => {
        search(
            DEFAULT_QUERY,
            'SONG',
            true,
            MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
        )
            .then((result: FetchedSongObject) => {
                // now save or update this request data to the player data state
                dispatch(
                    updateTracksData({
                        tracks: result.content,
                        continuationData: result.continuation,
                    }),
                )
                /**
                 * also updating the currently playing track's index to 0
                 * and currently playing track's id
                 */
                dispatch(
                    updatePlayerData({
                        currentTrackIndex: 0,
                    }),
                )

                /**
                 * now also play the song at index 0 at load
                 * the next song at index 1
                 */
                const firstTrack = result.content[0]
                playTrack(firstTrack, '', false).then(played => {
                    if (played)
                        if (result.content.length >= 1)
                            // if there are more than or equal to 1 songs than load the 1st indexed song too
                            // if there is a next song to the current one...
                            getTrackURL(result.content[1].musicId)
                })
            })
            .catch((_error: any) => {
                console.log('Error getting player songs...')
            })
    }, [dispatch])
    // getting initial list of songs
    useEffect(() => {
        getInitialTracksData()
    }, [dispatch])

    /**
     * whenever the currentIndex changes just initialize the play method for that
     * particular track
     *
     * now we are also making this sure that if there is a next song
     * then generate the URL for that too, so that it doesn't take much
     * time on loading when actually scrolled to the next track
     *
     * ok plan changed after much thinking, now we are loading not one but two next tracks URLs
     */
    useEffect(() => {
        if (tracks.length >= 1) {
            const track = tracks[currentTrackIndex]
            playTrack(track).then(played => {
                if (played) {
                    if (currentTrackIndex < tracks.length - 1) {
                        // if there is a next song to the current one...
                        getTrackURL(tracks[currentTrackIndex + 1].musicId).then(
                            _notRequiredURL => {
                                // if there is again a 2nd next song...
                                if (currentTrackIndex < tracks.length - 2) {
                                    getTrackURL(
                                        tracks[currentTrackIndex + 2].musicId,
                                    )
                                }
                            },
                        )
                    }
                }
            })

            /**
             * also check if the queue is about to end, if it is then
             *
             * get more tracks list data when the currently active track
             * is among the end of the tracks list
             *
             * or when the queue is about to end
             *
             * here if the current track is the last 5th or so
             * then we will load more tracks data to the queue
             *
             * TODO: limit data, like every time we are loading about 20 songs, which are very huge
             * so to resolve this limit the data on getContinuation() method...
             */
            if (
                localCurrentTrackIndex >=
                tracks.length - LAST_TRACKS_REMAIN_TO_LOAD_MORE_TRACK
            ) {
                // final check if the continuation data is available
                if (
                    continuationData.clickTrackingParams &&
                    continuationData.continuation
                ) {
                    getContinuation(
                        'search',
                        {
                            clickTrackingParams:
                                continuationData.clickTrackingParams,
                            continuation: continuationData.continuation,
                        },
                        'SONG',
                    ).then((result: FetchedSongObject) => {
                        // console.log(result)

                        dispatch(
                            addMoreTracksToQueue({
                                tracks: result.content,
                                continuationData: result.continuation,
                            }),
                        )
                    })
                }
            }
        }
    }, [currentTrackIndex])

    /**
     * this use effect is responsible for the smooth
     * transition of the animation during left/right swipe of this UI
     */
    useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start()
    }, [scrollXIndex])

    /**
     * when a fling gesture is success this method is executed
     * the main task of this function is to update the current index or current tracks data
     */
    const updatedCurrentlyActiveTrackIndex = useCallback(async activeIndex => {
        if (activeIndex <= -1) return

        scrollXIndex.setValue(activeIndex)
        setLocalCurrentTrackIndex(activeIndex)

        dispatch(
            updateCurrentTrackIndex({
                index: activeIndex,
            }),
        )
    }, [])

    /**
     * this method handles what to do when the user pressed
     * on play previous button in the UI
     */
    const onPlayPreviousTrack = useCallback(() => {
        /**
         * cheking if the track is the first one
         * return and do nothing
         */
        if (localCurrentTrackIndex === tracks.length - 1) {
            return
        } else {
            // else decrement the currentIndex value by 1
            setLocalCurrentTrackIndex(value => {
                /**
                 * here this is not needed
                 * but let's say if any edge case got stuck in
                 * just be safe from that, I have used this here too
                 */
                updatedCurrentlyActiveTrackIndex(value - 1)

                return value
            })
        }
    }, [])

    /**
     * this method handles what to do when the user pressed
     * on play next button in the UI
     */
    const onPlayNextTrack = useCallback(() => {
        /**
         * cheking if the track is the last one
         * in this case we can load more data
         * or maybe not do the next operation and return
         */
        if (localCurrentTrackIndex === tracks.length - 1) {
            return
        } else {
            // else increment the currentIndex value by 1
            setLocalCurrentTrackIndex(value => {
                /**
                 * we are using this syntax to get the latest current value of this state var
                 * we will not change/update the value here itself, but we are just using it to call
                 * a method which can update this value more efficiently
                 * without this, let's say the current value is not being changed yet and the track ended,
                 * in this case the player will not go to the next track
                 */
                updatedCurrentlyActiveTrackIndex(value + 1)

                return value + 1 // plan changed after 2 hours, we are now updating the state here only, but only for next track event
            })
        }
    }, [])

    /**
     * this method will change/update the track based on the musicID
     * first we will itterate over all the tracks then find the track with exact music id and skip to it
     * and play it
     * @param musicID string denoting music ID
     */
    const onChangedTrackFromQueue = (musicID: string) => {
        tracks.find((track, index) => {
            if (track.musicId === musicID) {
                updatedCurrentlyActiveTrackIndex(index)
                return true
            }
            return false
        })
    }

    /**
     * TODO:
     * this function will launch search songs/tracks, artists tab
     */
    const launchSearchTab = () => {}

    /**
     * open the queue list screen
     */
    const launchQueueScreen = () => {
        props.navigation.navigate(SOBYTE_PLAYER_QUEUE_SCREEN, {
            onChangedTrackFromQueue,
        })
    }

    /**
     * responsible for rendering the list of all the tracks
     * this method eventually renders PlayerTrackImage which is its main task...
     */
    const renderPlayerTrackImage = useCallback(
        (itemDetails: ListRenderItemInfo<SongObject>) => {
            const {item, index} = itemDetails

            return (
                <PlayerTrackImage
                    trackData={item}
                    index={index}
                    scrollXAnimated={scrollXAnimated}
                />
            )
        },
        [],
    )
    // key extractor for each item of the UI...
    const keyExtractor = useCallback(
        (item: SongObject, index: number) => `${item.musicId}-${index}`,
        [],
    )

    return (
        <View style={layouts.fill}>
            {/**
             * list of all the images of all tracks in form of full screen background image
             * this should be rendered at the top so that it doesn't
             * overlap any of the other components in the screen
             */}
            <BluredImageBackgroundRenderer scrollXAnimated={scrollXAnimated} />

            <LinearGradient
                style={layouts.fill}
                colors={getSmoothLinearGradient(variables.colors.black, true)}>
                {/* the top header, this is the first component which will be rendered */}
                <TrackPlayerHeader onPressSearch={launchSearchTab} />

                <FlingGestureHandler
                    key="left"
                    direction={Directions.LEFT}
                    onHandlerStateChange={event => {
                        // when the swipe is completed
                        if (event.nativeEvent.state === State.END) {
                            // checking if after a left swipe there is a next track available
                            if (localCurrentTrackIndex === tracks.length - 1)
                                return

                            updatedCurrentlyActiveTrackIndex(
                                localCurrentTrackIndex + 1,
                            )
                        }
                    }}>
                    <FlingGestureHandler
                        key="right"
                        direction={Directions.RIGHT}
                        onHandlerStateChange={event => {
                            // when the swipe ended
                            if (event.nativeEvent.state === State.END) {
                                // checking if after a right swipe there is a next previous available
                                if (localCurrentTrackIndex === 0) return

                                updatedCurrentlyActiveTrackIndex(
                                    localCurrentTrackIndex - 1,
                                )
                            }
                        }}>
                        <View>
                            {/* the actual track's image list */}
                            <FlatList
                                data={tracks}
                                horizontal
                                renderItem={renderPlayerTrackImage}
                                keyExtractor={keyExtractor}
                                style={{
                                    minHeight:
                                        MAX_DISPLAY_HEIGHT_OF_TRACK_ARTWORK_WRAPPER,
                                    maxHeight:
                                        MAX_DISPLAY_HEIGHT_OF_TRACK_ARTWORK_WRAPPER,
                                }}
                                contentContainerStyle={{
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                                scrollEnabled={false}
                                removeClippedSubviews={false}
                            />

                            {/* track's title, artists, like button and more... */}
                            <TrackPlayerDescriptionRenderer
                                scrollXAnimated={scrollXAnimated}
                            />
                        </View>
                    </FlingGestureHandler>
                </FlingGestureHandler>

                {/* normal track player related controls like - play/pause, next, previous, repeat mode and others... */}
                <TrackControls
                    onPlayNextTrack={() => onPlayNextTrack()}
                    onPlayPreviousTrack={() => onPlayPreviousTrack()}
                />

                <TrackPlayerFooter onQueueButtonPressed={launchQueueScreen} />

                {/* here will be controls which needs API requests and tracks data like - queue, playlist and more.. */}
            </LinearGradient>
        </View>
    )
}
