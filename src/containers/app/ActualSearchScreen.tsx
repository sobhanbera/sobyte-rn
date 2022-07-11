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
import {NavigationHelpers, RouteProp} from '@react-navigation/native'

import {useMusic, useTheme} from '@/hooks'
import {SearchInputHeader} from '@/components'
import {SCREEN_HEIGHT} from '@/configs'
import {SearchSuggestionsRenderer} from '@/components'

/**
 * the type of data passed through routes
 * when the navigation to this screen was done
 */
export interface ActualSearchScreenRouteParams {
    searchQuery: string // a optional string which could be passed to this screen
    addNewSearchHistory(queryString: string): void // when the user searches we will update the history
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
    const {getSearchSuggestions} = useMusic()
    const {addNewSearchHistory, searchQuery} = route.params

    // the value of the search text input component
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    // if to show the search suggestions list or not
    const [showSearchSuggestions, setShowSearchSuggestions] =
        useState<boolean>(false)
    // the realtime search suggestion's string list
    const [searchSuggestions, setSearchSuggestions] = useState<Array<string>>(
        [],
    )
    // this variable denotes wheather there are search suggestions found or not, after doing the api request
    const [searchSuggestionsFound, setSearchSuggestionsFound] =
        useState<boolean>(false)

    /**
     * we are not making a seperate redux store to save the search results
     * because if we do so, we have to do it for all the screens which searches and displays results
     *
     * and it we did this, we have to overwrite the state and it will cause to display same data in different screens
     * and also we would like to get separate data for every screen, Right!
     */
    const [loading, setLoading] = useState()

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

                        setSearchSuggestions(finalSearchSuggestions)
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
        udpateSearchSuggestions(searchInputValue)
    }, [searchInputValue])

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
     * this method will also update the @searchInputValue value if a true is passed to @param updateActualInputValue
     * this will be useful when the query is pressed from the search suggestion list,
     * since they can differ from the actual value
     *
     * @param {string} query a query to search
     * @param {boolean} updateActualInputValue if to update the @searchInputValue
     */
    function performSearch(
        query: string = searchInputValue,
        updateActualInputValue: boolean = false,
    ) {
        if (updateActualInputValue) updateSearchTextInputValue(query, false)
        /**
         * if the suggestions are found then search for the songs
         * else return from this method
         */
        if (searchSuggestionsFound) return

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

    return (
        <View style={[layouts.fill]}>
            {/* the search input field */}
            <SearchInputHeader
                textInputProps={{
                    value: searchInputValue,
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
                showBackButton={searchInputValue.length > 0}
                onBackButtonPress={onHeaderBackButtonPressed}
            />

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={[{position: 'relative'}]}
                contentContainerStyle={[
                    {
                        paddingBottom:
                            variables.metrics.massive + variables.metrics.huge,
                    },
                ]}></ScrollView>

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
                        searchQuery={searchInputValue}
                        onQueryPressed={query => performSearch(query, true)}
                    />
                </View>
            ) : null}
        </View>
    )
}
