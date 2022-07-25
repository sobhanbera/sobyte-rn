/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component is the shimmer for the ListObjectSongs component with exactly the same aspects.
 */

import React from 'react'
import {View} from 'react-native'

import {useTheme} from '@/hooks'
import {
    DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
    DEFAULT_SUB_TITLE_WIDTH,
    DEFAULT_TITLE_WIDTH,
    SCREEN_WIDTH,
} from '@/configs'

import {Skeleton} from '@rneui/themed'

export interface ShimmerListObjectSongProps {
    // any extra style if there to provide to the image component/artwork image
    customArtworkSize?: number
}
export const ShimmerListObjectSong = ({customArtworkSize}: ShimmerListObjectSongProps) => {
    const {layouts, gutters} = useTheme()

    return (
        <View
            style={[
                layouts.row,
                layouts.justifyContentBetween,
                layouts.alignItemsCenter,

                gutters.tinyMarginVertical,
                gutters.extraTinyPaddingVertical, // this gives an extra spacing vertically
                gutters.regularPaddingHorizontal,
                {width: SCREEN_WIDTH},
            ]}>
            <Skeleton
                animation="wave"
                circle={false}
                width={customArtworkSize || DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH} // this will be somewhat larger then the next one
                height={customArtworkSize || DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH} // this and below text's height combines to make the total height of the text description, almost!
                style={[gutters.extraTinyMarginBottom]} // from TrackPlayerDescription we get this value of the first text
            />

            <View style={[layouts.fill, layouts.justifyContentCenter, gutters.regularPaddingHorizontal]}>
                <Skeleton
                    animation="wave"
                    circle={false}
                    width={DEFAULT_TITLE_WIDTH} // this will be somewhat larger then the next one
                    height={22} // this and below text's height combines to make the total height of the text description, almost!
                    style={[gutters.extraTinyMarginBottom]} // from TrackPlayerDescription we get this value of the first text
                />

                <Skeleton
                    animation="wave"
                    circle={false}
                    width={DEFAULT_SUB_TITLE_WIDTH}
                    height={18} // this and above text's height combines to make the total height of the text description, almost!
                    style={[gutters.extraTinyMarginTop]} // from TrackPlayerDescription we get this value of the 2nd text
                />
            </View>
        </View>
    )
}
