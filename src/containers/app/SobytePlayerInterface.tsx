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
import {
    Animated,
    FlatList,
    ListRenderItemInfo,
    StatusBar,
    View,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import {useMusic, useTheme} from '@/hooks'
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

    const {tracks} = useSelector((state: SobyteState) => state.playerdata)
    const dispatch = useDispatch()

    const scrollXIndex = useRef(new Animated.Value(0)).current
    const scrollXAnimated = useRef(new Animated.Value(0)).current

    const [index, setIndex] = useState(0)

    useEffect(() => {
        // getting the initial tracks data when the application is being loaded...
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
                dispatch(
                    updatePlayerData({
                        currentTrackIndex: 0,
                    }),
                )
            })
            .catch((_error: any) => {
                console.log('Error getting player songs...')
            })

        StatusBar.setTranslucent(true)
    }, [])

    // useEffect(() => {
    //     if (
    //         currentTrackIndex ===
    //         tracks.length - NUMBER_OF_VISIBLE_PLAYER_TRACKS - 1
    //     ) {
    //         // update new data to tracks
    //     }
    // }, [currentTrackIndex])

    useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start()
    }, [scrollXIndex])

    const setActiveIndex = React.useCallback(async activeIndex => {
        if (activeIndex <= -1) return

        scrollXIndex.setValue(activeIndex)
        setIndex(activeIndex)

        dispatch(
            updateCurrentTrackIndex({
                index: activeIndex,
            }),
        )
    }, [])

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
                onHandlerStateChange={ev => {
                    if (ev.nativeEvent.state === State.END) {
                        if (index === tracks.length - 1) return

                        setActiveIndex(index + 1)
                    }
                }}>
                <FlingGestureHandler
                    key="right"
                    direction={Directions.RIGHT}
                    onHandlerStateChange={ev => {
                        if (ev.nativeEvent.state === State.END) {
                            if (index === 0) return

                            setActiveIndex(index - 1)
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
