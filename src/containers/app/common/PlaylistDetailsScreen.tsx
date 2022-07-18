/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen renders tracks data of any playlist.. no continuation data
 */

import React, {useEffect, useRef, useState} from 'react'
import {Animated, View} from 'react-native'
import {NavigationHelpers, RouteProp} from '@react-navigation/native'

import {useMusic, useTheme} from '@/hooks'
import {
    PlaylistDetailsObject,
    PlaylistObject,
    PlaylistTrackObject,
} from '@/schemas'
import {
    AnimatedHeader,
    BottomPaddingComponent,
    ListRendererSongs,
    LoadingAnimation,
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
    playlistData: Partial<PlaylistObject> & {
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

    const DEFAULT_THEME_COLOR = theme.themecolor

    const scrollYOffset = useRef(new Animated.Value(0)).current // the scroll position which is needed by animated header

    const [loading, setLoading] = useState<boolean>(true)
    /**
     * the tracks in the playlist
     *
     * and the data about how to get data continously
     *
     * and the 3rd object carries the rest of the playlist data like, tracks count and year
     */
    const [tracks, setTracks] = useState<Array<PlaylistTrackObject>>([])
    const [restPlaylistData, setRestPlaylistData] = useState<{
        title: string
        trackCount: number
        dateYear: number
    }>({
        title: playlistData.title || '',
        dateYear: 0,
        trackCount: playlistData.trackCount || 0,
    })

    /**
     * the playlist artwork and the
     */
    const [playlistArtwork, setPlaylistArtwork] = useState<string>(NOTHING_URL)
    const [playlistArtworkColor, setPlaylistArtworkColor] =
        useState<string>(DEFAULT_THEME_COLOR)

    /**
     * since we are also getting artwork from the param, so why to wait for the api request
     * we can even load the artwork color from it
     * so instead of doing this multiple time
     * its a DRY code function
     *
     * ok now see this function also checks if the artwork color is already changed (from the params artwork url)
     * if so then don't search for color again
     *
     * ENJOY!
     *
     * @param artwork url string of any image
     */
    const updatePlaylistArtworkColor = (artwork: string) => {
        // if the color is not the default one
        // then it means it has been changed once
        // in this case don't even try to change it once more
        if (playlistArtworkColor !== DEFAULT_THEME_COLOR) return

        ImageColors.getColors(artwork, {
            cache: true,
            fallback: DEFAULT_THEME_COLOR,
            key: PLAYLIST_ARTWORK_COLOR_UNIQUE_KEY + playlistData.browseId, // this should be unique for every image, or else the cache will not work properly
        }).then(res => {
            if (res.platform === 'android') {
                if (res.darkVibrant) setPlaylistArtworkColor(res.darkVibrant)
                else if (res.lightVibrant)
                    setPlaylistArtworkColor(res.lightVibrant)
                else if (res.vibrant) setPlaylistArtworkColor(res.vibrant)
                else setPlaylistArtworkColor(DEFAULT_THEME_COLOR)
            }
        })
    }

    /**
     * loading playlist's track's data before rendering...
     * this is mainly done to get the thumbnail and its vibrant/primary color
     */
    useEffect(() => {
        /**
         * if the artwork data is provided from the params then also set the state
         * so that the user can even see something in the UI
         */
        if (playlistData.browseId) {
            if (
                Array.isArray(playlistData?.artworks) &&
                playlistData?.artworks?.length > 0
            ) {
                const playlistArtwork = updateArtworkQualityUniversal(
                    playlistData.artworks[0],
                )

                setPlaylistArtwork(playlistArtwork)
                updatePlaylistArtworkColor(playlistArtwork)
            }
        } else {
            throw new Error('No Playlist Browse ID Provided.')
        }

        setLoading(true)
        getPlaylist(playlistData.browseId)
            .then((playlistResult: PlaylistDetailsObject) => {
                // setting it to state
                setTracks(playlistResult.content)
                setRestPlaylistData({
                    title: playlistResult.title,
                    dateYear: playlistResult.dateYear,
                    trackCount: playlistResult.trackCount,
                })

                /**
                 * if the artwork is provided from the params then don't update from the remote origin
                 * we will take the one from param only
                 */
                if (playlistArtworkColor === DEFAULT_THEME_COLOR) {
                    const playlistArtwork = updateArtworkQualityUniversal(
                        playlistResult.artwork[0],
                    )

                    setPlaylistArtwork(playlistArtwork) // artwork of the playlist

                    // now trying to get the colors of the artwork related to this playlist if not provided from the params
                    updatePlaylistArtworkColor(playlistArtwork)
                }

                setLoading(false)
            })
            .catch(_ERR => {
                setLoading(false)
            })

        // to overcome state unmounting and overflow
        return () => {}
    }, [playlistData.browseId])

    return (
        <View
            style={{backgroundColor: playlistArtworkColor}} // so that the bg colors are synced together
        >
            <AnimatedHeader
                navigation={navigation}
                scrollYOffset={scrollYOffset}
                headerTitle={restPlaylistData.title}
                headerBackgroundImage={playlistArtwork}
                headerBackgroundColor={playlistArtworkColor}
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
                        playlistArtworkColor,
                        DEFAULT_THEME_COLOR,
                        DEFAULT_THEME_COLOR,
                        DEFAULT_THEME_COLOR,
                        DEFAULT_THEME_COLOR,
                    ]}>
                    {/* tracks data for the current playlist */}
                    {tracks.length > 0 ? (
                        <View>
                            <TitleTextIcon>Tracks</TitleTextIcon>
                            <ListRendererSongs
                                songsList={tracks}
                                searchQuery={restPlaylistData.title}
                            />
                        </View>
                    ) : null}

                    {loading && <LoadingAnimation />}

                    <BottomPaddingComponent padding={200} />
                </LinearGradient>
            </Animated.ScrollView>
        </View>
    )
}
