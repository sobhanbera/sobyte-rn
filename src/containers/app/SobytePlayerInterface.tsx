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
import {NavigationHelpers} from '@react-navigation/native'
import {withMenuContext} from 'react-native-popup-menu'
import {useDispatch, useSelector} from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import {useMusic, useTheme, useTrackPlayer} from '@/hooks'
import {
    updateTracksData,
    SobyteState,
    updatePlayerData,
    updateCurrentTrackIndex,
    addMoreTracksToQueueWhileKeepingTheLastTrack,
} from '@/state'
import {
    LAST_TRACKS_REMAIN_TO_LOAD_MORE_TRACK,
    MAX_DISPLAY_HEIGHT_OF_TRACK_ARTWORK_WRAPPER,
    MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY,
    ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK,
    SOBYTE_PLAYER_QUEUE_SCREEN,
    TRACK_ARTIST_MENU_NAME,
    TRACK_ARTWORK_HEIGHT,
    TRACK_ARTWORK_PARENT_VERTICAL_PADDING,
    TRACK_ARTWORK_WIDTH,
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
    TrackDetailsMenu,
} from '@/components'
import {getARandomQuery, getSmoothLinearGradient} from '@/utils'
import {TrackPlayerFooter} from '@/components/TrackPlayerFooter'
import {Skeleton} from '@rneui/themed'

