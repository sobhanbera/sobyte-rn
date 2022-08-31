/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - the track card component, mainly for explore screen
 */

import React, {useCallback} from 'react'
import FastImage from 'react-native-fast-image'

import {useTheme, useTrackPlayer} from '@/hooks'
import {SongObject} from '@/schemas'
import {
    formatArtistsListFromArray,
    formatTitle,
    updateArtworkQuality,
} from '@/utils'
import {DEFAULT_SONG_LIST_TRACK_ARTWORK_MIN_WIDTH} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {View} from 'react-native'

export interface ListCardTrackProps {
    trackData: SongObject
    searchQuery: string // this is needed description to play any song
}
export const ListCardTrack = ({trackData, searchQuery}: ListCardTrackProps) => {
    const {fonts, layouts, gutters} = useTheme()
    const {playTrack} = useTrackPlayer()

    // data to display in the screen like title and image and artist's data
    const trackTitle = formatTitle(trackData.title)
    const trackArtist = formatArtistsListFromArray(trackData.artists)
    const trackArtwork = updateArtworkQuality(trackData.artworks[0])

    /**
     * this method is used to play the track from the songs card data provided from props
     * this method is also capable to provide all the metadata while playing the song
     */
    const playThisTrack = useCallback(() => {
        playTrack(trackData, {
            context: 'explore',
            query: searchQuery,
        })
    }, [searchQuery])

    return (
        <View
            style={[
                layouts.center,
                {justifyContent: 'flex-start'}, // to get all the artwork images in a perfect row
            ]}>
            <TouchableScalable
                onPress={playThisTrack}
                style={[gutters.smallPaddingHorizontal]}>
                <FastImage
                    source={{
                        uri: trackArtwork,
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        borderRadius: 2,
                        width: DEFAULT_SONG_LIST_TRACK_ARTWORK_MIN_WIDTH,
                        height: DEFAULT_SONG_LIST_TRACK_ARTWORK_MIN_WIDTH,
                    }}
                />

                <SobyteTextView
                    style={[
                        fonts.mediumFont,
                        fonts.textRegular,
                        gutters.tinyPaddingVertical,
                        {
                            maxWidth: DEFAULT_SONG_LIST_TRACK_ARTWORK_MIN_WIDTH,
                        },
                    ]}
                    numberOfLines={2}>
                    {trackTitle}
                </SobyteTextView>

                <SobyteTextView
                    style={[
                        fonts.textTiny,
                        {
                            maxWidth: DEFAULT_SONG_LIST_TRACK_ARTWORK_MIN_WIDTH,
                        },
                    ]}
                    numberOfLines={2}
                    subTitle>
                    {trackArtist}
                </SobyteTextView>
            </TouchableScalable>
        </View>
    )
}
