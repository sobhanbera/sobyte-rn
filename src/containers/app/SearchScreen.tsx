/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - screen where the user can search songs....
 */

import React, {useEffect, useState} from 'react'
import {BackHandler, Keyboard, ScrollView, View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

import {useMusic, useTheme} from '@/hooks'
import {
    SearchGenreListRenderer,
    SearchHistoryRenderer,
    SearchInputHeader,
} from '@/components'
import {
    GenreList,
    LanguagesList,
    MoodsList,
    MusicTimesList,
    ExtraMusicTypesList,
    SCREEN_HEIGHT,
    SEARCH_HISTORY_STORAGE_KEY,
    AppSearchSuggestions,
} from '@/configs'
import {SearchSuggestionsRenderer} from '@/components'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface SearchScreenProps {
    navigation: NavigationHelpers<any>
}
export function SearchScreen({}: SearchScreenProps) {
    const {layouts, variables} = useTheme()
    const {getSearchSuggestions, search} = useMusic()

    // the value of the search text input component
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    // list of search queries which were done successfully recently
    const [searchHistory, setSearchHistory] = useState<string[]>([])

    // if to show the search suggestions list or not
    const [showSearchSuggestions, setShowSearchSuggestions] =
        useState<boolean>(false)
    // the realtime search suggestion's string list
    const [searchSuggestions, setSearchSuggestions] = useState<Array<string>>(
        [],
    )
    // this variable denotes wheather there are search suggestions found or not, after doing the api request
    const [noSearchSuggestionsFound, setNoSearchSuggestionsFound] =
        useState<boolean>(false)

    /**
     * this method updates both the variable @searchInputValue and @showSearchSuggestions
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
        setSearchInputValue(value)

        /**
         * if value string is valid then only show suggestions
         * else not
         *
         * that's why we are checking for it and then setting it to the @showSearchSuggestions value
         */
        setShowSearchSuggestions(showSuggestions ? value.length > 0 : false)
    }

    /**
     * this function clears all the search parameters
     * and sets every thing to default as to say nothing is being searched...
     */
    const cancelSearch = () => {
        updateSearchTextInputValue('', false)
        setSearchSuggestions([]) // clearing search suggestions list
        setNoSearchSuggestionsFound(false) // clearing could not found search suggestions data
        Keyboard.dismiss() // and also dismiss the keyboard so the it does not annoy the user #UX
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
                     * else set suggestions could not be found to be true
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

                        setSearchSuggestions(finalSearchSuggestions)
                        setNoSearchSuggestionsFound(false)
                    } else {
                        setNoSearchSuggestionsFound(true)
                    }
                })
                .catch(_ERR => {
                    /**
                     * when any error occurs set the value of the suggestions could not be found to true
                     */
                    setNoSearchSuggestionsFound(true)
                })
        }
    }
    useEffect(() => {
        udpateSearchSuggestions(searchInputValue)
    }, [searchInputValue])

    /**
     * this method updates search history in the local as well as in the current component's state
     */
    function getSearchHistory() {
        AsyncStorage.getItem(SEARCH_HISTORY_STORAGE_KEY).then(
            (res: string | any) => {
                if (res) {
                    // if any such search query is saved then update state
                    // after re-checking its and array or not
                    const histories: string[] = JSON.parse(res)
                    if (Array.isArray(histories)) setSearchHistory(histories)
                }
            },
        )
    }
    /**
     * this method adds new search history to the local storage
     **/
    function addNewSearchHistory(query: string = '') {
        if (query.length <= 0) return
        // since we are not saving more than 10 queries locally.
        // because it is not neccessary to show all the queries only 5 to 10 are sufficient...
        let whatToSave: string[] = []

        // since the search history limit is 15
        if (searchHistory.length > 15) whatToSave = searchHistory.slice(0, 15)
        else whatToSave = searchHistory

        whatToSave.push(query.toLowerCase())

        const finalSavingData: string[] = [...new Set(whatToSave)] // trimming duplicate data
        // finally saving all the queries...
        AsyncStorage.setItem(
            SEARCH_HISTORY_STORAGE_KEY,
            JSON.stringify(finalSavingData),
        )
        setSearchHistory(finalSavingData)
    }
    /**
     * delete all the search histories
     * in the local storage
     */
    function clearSearchHistory() {
        AsyncStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, '[]')
        setSearchHistory([])

        // also clears all the search parameters, so that there are no confusions in the UI
        cancelSearch()
    }
    useEffect(() => {
        getSearchHistory()
    }, [])

    /**
     * this method performs the search operation
     * this method searches tracks, artists, albums and playlists...
     *
     * this method will also update the @searchInputValue value if a true is passed to @param updateActualInputValue
     * this will be useful when the query is pressed from the search suggestion list,
     * since they can differ from the actual value
     *
     * @param {string} query a query to search
     * @param {boolean} updateActualInputValue if to update the @searchInputValue
     */
    const performSearch = (
        query: string = searchInputValue,
        updateActualInputValue: boolean = false,
    ) => {
        if (updateActualInputValue) updateSearchTextInputValue(query, false)
        // if the suggestions are found then search for the songs
        // else return
        if (noSearchSuggestionsFound) return

        // adding the query to search history
        addNewSearchHistory(query)

        //         search(query, 'SONG')
        //             .then(data => {
        //             })
        //             .catch(_ERR => {})
        //         search(query, 'PLAYLIST')
        //             .then(data => {
        //             })
        //             .catch(_ERR => {})
        //         search(query, 'ALBUM')
        //             .then(data => {
        //             })
        //             .catch(_ERR => {})
        //         search(query, 'ARTIST')
        //             .then(data => {
        //             })
        //             .catch(_ERR => {})
        //
        //         search(query, 'VIDEO')
        //             .then(data => {
        //             })
        //             .catch(_ERR => {})
    }

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
     * this function launches a tab where the queryString which is a genre
     * will be searched and will be displayed
     */
    const openGenreSearchTab = (queryString: string) => {}

    return (
        <View style={[layouts.fill]}>
            <SearchInputHeader
                textInputProps={{
                    value: searchInputValue,
                    onChangeText: (changedSearchValue: string) =>
                        updateSearchTextInputValue(changedSearchValue),
                    onSubmitEditing: () => performSearch(),
                }}
                onClearSearchInput={() => updateSearchTextInputValue('')}
                showBackButton={searchInputValue.length > 0}
                onBackButtonPress={cancelSearch}
            />
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[{position: 'relative'}]}
                    contentContainerStyle={[
                        {
                            paddingBottom:
                                variables.metrics.massive +
                                variables.metrics.huge,
                        },
                    ]}>
                    {/* The actual search history list */}
                    <SearchHistoryRenderer
                        searchHistoryList={searchHistory}
                        title="Search History"
                        onPressHistoryText={searchQuery =>
                            performSearch(searchQuery, true)
                        }
                        showDeleteSearchHistoryButton
                        onPressOnDeleteSearchHistoryButton={clearSearchHistory}
                    />

                    {/* this is the search suggestions we are providing to the user */}
                    <SearchHistoryRenderer
                        searchHistoryList={AppSearchSuggestions}
                        title="Suggested Searches"
                        onPressHistoryText={searchQuery =>
                            performSearch(searchQuery, true)
                        }
                    />

                    {/* list of genres */}
                    <SearchGenreListRenderer
                        title={'Popular Genres'}
                        genreList={GenreList}
                        onPressGenreCard={searchQuery =>
                            openGenreSearchTab(searchQuery)
                        }
                    />

                    {/* list of langauges */}
                    <SearchGenreListRenderer
                        title={'Languages'}
                        genreList={LanguagesList}
                        onPressGenreCard={searchQuery =>
                            openGenreSearchTab(searchQuery)
                        }
                    />

                    {/* list of moods */}
                    <SearchGenreListRenderer
                        title={'Moods'}
                        genreList={MoodsList}
                        onPressGenreCard={searchQuery =>
                            openGenreSearchTab(searchQuery)
                        }
                    />

                    {/* list of albums */}
                    <SearchGenreListRenderer
                        title={'Anytime'}
                        genreList={MusicTimesList}
                        onPressGenreCard={searchQuery =>
                            openGenreSearchTab(searchQuery)
                        }
                    />

                    {/* list of extra categories */}
                    <SearchGenreListRenderer
                        title={'Browse All'}
                        genreList={ExtraMusicTypesList}
                        onPressGenreCard={searchQuery =>
                            openGenreSearchTab(searchQuery)
                        }
                    />
                </ScrollView>

                {showSearchSuggestions ? (
                    <View
                        style={[
                            layouts.fill,
                            {
                                position: 'absolute',
                                width: '100%',
                                minHeight: SCREEN_HEIGHT,
                            },
                        ]}>
                        <SearchSuggestionsRenderer
                            suggestions={searchSuggestions}
                            isNoSearchSuggestionsFound={
                                noSearchSuggestionsFound
                            }
                            searchQuery={searchInputValue}
                            onQueryPressed={query => performSearch(query, true)}
                        />
                    </View>
                ) : null}
            </View>
        </View>
    )
}
