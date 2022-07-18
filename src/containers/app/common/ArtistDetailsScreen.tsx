/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen provides data about artist like, tracks, playlist and more..
 */

import React, {useEffect, useRef, useState} from 'react'
import {Animated, View} from 'react-native'
import {NavigationHelpers, RouteProp} from '@react-navigation/native'
import ImageColors from 'react-native-image-colors'

import {useMusic, useTheme} from '@/hooks'
import {
    ArtistObject,
    FetchedData,
    FetchedSongObject,
    PlaylistObject,
    SongObject,
} from '@/schemas'
import {
    AnimatedHeader,
    BottomPaddingComponent,
    ListCardRendererArtists,
    ListRendererPlaylists,
    ListRendererSongs,
    TitleTextIcon,
} from '@/components'
import {
    ACTUAL_HEADER_HEIGHT,
    ANIMATED_HEADER_EXTENDED_HEIGHT,
    ARTIST_ARTWORK_COLOR_UNIQUE_KEY,
    COMMON_ARTIST_DETAILS_SCREEN,
    NOTHING_URL,
} from '@/configs'
import {ArtistDetailsObject} from '@/schemas'
import {
    navigateToMorePlaylistDetailsScreen,
    navigateToMoreTrackDetailsScreen,
    navigateToPlaylistDetailsScreen,
    updateArtworkQualityUniversal,
} from '@/utils'
import LinearGradient from 'react-native-linear-gradient'

/**
 * the type of data this screen needs to render
 * artist's data
 */
export interface ArtistDetailsScreenRouteParams {
    artistData: {
        title: string // a optional string which could be passed to this screen
        browseId: string
    }
}

