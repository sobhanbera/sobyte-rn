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

import {useMusic, useTheme, useTrackPlayer} from '@/hooks'
import {
    updateTracksData,
    SobyteState,
    updatePlayerData,
    updateCurrentTrackIndex,
} from '@/state'
import {
    DEFAULT_QUERY,
    MAX_DISPLAY_HEIGHT_OF_TRACK_ARTWORK_WRAPPER,
    MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
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
} from '@/components'

export default function SobytePlayerInterface() {
    const {gutters, layouts} = useTheme()
    const {search} = useMusic()
    const {playTrack, getTrackURL} = useTrackPlayer()

    const {tracks, currentTrackIndex} = useSelector(
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
    const getInitialTracksData = () => {
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
    }
    // getting initial list of songs
    useEffect(() => {
        getInitialTracksData()
    }, [])

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
        }
    }, [currentTrackIndex])

    /**
     * get more tracks list data when the currently active track
     * is among the end of the tracks list
     *
     * or when the queue is about to end
     */
    // useEffect(() => {
    //     if (
    //         currentTrackIndex ===
    //         tracks.length - NUMBER_OF_VISIBLE_PLAYER_TRACKS - 1
    //     ) {
    //         // update new data to tracks
    //     }
    // }, [currentTrackIndex])

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
    const updatedCurrentlyActiveTrackIndex = React.useCallback(
        async activeIndex => {
            if (activeIndex <= -1) return

            scrollXIndex.setValue(activeIndex)
            setLocalCurrentTrackIndex(activeIndex)

            dispatch(
                updateCurrentTrackIndex({
                    index: activeIndex,
                }),
            )
        },
        [],
    )

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
            <FlingGestureHandler
                key="left"
                direction={Directions.LEFT}
                onHandlerStateChange={event => {
                    // when the swipe is completed
                    if (event.nativeEvent.state === State.END) {
                        // checking if after a left swipe there is a next track available
                        if (localCurrentTrackIndex === tracks.length - 1) return

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
                    <View
                        style={[
                            layouts.fill,
                            gutters.statusBarHeightPaddingTop,
                        ]}>
                        {/**
                         * list of all the images of all tracks in form of full screen background image
                         * this should be rendered at the top so that it doesn't
                         * overlap any of the other components in the screen
                         */}
                        <BluredImageBackgroundRenderer
                            scrollXAnimated={scrollXAnimated}
                        />

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
        </View>
    )
}
