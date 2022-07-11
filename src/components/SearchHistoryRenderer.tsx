/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - a list of genre
 */

import React from 'react'
import {View} from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import {useTheme} from '@/hooks'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {TINY_ICON_SIZE} from '@/configs'

export interface SearchHistoryRendererProps {
    title: string
    searchHistoryList: string[]
    onPressHistoryText(searchQuery: string): void

    /**
     * a boolean value to control if to show the delete button of search hisotries
     *
     * defalut to false, since we are also rendering some search suggestions
     * and we don't want to delete them, because they could not be deleted, HAHA
     */
    showDeleteSearchHistoryButton?: boolean
    onPressOnDeleteSearchHistoryButton?(): void
}
export function SearchHistoryRenderer({
    title,
    searchHistoryList,
    onPressHistoryText,

    showDeleteSearchHistoryButton = false,
    onPressOnDeleteSearchHistoryButton = () => {},
}: SearchHistoryRendererProps) {
    const {gutters, layouts, theme, variables, fonts} = useTheme()

    /**
     * if there are no search histories list provided
     * or else the length of history list is 0
     * then render nothing
     */
    if (searchHistoryList.length <= 0) return null

    return (
        <View style={[]}>
            <View
                style={[
                    layouts.row,
                    layouts.alignItemsCenter,
                    layouts.justifyContentBetween,
                    gutters.regularMarginTop,
                    gutters.tinyMarginBottom,
                ]}>
                <SobyteTextView
                    style={[
                        fonts.titleTiny,
                        gutters.smallPadding,
                        {
                            color: theme.themecolorrevert,
                        },
                    ]}>
                    {title}
                </SobyteTextView>

                {showDeleteSearchHistoryButton ? (
                    <EvilIcons
                        name={'trash'}
                        size={TINY_ICON_SIZE}
                        color={theme.themecolorrevert}
                        style={[
                            gutters.regularMarginRight,
                            gutters.tinyPadding,
                        ]}
                        onPress={onPressOnDeleteSearchHistoryButton}
                    />
                ) : null}
            </View>

            <View
                style={[
                    layouts.row,
                    layouts.alignItemsCenter,
                    layouts.alignItemsStart,
                    {flexWrap: 'wrap'},
                ]}>
                {searchHistoryList.map((history, index) => {
                    return (
                        <TouchableScalable
                            key={`${history}-${index}`}
                            onPress={() => onPressHistoryText(history)}
                            style={[
                                layouts.row,
                                layouts.justifyContentBetween,
                                gutters.tinyPaddingVertical,
                                gutters.regularPaddingHorizontal,
                                gutters.tinyMargin,
                                {
                                    borderRadius: variables.metrics.huge,
                                    backgroundColor: theme.surfacelight,
                                },
                            ]}>
                            <SobyteTextView
                                style={[
                                    fonts.textRegular,
                                    fonts.lightFont,
                                    {color: variables.colors.white},
                                ]}>
                                {history}
                            </SobyteTextView>
                        </TouchableScalable>
                    )
                })}
            </View>
        </View>
    )
}