interface SobytePlayerInterfaceProps {
    navigation: NavigationHelpers<any> // the main navigation of this screen
    // extra data we get from menu component
    ctx: {
        menuActions: {
            openMenu: (name: string) => Promise<void>
            closeMenu: () => Promise<void>
            toggleMenu: (name: string) => Promise<void>
            isMenuOpen: () => boolean
        }
    }
}
const SobytePlayerInterface = withMenuContext(
    ({ctx, navigation}: SobytePlayerInterfaceProps) => {
        const {gutters, layouts, variables} = useTheme()
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
         *
         * @param activeIndex the index which is needed to be updated to
         * @param updateInReduxToo a boolean value which says wheather to update the currentTrackIndex in the reducer's state or not...
         *
         * this second @param updateInReduxToo is required in some cases where we are calling this after updating the currentTrackIndex only, so why to update again
         * that's why the default value if true (to update in the state) but when we have already updated the state (in some case maybe) then a false value should be provided
         */
        const updatedCurrentlyActiveTrackIndex = useCallback(
            async (activeIndex: number, updateInReduxToo: boolean = true) => {
                if (activeIndex <= -1) return

                scrollXIndex.setValue(activeIndex)
                setLocalCurrentTrackIndex(activeIndex)

                if (updateInReduxToo)
                    dispatch(
                        updateCurrentTrackIndex({
                            index: activeIndex,
                        }),
                    )
            },
            [],
        )

        // getting the initial tracks data when the application is being loaded...
        const getInitialTracksData = useCallback(() => {
            const query = getARandomQuery()
            console.log(query)
            search(query, 'SONG', true, MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY)
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

                    // now in the process to play the song
                    playTrack(firstTrack, '', false)
                        .then(played => {
                            if (played)
                                if (result.content.length >= 1)
                                    // if there are more than or equal to 1 songs than load the 1st indexed song too
                                    // if there is a next song to the current one...
                                    getTrackURL(result.content[1].musicId)
                                        .then(_RES => {})
                                        .catch(_ERR => {})
                        })
                        .catch(_ERR => {})
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
                /**
                 * also check if the localCurrentTrackIndex variable and the currentTrackIndex variable hold the same value
                 * this is because, we are able to change the currentTrackIndex from any part of the app, irrespective of this component
                 * so to detect that change
                 * we must also change the value of the localCurrentTrackIndex so that the current song is displayed here in correct form...
                 *
                 * and a false value is provided which says do not update the state of currentTrackIndex from this method call
                 * because the currentTrackIndex change is responsible for the change of localCurrentTrackIndex change
                 * so why to change itself.. haha :)
                 */
                if (localCurrentTrackIndex !== currentTrackIndex)
                    updatedCurrentlyActiveTrackIndex(currentTrackIndex, false)

                // next up getting the tracks data which needs to be played after changing the current index
                const track = tracks[currentTrackIndex]

                playTrack(track)
                    .then(played => {
                        if (played) {
                            if (currentTrackIndex < tracks.length - 1) {
                                // if there is a next song to the current one...
                                getTrackURL(
                                    tracks[currentTrackIndex + 1].musicId,
                                )
                                    .then(_notRequiredURL => {
                                        // if there is again a 2nd next song...
                                        if (
                                            currentTrackIndex <
                                            tracks.length - 2
                                        ) {
                                            getTrackURL(
                                                tracks[currentTrackIndex + 2]
                                                    .musicId,
                                            ).catch(_ERR => {})
                                        }
                                    })
                                    .catch(_ERR => {})
                            }
                        }
                    })
                    .catch(_ERR => {})
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
                 */
                if (
                    localCurrentTrackIndex >=
                        tracks.length - LAST_TRACKS_REMAIN_TO_LOAD_MORE_TRACK ||
                    currentTrackIndex >=
                        tracks.length - LAST_TRACKS_REMAIN_TO_LOAD_MORE_TRACK // since when updating the track from queue, everytime the localCurrentTrackIndex is updating a bit slower, so why not use this value from global state :)
                ) {
                    // final check if the continuation data is available
                    if (
                        continuationData.clickTrackingParams &&
                        continuationData.continuation
                    ) {
                        /**
                         * TODO: while adding more data we can call search instead of getContinuation,
                         * we can pass random trending queries while searching and than append those results
                         * to the queue this will make the queue more elegent and managed
                         */
                        getContinuation(
                            'search',
                            {
                                clickTrackingParams:
                                    continuationData.clickTrackingParams,
                                continuation: continuationData.continuation,
                            },
                            'SONG',
                        )
                            .then((result: FetchedSongObject) => {
                                /**
                                 * since we are deleting all the tracks from the queue except the last one
                                 *
                                 * so we have to change the index also from the last index to 0, so that the current song plays continously
                                 * without any intteruptions
                                 */
                                dispatch(
                                    addMoreTracksToQueueWhileKeepingTheLastTrack(
                                        {
                                            tracks: result.content,
                                            continuationData:
                                                result.continuation,
                                        },
                                    ),
                                )
                                updatedCurrentlyActiveTrackIndex(0)
                            })
                            .catch(_ERR => {})
                    }
                }
            }
        }, [currentTrackIndex])

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
         * this method is responsible to open the menu with name of variable MENU_NAME
         * this component is a other children component which is responsible
         * to open when this method is called or executed
         */
        const openTrackAristsMenu = () => {
            ctx.menuActions.openMenu(TRACK_ARTIST_MENU_NAME)
        }
        /**
         * function to close the menu
         * this will be provided to the menu, so that it could disable the menu by a cancel button or so
         */
        const closeAllMenu = () => {
            ctx.menuActions.closeMenu()
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

        /**
         * this function will launch search songs/tracks, artists tab
         */
        function changeNavigationToSearchTab() {
            /**
             * getting the parent navigator which is the bottom tab bar
             * and then navigating to the search stack navigator
             */
            navigation
                .getParent()
                ?.navigate(ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK)
        }

        /**
         * open the queue list screen
         */
        function launchQueueScreen() {
            navigation.navigate(SOBYTE_PLAYER_QUEUE_SCREEN)
        }

        return (
            <View style={layouts.fill}>
                {/**
                 * list of all the images of all tracks in form of full screen background image
                 * this should be rendered at the top so that it doesn't
                 * overlap any of the other components in the screen
                 */}
                <BluredImageBackgroundRenderer
                    scrollXAnimated={scrollXAnimated}
                />

                <LinearGradient
                    style={layouts.fill}
                    colors={getSmoothLinearGradient(
                        variables.colors.black,
                        true,
                    )}>
                    {/* the top header, this is the first component which will be rendered */}
                    <TrackPlayerHeader
                        onPressSearch={changeNavigationToSearchTab}
                    />

                    <FlingGestureHandler
                        key="left"
                        direction={Directions.LEFT}
                        onHandlerStateChange={event => {
                            // when the swipe is completed
                            if (event.nativeEvent.state === State.END) {
                                // checking if after a left swipe there is a next track available
                                if (
                                    localCurrentTrackIndex ===
                                    tracks.length - 1
                                )
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
                            {tracks.length > 0 ? (
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
                                        onShowTrackMenu={openTrackAristsMenu}
                                    />
                                </View>
                            ) : (
                                <View
                                    style={[
                                        layouts.column,
                                        layouts.alignItemsCenter,
                                    ]}>
                                    <Skeleton
                                        style={{
                                            marginVertical:
                                                TRACK_ARTWORK_PARENT_VERTICAL_PADDING, // exactly same as the TrackImage
                                        }}
                                        animation="wave"
                                        circle={false}
                                        width={TRACK_ARTWORK_WIDTH}
                                        height={TRACK_ARTWORK_HEIGHT}
                                    />

                                    <View
                                        style={[
                                            layouts.column,
                                            layouts.alignItemsStart,
                                            {
                                                width: TRACK_ARTWORK_WIDTH, // to get the full width and align text skeletons to start
                                            },
                                        ]}>
                                        <Skeleton
                                            animation="wave"
                                            circle={false}
                                            width={TRACK_ARTWORK_WIDTH / 1.5} // this will be somewhat larger then the next one
                                            height={22} // this and below text's height combines to make the total height of the text description, almost!
                                            style={[
                                                gutters.extraTinyMarginBottom,
                                            ]} // from TrackPlayerDescription we get this value of the first text
                                        />

                                        <Skeleton
                                            animation="wave"
                                            circle={false}
                                            width={TRACK_ARTWORK_WIDTH / 2}
                                            height={18} // this and above text's height combines to make the total height of the text description, almost!
                                            style={[gutters.extraTinyMarginTop]} // from TrackPlayerDescription we get this value of the 2nd text
                                        />
                                    </View>
                                </View>
                            )}
                        </FlingGestureHandler>
                    </FlingGestureHandler>

                    {/* normal track player related controls like - play/pause, next, previous, repeat mode and others... */}
                    <TrackControls
                        onPlayNextTrack={() => onPlayNextTrack()}
                        onPlayPreviousTrack={() => onPlayPreviousTrack()}
                        closeAllMenu={closeAllMenu}
                    />

                    <TrackPlayerFooter
                        onQueueButtonPressed={launchQueueScreen}
                    />

                    {/* a global menu for displaying artist's data about the current track */}
                    <TrackDetailsMenu
                        menuName={TRACK_ARTIST_MENU_NAME}
                        closeMenu={closeAllMenu}
                    />

                    {/* here will be controls which needs API requests and tracks data like - queue, playlist and more.. */}
                </LinearGradient>
            </View>
        )
    },
)

export default SobytePlayerInterface
