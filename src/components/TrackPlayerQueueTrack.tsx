/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render the track component of queue....
 */

import React from 'react'
import {SongObject} from '@/schemas'
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native'
import FastImage from 'react-native-fast-image'

import {useTheme} from '@/hooks'
import {SobyteTextView} from '.'
import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    NEXT_TITLE_COLOR_ALPHA,
} from '@/configs'

export interface TrackPlayerQueueTrackProps {
    trackData: SongObject
    onChangedTrackFromQueue(): void
    containerStyle?: StyleProp<ViewStyle>
}
export const TrackPlayerQueueTrack = ({
    trackData,
    onChangedTrackFromQueue,
    containerStyle,
}: TrackPlayerQueueTrackProps) => {
    const {theme, gutters, fonts, layouts} = useTheme()

    // data to display in the screen like title,artist and image
    const formattedTitle = formatTrackTitle(trackData.title)
    const formattedArtists = formatArtistsListFromArray(trackData.artists)

    return (
        <TouchableOpacity
            onPress={onChangedTrackFromQueue}
            activeOpacity={DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY}
            style={[
                layouts.row,
                gutters.mediumPaddingHorizontal,
                gutters.tinyMarginVertical,
                containerStyle, // extra styles
            ]}>
            {/* queue track artwork */}
            <FastImage
                source={{
                    uri: trackData.artworks[1].url,
                    cache: FastImage.cacheControl.immutable,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                    borderRadius: 2,
                    width: 50,
                    height: 50,
                }}
            />

            <View style={[layouts.column, gutters.regularPaddingHorizontal]}>
                {/* queue track title */}
                <SobyteTextView
                    style={[fonts.titleTiny, fonts.regularFont]}
                    numberOfLines={1}>
                    {formattedTitle}
                </SobyteTextView>

                {/* queue track artists */}
                <SobyteTextView
                    style={[
                        gutters.tinyPaddingVertical,
                        {
                            color:
                                theme.themecolorrevert + NEXT_TITLE_COLOR_ALPHA,
                        },
                    ]}
                    numberOfLines={1}>
                    {formattedArtists}
                </SobyteTextView>
            </View>
        </TouchableOpacity>
    )
}
