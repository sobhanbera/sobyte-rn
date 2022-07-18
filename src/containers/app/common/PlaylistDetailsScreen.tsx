/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen renders tracks data of any playlist..
 */

import React, {useEffect, useRef, useState} from 'react'
import {Animated, View} from 'react-native'
import {NavigationHelpers, RouteProp} from '@react-navigation/native'

import {useMusic, useTheme} from '@/hooks'
import {
    ContinuationObjectKeys,
    PlaylistDetailsObject,
    PlaylistTrackObject,
} from '@/schemas'
import {
    AnimatedHeader,
    BottomPaddingComponent,
    ListRendererSongs,
    SobyteTextView,
    TitleTextIcon,
} from '@/components'
import {
    ACTUAL_HEADER_HEIGHT,
    ANIMATED_HEADER_EXTENDED_HEIGHT,
    NOTHING_URL,
    PLAYLIST_ARTWORK_COLOR_UNIQUE_KEY,
} from '@/configs'
import LinearGradient from 'react-native-linear-gradient'
import ImageColors from 'react-native-image-colors'
import {updateArtworkQualityUniversal} from '@/utils'

/**
 * the type of data this screen needs to render
 * playlist's data
 */
export interface PlaylistDetailsScreenRouteParams {
    playlistData: {
        title: string // an optional title so that the title could be rendered before loading data
        browseId: string
    }
}

export interface PlaylistDetailsScreenProps {
    navigation: NavigationHelpers<any> & {push: any}
    route: RouteProp<{params: PlaylistDetailsScreenRouteParams}>
}
export function PlaylistDetailsScreen({
    navigation,
    route,
}: PlaylistDetailsScreenProps) {
    const {playlistData} = route.params
    const {getPlaylist} = useMusic()
    const {theme} = useTheme()

    const scrollYOffset = useRef(new Animated.Value(0)).current

    /**
     * the tracks in the playlist
     * and the data about how to get data continously
     * and the 3rd object carries the rest of the playlist data like, tracks count and year
     */
    const [tracks, setTracks] = useState<Array<PlaylistTrackObject>>([])
    const [continuationData, setContinuationData] =
        useState<ContinuationObjectKeys>({
            continuation: '',
            clickTrackingParams: '',
        })
    const [restPlaylistData, setRestPlaylistData] = useState<{
        title: string
        trackCount: number
        dateYear: number
    }>({
        title: playlistData.title || '',
        dateYear: 0,
        trackCount: 0,
    })

    /**
     * the playlist artwork and the
     */
    const [playlistArtwork, setPlaylistArtwork] = useState<string>(NOTHING_URL)
    const [playlistArtworkColors, setPlaylistArtworkColors] = useState<string>(
        theme.themecolor,
    )

    /**
     * loading playlist's track's data before rendering...
     * this is mainly done to get the thumbnail and its vibrant/primary color
     */
    useEffect(() => {
        getPlaylist(playlistData.browseId)
            .then((playlistResult: PlaylistDetailsObject) => {
                // setting it to state
                setTracks(playlistResult.content)
                setContinuationData(playlistResult.continuation)
                setRestPlaylistData({
                    title: playlistResult.title,
                    dateYear: playlistResult.dateYear,
                    trackCount: playlistResult.trackCount,
                })
                const playlistArtwork = updateArtworkQualityUniversal(
                    playlistResult.artwork[0],
                )
                // console.log(
                //     playlistResult.title,
                //     playlistResult.dateYear,
                //     playlistResult.trackCount,
                //     JSON.stringify(playlistResult.artwork),
                // )

                setPlaylistArtwork(playlistArtwork) // artwork of the playlist
                // now trying to get the colors of the artwork related to this playlist
                ImageColors.getColors(playlistArtwork, {
                    cache: true,
                    fallback: theme.themecolor,
                    key:
                        PLAYLIST_ARTWORK_COLOR_UNIQUE_KEY +
                        playlistData.browseId, // this should be unique for every image, or else the cache will not work properly
                }).then(res => {
                    if (res.platform === 'android') {
                        if (res.darkVibrant)
                            setPlaylistArtworkColors(res.darkVibrant)
                        else if (res.lightVibrant)
                            setPlaylistArtworkColors(res.lightVibrant)
                        else if (res.vibrant)
                            setPlaylistArtworkColors(res.vibrant)
                        else setPlaylistArtworkColors(theme.themecolor)
                    }
                })
            })
            .catch(_ERR => {})

        // to overcome state unmounting and overflow
        return () => {}
    }, [playlistData.browseId])

    return (
        <View
            style={{backgroundColor: playlistArtworkColors}} // so that the bg colors are synced together
        >
            <AnimatedHeader
                navigation={navigation}
                scrollYOffset={scrollYOffset}
                headerTitle={restPlaylistData.title}
                headerBackgroundImage={playlistArtwork}
                headerBackgroundColor={playlistArtworkColors}
            />

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollYOffset}}}],
                    {useNativeDriver: false},
                )}
                scrollEventThrottle={16}
                style={{
                    marginTop: ACTUAL_HEADER_HEIGHT, // from where the scroll should start
                    paddingTop: ANIMATED_HEADER_EXTENDED_HEIGHT, // actual extra space after actual header height
                }}>
                <LinearGradient
                    colors={[
                        playlistArtworkColors,
                        theme.themecolor,
                        theme.themecolor,
                        theme.themecolor,
                        theme.themecolor,
                    ]}>
                    {tracks.length > 0 ? (
                        <View>
                            <TitleTextIcon>Tracks</TitleTextIcon>
                            <ListRendererSongs
                                songsList={tracks}
                                searchQuery={playlistData.title}
                            />
                        </View>
                    ) : null}

                    <BottomPaddingComponent padding={200} />
                </LinearGradient>
            </Animated.ScrollView>
        </View>
    )
}
