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
import {ImageBackground, View} from 'react-native'

import {useTheme} from '@/hooks'
import {GenreData} from '@/schemas'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {SEARCH_CATEGORY_CARD_HEIGHT} from '@/configs'
import {TitleTextIcon} from './TitleTextIcon'

export interface SearchGenreListRendererProps {
    title: string
    genreList: Array<GenreData>
    onPressGenreCard(searchQuery: string): void
}
export function SearchGenreListRenderer({
    title,
    genreList,
    onPressGenreCard,
}: SearchGenreListRendererProps) {
    const {gutters, layouts, variables, fonts} = useTheme()

    return (
        <View style={[]}>
            <TitleTextIcon>{title}</TitleTextIcon>

            <View
                style={[
                    layouts.row,
                    layouts.alignItemsCenter,
                    layouts.alignItemsStart,
                    gutters.tinyPaddingHorizontal,
                    {flexWrap: 'wrap'},
                ]}>
                {genreList.map((genre, index) => {
                    return (
                        <View
                            key={`${genre.id}-${index}`}
                            style={[
                                gutters.smallPadding,
                                {
                                    width: '50%',
                                    height: SEARCH_CATEGORY_CARD_HEIGHT,
                                },
                            ]}>
                            <TouchableScalable
                                onPress={() =>
                                    onPressGenreCard(genre.searchQuery)
                                }>
                                <ImageBackground
                                    style={[
                                        layouts.center,

                                        {
                                            borderRadius:
                                                variables.metrics.tiny,
                                            overflow: 'hidden',

                                            backgroundColor: genre.color,
                                            height: '100%',
                                        },
                                    ]}
                                    imageStyle={{
                                        opacity: 0.15,
                                    }}
                                    source={genre.artwork}>
                                    <SobyteTextView
                                        style={[
                                            fonts.textMedium,
                                            fonts.mediumFont,
                                            gutters.smallPadding,
                                            {color: variables.colors.white},
                                        ]}>
                                        {genre.title}
                                    </SobyteTextView>
                                </ImageBackground>
                            </TouchableScalable>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}
