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
import {View} from 'react-native'
import axios, {AxiosResponse} from 'axios'
import {NavigationHelpers} from '@react-navigation/native'

import {ExploreScreenDataResponse} from '@/schemas'
import {
    ExploreScreenDefaultFallbackData,
    EXPLORE_SCREEN_DATA_GITHUB_FILE_URL,
    EXPLORE_SCREEN_DATA_STORAGE_KEY,
} from '@/configs'
import {getItemFromLocalStorage, setItemToLocalStorage} from '@/utils'

import {LoadingAnimation} from './LoadingAnimation'
import {QueryDataRenderer} from './QueryDataRenderer'

export interface ExploreScreenDefaultDataRendererProps {
    navigation: NavigationHelpers<any>
}
export function ExploreScreenDefaultDataRenderer({
    navigation,
}: ExploreScreenDefaultDataRendererProps) {
    const [contents, setContents] = useState<ExploreScreenDataResponse>([])
    const [loading, setLoading] = useState<boolean>(true)

    /**
     * this method just updates the content array and
     * disables the loading by default
     *
     * @param content the content data of the screen
     * @param isLoading is the loading should be shown or not..
     */
    const updateContents = (
        content: ExploreScreenDataResponse,
        isLoading: boolean = false,
    ) => {
        setContents(content)

        /**
         * this operation is done only after setting/updating the contents of this screen,
         * this could be after getting error fetching the data,
         * getting data after fetching
         * else getting data from local stoarge
         * else getting data from the fallback variable itself
         */
        setLoading(isLoading)
    }

    /**
     * this method load up data from the local storage if the network issue or any error
     * occurs during making api request to the GitHub file
     */
    const loadExploreScreenDataFromLocalStorage = () => {
        /**
         * first get the data from the local storage
         * if the data is valid then update it to the state
         * else update the state to a fallback value
         */
        getItemFromLocalStorage(EXPLORE_SCREEN_DATA_STORAGE_KEY, '').then(
            (data: string) => {
                const parsedExploreScreenContent: ExploreScreenDataResponse =
                    JSON.parse(data)

                /**
                 * while validating the data
                 * the data should be an array in the local storage
                 */
                if (Array.isArray(parsedExploreScreenContent)) {
                    updateContents(parsedExploreScreenContent)

                    // also remove the loading after getting the data from anywhere
                } else {
                    // else update the value to fallback data
                    updateContents(ExploreScreenDefaultFallbackData) // saving fallback data when any error occurs

                    // remove loading when the data is from fallback
                }
            },
        )
    }

    /**
     * this method loads up the data from GitHub file which is data related to
     * explore screen to be rendered
     */
    const loadExploreScreenData = () => {
        // show the loading before fetching the data
        setLoading(true)

        axios
            .get(EXPLORE_SCREEN_DATA_GITHUB_FILE_URL)
            .then((data: AxiosResponse<ExploreScreenDataResponse>) => {
                const nonParsedData = JSON.stringify(data.data)
                const parsedExploreScreenContent = JSON.parse(nonParsedData)

                /**
                 * checking wheather the data is a valid array
                 * else loads up the data from local storage
                 */
                if (Array.isArray(parsedExploreScreenContent)) {
                    // udpate the state after fetching and parsing the data
                    updateContents(parsedExploreScreenContent)

                    /**
                     * also save the data in the local storage so that the data
                     * could be used when there is no internet available
                     */
                    setItemToLocalStorage(
                        EXPLORE_SCREEN_DATA_STORAGE_KEY,
                        '',
                        nonParsedData,
                    )
                } else {
                    loadExploreScreenDataFromLocalStorage()
                }
            })
            .catch(_ERR => {
                // load data from local storage if any
                loadExploreScreenDataFromLocalStorage()
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
                            navigation={navigation}
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
