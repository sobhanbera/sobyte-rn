/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - actual screen where the user can search songs....
 */

import React, {useEffect, useState} from 'react'
import {BackHandler, Keyboard, ScrollView, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {NavigationHelpers, RouteProp} from '@react-navigation/native'

import {useMusic, useTheme} from '@/hooks'
import {SearchInputHeader, TitleTextIcon} from '@/components'
import {
    SCREEN_HEIGHT,
    SEARCH_HISTORY_COUNT_LIMIT,
    SEARCH_HISTORY_STORAGE_KEY,
} from '@/configs'
import {SearchSuggestionsRenderer} from '@/components'
import {
    AlbumObject,
    ArtistObject,
    FetchedData,
    PlaylistObject,
    SongObject,
} from '@/schemas'
import {
    updateSearchHistories,
    SobyteState,
    updateSearchResultData,
    updateSearchSuggestions,
    updateSearchQueryText,
} from '@/state'

/**
 * the type of data passed through routes
 * when the navigation to this screen was done
 */
export interface ActualSearchScreenRouteParams {
    searchQuery: string // a optional string which could be passed to this screen
}
export interface ActualSearchScreenProps {
    navigation: NavigationHelpers<any>
    route: RouteProp<{params: ActualSearchScreenRouteParams}>
}
export function ActualSearchScreen({
    navigation,
    route,
}: ActualSearchScreenProps) {
    const {layouts, variables} = useTheme()
    const {getSearchSuggestions, search} = useMusic()
    const {searchQuery} = route.params

    // redux store related to search history
    const {searchQueryText, searchHistory, searchSuggestions} = useSelector(
        (state: SobyteState) => state.searchresults,
    )
    const dispatch = useDispatch()

    // if to show the search suggestions list or not
    const [showSearchSuggestions, setShowSearchSuggestions] =
        useState<boolean>(false)
    // this variable denotes wheather there are search suggestions found or not, after doing the api request
    const [searchSuggestionsFound, setSearchSuggestionsFound] =
        useState<boolean>(true)

    /**
     * this method adds new search history to the local storage
     * and updates the redux store
     **/
    function addNewSearchHistory(query: string = '') {
        if (query.length >= 1) {
            /**
             * since we are not saving more than 20 queries locally.
             * because it is not neccessary to show all the queries only 5 to 20 are sufficient...
             *
             * since array indexing starts from 0 and slice will give us uprange-1 elements
             * so to save SEARCH_HISTORY_COUNT_LIMIT histories we have to filter SEARCH_HISTORY_COUNT_LIMIT - 1 first history already there
             */
            let whatToSave: string[] = searchHistory.slice(
                0,
                SEARCH_HISTORY_COUNT_LIMIT - 1,
            )
            whatToSave.push(query.toLowerCase()) // adding the new data to be loaded in locally

            const finalSavingData: string[] = [...new Set(whatToSave)] // trimming duplicate data
            // finally saving all the queries...
            AsyncStorage.setItem(
                SEARCH_HISTORY_STORAGE_KEY,
                JSON.stringify(finalSavingData),
            )

            // finally updating the app store
            dispatch(updateSearchHistories({searchHistory: finalSavingData}))
        }
    }

    /**
     * this method updates both the variable @searchQueryText in store and @showSearchSuggestions
     * based on the arguments passed
     *
     * default value of @updateSearchTextInputValue is true because we want to show the suggestions...
     *
     * @param value and string query value
     * @param showSuggestions any boolean value
     */
    const updateSearchTextInputValue = (
        value: string,
        showSuggestions: boolean = true,
    ) => {
        console.log(value)
        dispatch(updateSearchQueryText({query: value}))

        /**
         * if value string is valid then only show suggestions
         * else not
         *
         * that's why we are checking for it and then setting it to the @showSearchSuggestions value
         */
        setShowSearchSuggestions(showSuggestions ? value.length > 0 : false)
    }

    /**
     * this method helps to search the search suggestions of some query
     * @param searchQuery string for the query to search for
     */
    const udpateSearchSuggestions = (searchQuery: string = '') => {
        if (searchQuery) {
            getSearchSuggestions(searchQuery)
                .then(res => {
                    /**
                     * if the length of the searched search suggestion's list is valid
                     * than update the list and also set the available data to true
                     *
                     * if no search suggestion could be found set the value of getting search suggestions to false
                     */
                    if (res.length > 0) {
                        /**
                         * also setting the current search suggestion to the list
                         * so that it is also an option among the search suggestion
                         */
                        const finalSearchSuggestions: string[] = [
                            searchQuery,
                            ...res,
                        ]

                        dispatch(
                            updateSearchSuggestions({
                                suggestions: finalSearchSuggestions,
                            }),
                        )
                        setSearchSuggestionsFound(true)
                    } else {
                        setSearchSuggestionsFound(false)
                    }
                })
                .catch(_ERR => {
                    /**
                     * setting that we don't got search suggestions
                     */
                    setSearchSuggestionsFound(false)
                })
        }
    }
    useEffect(() => {
        udpateSearchSuggestions(searchQueryText)
    }, [searchQueryText])

    /**
     * if the search query is passed from the previous screen
     * then we will searched for that query
     *
     * and also we will not auto focus the search text input
     *
     * else we have to also focus the input bar so that the user don't have to tap the input again
     * since the user have pressed on the input on the previous screen (in most cases) to come here
     */
    useEffect(() => {
        if (searchQuery.length > 0) {
            /**
             * this could be because the search is triggered by pressing on the search history
             * then update the value of search input
             * and also make sure that no search suggestions are shown in this case...
             */
            updateSearchTextInputValue(searchQuery, false)

            performSearch(searchQuery) // now also search for the results

            Keyboard.dismiss() // and also dismiss the keyboard so the it does not annoy the user #UX
        }
    }, [])

    /**
     * when the user presses back we are tracking if the search suggestions are being shown
     * if they are shown then set them to false
     * else goBack
     */
    useEffect(() => {
        const useBackButtonPressHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                if (showSearchSuggestions) {
                    setShowSearchSuggestions(false)

                    /**
                     * When true is returned the event will not be bubbled up
                     * & no other back action will execute
                     */
                    return true
                }

                /**
                 * Returning false will let the event to bubble up & let other event listeners
                 * or the system's default back action to be executed.
                 */
                return false
            },
        )

        /**
         * removing the events
         * when the component end its rendering
         */
        return () => {
            useBackButtonPressHandler.remove()
        }
    }, [])
    /**
     * when back button is pressed in the header
     * this method will navigate to the previous screen
     */
    const onHeaderBackButtonPressed = () => navigation.goBack()

    /**
     * this method performs the search operation
     * this method searches tracks, artists, albums and playlists...
     *
     * this method will also update the @searchQueryText in store value if a true is passed to @param updateActualInputValue
     * this will be useful when the query is pressed from the search suggestion list,
     * since they can differ from the actual value
     *
     * @param {string} query a query to search
     * @param {boolean} updateActualInputValue if to update the @searchQueryText in redux store
     */
    function performSearch(
        query: string = searchQueryText,
        updateActualInputValue: boolean = false,
    ) {
        if (updateActualInputValue) updateSearchTextInputValue(query, false)
        /**
         * if the suggestions are found then search for the songs
         * else return from this method
         */
        if (!searchSuggestionsFound) return

        // adding the query to search history
        addNewSearchHistory(query)

        /**
         * getting data for songs/tracks
         */
        search(query, 'SONG')
            .then((data: FetchedData<SongObject>) => {
                dispatch(
                    updateSearchResultData({
                        songsData: data.content,
                        songsContinuationData: data.continuation,
                    }),
                )
            })
            .catch(_ERR => {
                console.log('SONG_ERR', _ERR)
            })

        /**
         * getting data of artists
         */
        search(query, 'ARTIST')
            .then((data: FetchedData<ArtistObject>) => {
                dispatch(
                    updateSearchResultData({
                        artistsData: data.content,
                        artistsContinuationData: data.continuation,
                    }),
                )
            })
            .catch(_ERR => {
                console.log('ARTIST_ERR', _ERR)
            })

        /**
         * getting data of playlists
         */
        search(query, 'PLAYLIST')
            .then((data: FetchedData<PlaylistObject>) => {
                dispatch(
                    updateSearchResultData({
                        playlistsData: data.content,
                        playlistsContinuationData: data.continuation,
                    }),
                )
            })
            .catch(_ERR => {
                console.log('PLAYLIST_ERR', _ERR)
            })

        /**
         * getting data for albums
         */
        search(query, 'ALBUM')
            .then((data: FetchedData<AlbumObject>) => {
                dispatch(
                    updateSearchResultData({
                        albumsData: data.content,
                        albumsContinuationData: data.continuation,
                    }),
                )
            })
            .catch(_ERR => {
                console.log('ALBUM_ERR', _ERR)
            })
    }

    return (
        <View>
            {/* the search input field */}
            <SearchInputHeader
                textInputProps={{
                    value: searchQueryText,
                    onChangeText: (changedSearchValue: string) =>
                        updateSearchTextInputValue(changedSearchValue),
                    onSubmitEditing: () => performSearch(),
                    /**
                     * if the serachQuery is provided then don't focus the text input on this screen
                     * else if the query is not being passed then focus could be performed
                     */
                    autoFocus: searchQuery.length <= 0,
                }}
                onClearSearchInput={() => updateSearchTextInputValue('')}
                showBackButton={searchQueryText.length > 0}
                onBackButtonPress={onHeaderBackButtonPressed}
            />

            <ScrollView
                horizontal
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    layouts.fullWidth,
                    {
                        paddingBottom:
                            variables.metrics.massive + variables.metrics.huge,
                    },
                ]}>
                <TitleTextIcon
                    text="More"
                    onPressTextOrIcon={() => {}}
                    showIcon={true}
                    IconComponentType={EvilIcons}
                    iconName={'chevron-right'}>
                    {'Songs'}
                </TitleTextIcon>
            </ScrollView>

            {showSearchSuggestions ? (
                <View
                    style={[
                        layouts.fill,
                        {
                            width: '100%',
                            minHeight: SCREEN_HEIGHT,
                        },
                    ]}>
                    <SearchSuggestionsRenderer
                        suggestions={searchSuggestions}
                        searchSuggestionsFound={searchSuggestionsFound}
                        searchQuery={searchQueryText}
                        onQueryPressed={query => performSearch(query, true)}
                    />
                </View>
            ) : null}
        </View>
    )
}
