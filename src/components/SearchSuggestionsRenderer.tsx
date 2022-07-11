/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - search suggestion's list renderer..
 */

import {
    FlatList,
    ListRenderItemInfo,
    TouchableOpacity,
    View,
} from 'react-native'
import React, {useCallback} from 'react'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

import {useTheme} from '@/hooks'
import {
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    SMALL_ICON_SIZE,
} from '@/configs'
import {SobyteTextView} from './SobyteTextView'

type SearchSuggestionsRendererProps = {
    suggestions: string[]
    searchQuery: string // the search query
    searchSuggestionsFound: boolean // if any search suggestions are found and could be displayed
    onQueryPressed(query: string): void // this method will be executed when a query item component is being pressed
}
export function SearchSuggestionsRenderer({
    suggestions,
    searchSuggestionsFound,
    searchQuery,
    onQueryPressed,
}: SearchSuggestionsRendererProps) {
    const {gutters, layouts, fonts, variables, theme} = useTheme()

    const renderSearchSuggestionItem = useCallback(
        (itemDetails: ListRenderItemInfo<string>) => {
            const {item} = itemDetails

            return (
                <TouchableOpacity
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }
                    style={[
                        layouts.row,
                        layouts.alignItemsCenter,
                        gutters.extraTinyPaddingVertical,
                        gutters.extraTinyMarginVertical,
                    ]}
                    onPress={() => onQueryPressed(item)}>
                    <>
                        <EvilIcon
                            name={'search'}
                            size={SMALL_ICON_SIZE}
                            color={theme.themecolorrevert}
                            style={{
                                padding: variables.metrics.small,
                            }}
                        />
                        <SobyteTextView
                            style={[
                                fonts.textMedium,
                                layouts.fill,
                                gutters.smallPadding,
                            ]}
                            numberOfLines={1}>
                            {item}
                        </SobyteTextView>
                    </>
                </TouchableOpacity>
            )
        },
        [],
    )
    // key extractor for each item of the UI...
    const keyExtractor = useCallback(
        (item: string, index: number) => `${item}-${index}`,
        [],
    )

    /**
     * if no search suggestions could be rendered
     * render a propmpt text
     *
     * which say we could not found suggestions for the query
     */
    if (!searchSuggestionsFound)
        return (
            <View style={[layouts.fullHeight, layouts.center]}>
                <SobyteTextView
                    style={[
                        gutters.smallPaddingVertical,
                        gutters.regularPaddingHorizontal,
                        fonts.textMedium,
                        fonts.mediumFont,
                        fonts.textCenter,
                    ]}>
                    {`Could not find results for "${searchQuery}"`}
                </SobyteTextView>

                <SobyteTextView style={[gutters.smallPaddingVertical]}>
                    {`Please try again with another query!`}
                </SobyteTextView>
            </View>
        )

    return (
        <FlatList
            data={suggestions}
            renderItem={renderSearchSuggestionItem}
            keyExtractor={keyExtractor}
            style={[
                {
                    backgroundColor: theme.surface,
                },
            ]}
        />
    )
}
