/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this main component inside list of songs renderer (imp - vertical scrollview only)
 */

import React from 'react'
import {View} from 'react-native'
import FastImage from 'react-native-fast-image'

import {useTheme} from '@/hooks'
import {SongObject} from '@/schemas'
import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
    NEXT_TITLE_COLOR_ALPHA,
} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {SobyteIcon} from './SobyteIcon'

export interface ListObjectSongProps {
    songData: SongObject
}
export const ListObjectSong = ({songData}: ListObjectSongProps) => {
    const {theme, fonts, layouts, gutters} = useTheme()

    // data to display in the screen like title,artist and image
    const trackTitle = formatTrackTitle(songData.title)
    const trackArtist = formatArtistsListFromArray(songData.artists)

    /**
     * since there are no tracks which doesnot contains 2 types of sizes of artworks
     * all of them instead
     *
     * so if any track contains only one artwork, that means the tracks data has not beed loaded yet
     * and the songData passed is the currentTrack from reducer, the currently playing section of the queue
     */
    if (songData.artworks.length === 1) return null

    return (
        <TouchableScalable
            onPress={() => {}}
            style={[
                layouts.row,
                layouts.justifyContentBetween,
                layouts.alignItemsCenter,

                gutters.tinyMarginVertical,
                gutters.extraTinyPaddingVertical, // this gives an extra spacing vertically
                gutters.regularPaddingHorizontal,
            ]}>
            <FastImage
                source={{
                    uri: songData.artworks[0].url,
                    cache: FastImage.cacheControl.immutable,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                    borderRadius: 2,
                    width: DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
                    height: DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
                }}
            />

            <View
                style={[
                    layouts.fill,
                    layouts.justifyContentCenter,
                    gutters.regularPaddingHorizontal,
                ]}>
                <SobyteTextView
                    style={[
                        fonts.mediumFont,
                        fonts.textRegular,
                        gutters.extraTinyPaddingVertical,
                    ]}
                    numberOfLines={1}>
                    {trackTitle}
                </SobyteTextView>

                <SobyteTextView
                    style={[gutters.extraTinyPaddingVertical]}
                    subTitle
                    numberOfLines={1}>
                    {trackArtist}
                </SobyteTextView>
            </View>

            <TouchableScalable
                onPress={() => {}}
                style={[
                    gutters.tinyMarginLeft, // since this is the last component horizontally
                    gutters.smallPadding,
                ]}>
                <SobyteIcon
                    IconType="AntDesign"
                    name="ellipsis1"
                    size={DEFAULT_ICON_SIZE - 2}
                    color={theme.themecolorrevert + NEXT_TITLE_COLOR_ALPHA}
                    rotate={90}
                />
            </TouchableScalable>
        </TouchableScalable>
    )
}
