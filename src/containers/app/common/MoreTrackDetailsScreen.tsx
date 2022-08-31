/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen will render more tracks/songs for any query
 */

import React, {useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {NavigationHelpers, RouteProp} from '@react-navigation/native'

import {useMusic} from '@/hooks'
import {
    BottomPaddingComponent,
    CommonHeader,
    ListRendererSongs,
    LoadingAnimation,
} from '@/components'
import {ContinuationObjectKeys, FetchedSongObject, SongObject} from '@/schemas'
import {isScrollViewReachedCloseToBottom} from '@/utils'

export interface MoreTrackDetailsScreenRouteParams {
    searchQuery: string
}
export interface MoreTrackDetailsScreenProps {
    navigation: NavigationHelpers<any>
    route: RouteProp<{params: MoreTrackDetailsScreenRouteParams}>
}
export function MoreTrackDetailsScreen({
    navigation,
    route,
}: MoreTrackDetailsScreenProps) {
    const {searchQuery} = route.params
    const {search, getContinuation} = useMusic()

    /** is the search or the get continuation is being loading or not */
    const [loading, setLoading] = useState<boolean>(true)
    /**
     * details about the tracks and the continudation data after getting the results
     * this continuation data is used to get more data after reaching the end of the scrollview
     */
    const [tracks, setTracks] = useState<Array<SongObject>>([])
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

        search(searchQuery, 'SONG')
            .then((trackResults: FetchedSongObject) => {
                if (trackResults.content.length > 0) {
                    setTracks(trackResults.content)
                    setContinuationData(trackResults.continuation)
                }
                setLoading(false)
            })
            .catch(_ERR => {
                console.log('Cannot load tracks in more tracks screen ', _ERR)
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
            console.log('getting more data...')
            setLoading(true)

            getContinuation('search', continuationData, 'SONG')
                .then((continuedTrackResults: FetchedSongObject) => {
                    if (continuedTrackResults.content.length > 0) {
                        setTracks(previousTracks => {
                            return [
                                ...previousTracks,
                                ...continuedTrackResults.content,
                            ]
                        })

                        setContinuationData(continuedTrackResults.continuation)
                    }
                    setLoading(false)
                })
                .catch(_ERR => {
                    console.log('cannot get data continue', _ERR)
                    setLoading(false)
                })
        }
    }

    return (
        <View>
            <CommonHeader title="More Tracks" navigation={navigation} />

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
                <ListRendererSongs
                    songsList={tracks}
                    searchQuery={searchQuery}
                />

                {loading && <LoadingAnimation />}

                <BottomPaddingComponent padding={150} />
            </ScrollView>
        </View>
    )
}
