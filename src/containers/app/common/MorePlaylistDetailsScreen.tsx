/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen will render more playlist related to query
 */

import React, {useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {NavigationHelpers, RouteProp} from '@react-navigation/native'

import {useMusic, useTheme} from '@/hooks'
import {
    BottomPaddingComponent,
    HeaderCommon,
    ListRendererPlaylists,
} from '@/components'
import {ContinuationObjectKeys, FetchedData, PlaylistObject} from '@/schemas'
import {
    isScrollViewReachedCloseToBottom,
    navigateToPlaylistDetailsScreen,
} from '@/utils'
import AnimatedLottieView from 'lottie-react-native'
import {DEFAULT_LOTTIE_LOGO_ANIMATION_HEIGHT} from '@/configs'

export interface MorePlaylistDetailsScreenRouteParams {
    searchQuery: string
}
export interface MorePlaylistDetailsScreenProps {
    navigation: NavigationHelpers<any>
    route: RouteProp<{params: MorePlaylistDetailsScreenRouteParams}>
}
export function MorePlaylistDetailsScreen({
    navigation,
    route,
}: MorePlaylistDetailsScreenProps) {
    const {searchQuery} = route.params
    const {search, getContinuation} = useMusic()
    const {layouts, gutters, assets} = useTheme()

    /** is the search or the get continuation is being loading or not */
    const [loading, setLoading] = useState<boolean>(true)
    /**
     * details about the playlists and the continudation data after getting the results
     * this continuation data is used to get more data after reaching the end of the scrollview
     */
    const [playlists, setPlaylists] = useState<Array<PlaylistObject>>([])
    const [continuationData, setContinuationData] =
        useState<ContinuationObjectKeys>({
            continuation: '',
            clickTrackingParams: '',
        })

    /**
     * the initial method to get the songs data and update the state if the songs
     * data is returned from the api
     * else return from the function
     */
    useEffect(() => {
        setLoading(true)

        search(searchQuery, 'PLAYLIST')
            .then((playlistResults: FetchedData<PlaylistObject>) => {
                if (playlistResults.content.length > 0) {
                    setPlaylists(playlistResults.content)
                    setContinuationData(playlistResults.continuation)
                }
                setLoading(false)
            })
            .catch(_ERR => {
                console.log('Cannot load more playlists ', _ERR)
                setLoading(false)
            })
    }, [])

    /**
     * this method is fully responsible for fetching the songs results when the user reaches the end
     * of the scrollview
     */
    const getContinousData = () => {
        if (
            continuationData.continuation &&
            continuationData.clickTrackingParams &&
            loading === false // there should not be any data already loading, or else it will create overridingn of the API calls
        ) {
            setLoading(true)

            getContinuation('search', continuationData, 'PLAYLIST')
                .then(
                    (continuedPlaylistResults: FetchedData<PlaylistObject>) => {
                        if (continuedPlaylistResults.content.length > 0) {
                            setPlaylists(previousPlaylists => {
                                return [
                                    ...previousPlaylists,
                                    ...continuedPlaylistResults.content,
                                ]
                            })

                            setContinuationData(
                                continuedPlaylistResults.continuation,
                            )
                        }
                        setLoading(false)
                    },
                )
                .catch(_ERR => {
                    console.log('cannot get playlists', _ERR)
                    setLoading(false)
                })
        }
    }

    return (
        <View>
            <HeaderCommon title="Playlists" navigation={navigation} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={event => {
                    // method first finds out wheather the scrollview reached its end
                    // and then triggers the get more data function
                    if (isScrollViewReachedCloseToBottom(event)) {
                        // console.log('get')
                        getContinousData()
                    }
                }}
                scrollEventThrottle={16}>
                {/* list of songs are rendered here */}
                <ListRendererPlaylists
                    playlistList={playlists}
                    onPressPlaylist={playlist =>
                        navigateToPlaylistDetailsScreen(navigation, {
                            playlistData: playlist,
                        })
                    }
                />

                {loading ? (
                    <View style={[layouts.center, gutters.smallPadding]}>
                        <AnimatedLottieView
                            loop
                            autoPlay
                            source={assets.animations.dancing_logo}
                            style={[
                                {
                                    height: DEFAULT_LOTTIE_LOGO_ANIMATION_HEIGHT,
                                    alignSelf: 'center',
                                    position: 'relative',
                                },
                            ]}
                        />
                    </View>
                ) : null}

                <BottomPaddingComponent padding={150} />
            </ScrollView>
        </View>
    )
}
