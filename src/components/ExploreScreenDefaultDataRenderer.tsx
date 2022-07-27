/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component render all the default neccessary data for the explore screen
 */

import React, {useEffect, useState} from 'react'

import {ExploreScreenDataResponse} from '@/schemas'

import {QueryDataRenderer} from './QueryDataRenderer'
import {View} from 'react-native'
import axios, {AxiosResponse} from 'axios'
import {
    ExploreScreenDefaultFallbackData,
    EXPLORE_SCREEN_DATA_GITHUB_FILE_URL,
} from '@/configs'
import {LoadingAnimation} from './LoadingAnimation'

export interface ExploreScreenDefaultDataRendererProps {}
export function ExploreScreenDefaultDataRenderer({}: ExploreScreenDefaultDataRendererProps) {
    const [contents, setContents] = useState<ExploreScreenDataResponse>([])
    const [loading, setLoading] = useState<boolean>(true)

    /**
     * this method loads up the data from GitHub file which is data related to
     * explore screen to be rendered
     */
    const loadExploreScreenData = () => {
        setLoading(true)
        axios
            .get(EXPLORE_SCREEN_DATA_GITHUB_FILE_URL)
            .then((data: AxiosResponse<ExploreScreenDataResponse>) => {
                const exploreScreenContent = JSON.parse(
                    JSON.stringify(data.data),
                )
                setContents(exploreScreenContent)

                // remove loading when the data is fetched
                setLoading(false)
            })
            .catch(_ERR => {
                console.log('ERROR IN EXPLOER', _ERR)
                setContents(ExploreScreenDefaultFallbackData) // saving fallback data when any error occurs

                // remove loading when the data is from fallback and fetching process is ended with error
                setLoading(false)
            })
    }

    /**
     * this method will call the method which will fetch data from a GitHub file
     * which will be the data for the explore screen
     */
    useEffect(() => {
        loadExploreScreenData()
    }, [])

    return (
        <View>
            {/**
             * rendering loading when any data is not being loaded
             * else render the data
             **/}
            {loading ? (
                <LoadingAnimation />
            ) : (
                contents.map(content => {
                    return (
                        <QueryDataRenderer
                            key={content.id}
                            contentType={content.type}
                            searchQueries={content.searchQueries}
                            title={content.title}
                            combinedProps={content.combinedProps}
                        />
                    )
                })
            )}
        </View>
    )
}
