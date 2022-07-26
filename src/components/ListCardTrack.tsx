/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - the track card component, mainly for explore screen
 */

import React from 'react'
import FastImage from 'react-native-fast-image'

import {useTheme} from '@/hooks'
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
    onPressTrack: () => void
}
export const ListCardTrack = ({
    trackData,
    onPressTrack,
}: ListCardTrackProps) => {
    const {fonts, layouts, gutters} = useTheme()

    // data to display in the screen like title and image and artist's data
    const trackTitle = formatTitle(trackData.title)
    const trackArtist = formatArtistsListFromArray(trackData.artists)
    const trackArtwork = updateArtworkQuality(trackData.artworks[0])

    return (
        <View
            style={[
                layouts.center,
                {justifyContent: 'flex-start'}, // to get all the artwork images in a perfect row
            ]}>
            <TouchableScalable
                onPress={onPressTrack}
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
