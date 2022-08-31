/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this main component inside list of songs renderer (imp - vertical scrollview only)
 */

import React, {useCallback} from 'react'
import {ImageStyle, StyleProp, View} from 'react-native'
import FastImage from 'react-native-fast-image'

import {useTheme, useTrackPlayer} from '@/hooks'
import {ScreenContext, SongObject} from '@/schemas'
import {
    formatArtistsListFromArray,
    formatTrackTitle,
    updateArtworkQuality,
} from '@/utils'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
    NEXT_TITLE_COLOR_ALPHA,
    SCREEN_WIDTH,
} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {SobyteIcon} from './SobyteIcon'

export interface ListObjectSongProps {
    songData: SongObject
    searchQuery: string // this is needed description to play any song

    // any extra style if there to provide to the image component/artwork image
    artworkStyle?: StyleProp<ImageStyle>

    screenContext?: ScreenContext // in which screen this song is rendered
}
export const ListObjectSong = ({
    songData,
    searchQuery,
    artworkStyle,

    // default value is search
    screenContext = 'search',
}: ListObjectSongProps) => {
    const {theme, fonts, layouts, gutters} = useTheme()
    const {playTrack} = useTrackPlayer()

    // data to display in the screen like title,artist and image
    const trackTitle = formatTrackTitle(songData.title)
    const trackArtist = formatArtistsListFromArray(songData.artists)
    const trackArtwork = updateArtworkQuality(songData.artworks[0])

    /**
     * this method is used to play the track from the songs results
     * this method is also capable to provide all the metadata while playing the song
     */
    const playThisTrack = useCallback(() => {
        playTrack(songData, {
            context: screenContext || 'search',
            query: searchQuery,
        })
    }, [searchQuery])

    /**
     * since there are no tracks which doesnot contains 2 types of sizes of artworks
     * all of them instead
     *
     * so if any track contains only one artwork, that means the tracks data has not beed loaded yet
     * and the songData passed is the currentTrack from reducer, the currently playing section of the queue
     */
    if (songData.artworks.length <= 0) return null

    return (
        <TouchableScalable
            containerStyle={{width: SCREEN_WIDTH}}
            onPress={playThisTrack}
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
                    uri: trackArtwork,
                    cache: FastImage.cacheControl.immutable,
                    priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={[
                    {
                        borderRadius: 2,
                        width: DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
                        height: DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
                    },
                    artworkStyle,
                ]}
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
