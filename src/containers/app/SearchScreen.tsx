/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this screen renders search history, genres, etc. and also is a path to the actual search screen..
 */

import React, {useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

import {useTheme} from '@/hooks'
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
    SEARCH_HISTORY_STORAGE_KEY,
    AppSearchSuggestions,
    ACTUAL_SEARCH_SCREEN,
} from '@/configs'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface SearchScreenProps {
    navigation: NavigationHelpers<any>
}
export function SearchScreen({navigation}: SearchScreenProps) {
    const {layouts, variables} = useTheme()

    // list of search queries which were done successfully recently
    const [searchHistory, setSearchHistory] = useState<string[]>([])

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
        AsyncStorage.getItem(SEARCH_HISTORY_STORAGE_KEY).then(
            (res: string | any) => {
                if (res) {
                    // if any such search query is saved then update state
                    // after re-checking its and array or not
                    const histories: string[] = JSON.parse(res)
                    if (Array.isArray(histories)) setSearchHistory(histories)

                    if (query.length <= 0) return
                    // since we are not saving more than 10 queries locally.
                    // because it is not neccessary to show all the queries only 5 to 10 are sufficient...
                    let whatToSave: string[] = []

                    // since the search history limit is 15
                    if (searchHistory.length > 15)
                        whatToSave = searchHistory.slice(0, 15)
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
            },
        )
    }
    /**
     * delete all the search histories
     * in the local storage
     */
    function clearSearchHistory() {
        AsyncStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, '[]')
        setSearchHistory([])
    }
    useEffect(() => {
        getSearchHistory() // getting all the search history from local storage
    }, [])

    /**
     * this function launches a tab where the queryString will be searched in actual
     * and the songs, artists, albums, playlists will be displayed...
     */
    const openActualSearchTab = (queryString: string = '') => {
        navigation.navigate(ACTUAL_SEARCH_SCREEN, {
            searchQuery: queryString,
            addNewSearchHistory: addNewSearchHistory,
        })
    }

    /**
     * this function launches a tab where the queryString which is a genre
     * will be searched and will be displayed
     */
    const openGenreSearchTab = (_queryString: string) => {}

    return (
        <View style={[layouts.fill]}>
            <ScrollView
                stickyHeaderIndices={[0]} // this prop makes first the search header title as sticky then the search text input bar
                showsVerticalScrollIndicator={false}
                style={[{position: 'relative'}]}
                contentContainerStyle={[
                    {
                        paddingBottom:
                            variables.metrics.massive + variables.metrics.huge,
                    },
                ]}>
                {/* the sticky header, this text input is a way to open the actual search tab */}
                <SearchInputHeader
                    textInputProps={{
                        value: '',
                        focusable: true,
                        onFocus: () => openActualSearchTab(), // opens the actual search tab when user wants to search anything and the user taps on search field
                        showSoftInputOnFocus: false, // we don't want to show keyboard for this input
                        // clearTextOnFocus: true, // we don't want to enter text in this input (OPTIONAL, since the showSoftInputOnFocus: false will prevent the keyboard to open)
                    }}
                />

                {/* The actual search history list */}
                <SearchHistoryRenderer
                    searchHistoryList={searchHistory}
                    title="Search History"
                    onPressHistoryText={searchQuery =>
                        openActualSearchTab(searchQuery)
                    }
                    showDeleteSearchHistoryButton
                    onPressOnDeleteSearchHistoryButton={clearSearchHistory}
                />

                {/* this is the search suggestions we are providing to the user */}
                <SearchHistoryRenderer
                    searchHistoryList={AppSearchSuggestions}
                    title="Suggested Searches"
                    onPressHistoryText={searchQuery =>
                        openActualSearchTab(searchQuery)
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
        </View>
    )
}