export interface ArtistDetailsScreenProps {
    navigation: NavigationHelpers<any> & {push: any}
    route: RouteProp<{params: ArtistDetailsScreenRouteParams}>
}
export function ArtistDetailsScreen({
    navigation,
    route,
}: ArtistDetailsScreenProps) {
    const {artistData} = route.params
    const {search, getArtist} = useMusic()
    const {theme, gutters} = useTheme()

    const scrollYOffset = useRef(new Animated.Value(0)).current

    /**
     * this is the data which will be rendered
     * like the track data, artists list and the playlist or so...
     */
    const [tracks, setTracks] = useState<Array<SongObject>>([])
    const [otherArtists, setOtherArtists] = useState<Array<ArtistObject>>([])
    const [artistPlaylists, setArtistPlaylists] = useState<
        Array<PlaylistObject>
    >([])

    /**
     * this state var will contains the detail about the artist
     * like name, description, artwork etc...
     */
    const [artistArtwork, setArtistArtwork] = useState<string>(NOTHING_URL)

    /**
     * these two variables stores the data about the colors in artists artwork
     * like the vibrant color, dark vibrant, dominant color, etc...
     *
     * initial color are the theme color of the theme
     */
    const [artistArtworkColors, setArtistArtworkColors] = useState<string>(
        theme.themecolor,
    )

    /**
     * loading artist's data before rendering...
     * this is mainly done to get the thumbnail and its vibrant/primary color
     */
    useEffect(() => {
        getArtist(artistData.browseId, true)
            .then((artistResult: ArtistDetailsObject) => {
                if (artistResult.thumbnails) {
                    // getting an updated quality image
                    const updatedArtistArtwork = updateArtworkQualityUniversal(
                        artistResult.thumbnails[0],
                    )
                    // setting it to state
                    setArtistArtwork(updatedArtistArtwork)

                    // not trying to get the colors of the artwork related to this artist
                    ImageColors.getColors(updatedArtistArtwork, {
                        cache: true,
                        fallback: theme.themecolor,
                        key:
                            ARTIST_ARTWORK_COLOR_UNIQUE_KEY +
                            artistData.browseId, // this should be unique for every image, or else the cache will not work properly
                    }).then(res => {
                        if (res.platform === 'android') {
                            if (res.darkVibrant)
                                setArtistArtworkColors(res.darkVibrant)
                            else if (res.lightVibrant)
                                setArtistArtworkColors(res.lightVibrant)
                            else if (res.vibrant)
                                setArtistArtworkColors(res.vibrant)
                            else setArtistArtworkColors(theme.themecolor)
                        }
                    })
                } else {
                    console.log('TrackDetailsMenuArtist', 'CANNOT LOAD ARTIST')
                }
            })
            .catch(_ERR => {
                console.log('TrackDetailsMenuArtist', _ERR)
            })

        // to overcome state unmounting and overflow
        return () => {
            setArtistArtwork('')
            setArtistArtworkColors(theme.themecolor)
        }
    }, [artistData.browseId])

    /**
     * in the first render we are getting the artist's related data liked there songs,
     * and also some playlists, and also getting more artists related
     */
    useEffect(() => {
        Promise.all([
            search(artistData.title, 'SONG').then((res: FetchedSongObject) => {
                if (res.content.length > 0) setTracks(res.content)
            }),

            /**
             * getting artists list related to the current artist
             * and then filtering out the current artist, since we don;t want a loop right
             * or else the UX will be worst
             */
            search(artistData.title, 'ARTIST').then(
                (otherArtists: FetchedData<ArtistObject>) => {
                    setOtherArtists(
                        otherArtists.content.filter(
                            artist => artist.browseId !== artistData.browseId,
                        ),
                    )
                },
            ),

            /**
             * getting playlists data related to the artist
             */
            search(artistData.title, 'PLAYLIST').then(
                (playlists: FetchedData<PlaylistObject>) => {
                    setArtistPlaylists(playlists.content)
                },
            ),
        ]).catch(_ERR => {
            console.log('ArtistDetailsScreen.Promise.all', _ERR)
        })

        return () => {}
    }, [artistData.title])

    /**
     * this method pushes the same screen on the top of it
     * to render some other artist
     * NOTE: not this artist
     *
     * @param artistData the artist's data to forward to the next screen
     */
    const openArtistDetailsScreen = (artist: ArtistObject) => {
        if (artist.browseId !== artistData.browseId)
            navigation.push(COMMON_ARTIST_DETAILS_SCREEN, {artistData: artist})
    }

    return (
        <View
            style={{backgroundColor: artistArtworkColors}} // so that the bg colors are synced together
        >
            <AnimatedHeader
                navigation={navigation}
                scrollYOffset={scrollYOffset}
                headerTitle={artistData.title}
                headerBackgroundImage={artistArtwork}
                headerBackgroundColor={artistArtworkColors}
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
                        artistArtworkColors,
                        theme.themecolor,
                        theme.themecolor,
                        theme.themecolor,
                        theme.themecolor,
                    ]}>
                    {tracks.length > 0 ? (
                        <View>
                            <TitleTextIcon
                                text="More"
                                onPressTextOrIcon={() =>
                                    navigateToMoreTrackDetailsScreen(
                                        navigation,
                                        {searchQuery: artistData.title},
                                    )
                                }
                                showIcon={true}
                                IconType={'EvilIcons'}
                                iconName={'chevron-right'}>
                                {'Songs'}
                            </TitleTextIcon>

                            <ListRendererSongs
                                songsList={tracks}
                                searchQuery={artistData.title}
                            />
                        </View>
                    ) : null}

                    {/* playlists data */}
                    {artistPlaylists.length > 0 ? (
                        <View>
                            <TitleTextIcon
                                text="More"
                                onPressTextOrIcon={() =>
                                    navigateToMorePlaylistDetailsScreen(
                                        navigation,
                                        {searchQuery: artistData.title},
                                    )
                                }
                                showIcon={true}
                                IconType={'EvilIcons'}
                                iconName={'chevron-right'}
                                style={[gutters.mediumPaddingVertical]}>
                                {'Playlists'}
                            </TitleTextIcon>

                            <ListRendererPlaylists
                                playlistList={artistPlaylists}
                                onPressPlaylist={playlist =>
                                    navigateToPlaylistDetailsScreen(
                                        navigation,
                                        {
                                            playlistData: playlist,
                                        },
                                    )
                                }
                            />
                        </View>
                    ) : null}

                    {/* artists data */}
                    {otherArtists.length > 0 ? (
                        <View>
                            <TitleTextIcon
                                text=""
                                onPressTextOrIcon={() => {}}
                                showIcon={false} // since we don't provide to see more artists again
                                IconType={'EvilIcons'}
                                iconName={'chevron-right'}
                                style={[gutters.mediumPaddingVertical]}>
                                {'More Artists You May Like'}
                            </TitleTextIcon>

                            <ListCardRendererArtists
                                artistList={otherArtists}
                                onPressArtistCard={artistData => {
                                    openArtistDetailsScreen(artistData)
                                }}
                            />
                        </View>
                    ) : null}

                    <BottomPaddingComponent padding={200} />
                </LinearGradient>
            </Animated.ScrollView>
        </View>
    )
}
