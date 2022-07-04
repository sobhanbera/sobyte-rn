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
import IoniconIcon from 'react-native-vector-icons/Ionicons'

import {useTheme} from '@/hooks'
import {SobyteTextView} from '.'
import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    NEXT_TITLE_COLOR_ALPHA,
    SMALL_ICON_SIZE,
} from '@/configs'

export interface TrackPlayerQueueTrackProps {
    trackData: SongObject
    onQueueTrackSelected(): void
    containerStyle?: StyleProp<ViewStyle>

    draggable?: boolean
    onDrag?: () => void
}
export const TrackPlayerQueueTrack = ({
    trackData,
    onQueueTrackSelected,
    containerStyle,

    draggable = false,
    onDrag,
}: TrackPlayerQueueTrackProps) => {
    const {theme, gutters, fonts, layouts} = useTheme()

    // data to display in the screen like title,artist and image
    const formattedTitle = formatTrackTitle(trackData.title)
    const formattedArtists = formatArtistsListFromArray(trackData.artists)

    /**
     * since there are no tracks which doesnot contains 2 types of sizes of artworks
     * all of them instead
     *
     * so if any track contains only one artwork, that means the tracks data has not beed loaded yet
     * and the TrackData passed is the currentTrack from reducer, the currently playing section of the queue
     */
    if (trackData.artworks.length === 1) return null

    return (
        <TouchableOpacity
            onPress={onQueueTrackSelected}
            activeOpacity={DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY}
            style={[
                layouts.row,
                layouts.justifyContentBetween,
                gutters.mediumPaddingHorizontal,
                gutters.tinyMarginVertical,
                containerStyle, // extra styles
            ]}>
            {/* queue track artwork */}
            <FastImage
                source={{
                    uri: trackData.artworks[0].url,
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

            <View
                style={[
                    layouts.column,
                    layouts.fill,
                    gutters.regularPaddingHorizontal,
                ]}>
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

            {draggable && onDrag ? (
                <TouchableOpacity
                    onPressIn={onDrag}
                    style={[layouts.center, gutters.smallPaddingHorizontal]}>
                    <IoniconIcon
                        name="ios-reorder-two-outline"
                        size={SMALL_ICON_SIZE}
                    />
                </TouchableOpacity>
            ) : null}
        </TouchableOpacity>
    )
}
