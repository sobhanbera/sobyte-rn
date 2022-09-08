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
import {
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
    TouchableWithoutFeedback,
} from 'react-native'
import {SongObject} from '@/schemas'

import {useTheme} from '@/hooks'
import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    NEXT_TITLE_COLOR_ALPHA,
    SMALL_ICON_SIZE,
    TINY_ICON_SIZE,
} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {SobyteIcon} from './SobyteIcon'

export interface TrackPlayerQueueTrackProps {
    trackData: SongObject
    onQueueTrackSelected(): void

    onDrag: () => void

    containerStyle?: StyleProp<ViewStyle>
}
export const TrackPlayerQueueTrack = ({
    trackData,
    onQueueTrackSelected,

    onDrag,

    containerStyle,
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
                layouts.alignItemsCenter,
                gutters.mediumPaddingHorizontal,
                gutters.smallPaddingVertical,
                gutters.tinyMarginVertical,
                containerStyle, // extra styles
            ]}>
            {/* queue track artwork */}
            {/* <FastImage */}
            {/*     source={{ */}
            {/*         uri: trackData.artworks[0].url, */}
            {/*         cache: FastImage.cacheControl.immutable, */}
            {/*         priority: FastImage.priority.normal, */}
            {/*     }} */}
            {/*     resizeMode={FastImage.resizeMode.cover} */}
            {/*     style={{ */}
            {/*         borderRadius: 2, */}
            {/*         width: 50, */}
            {/*         height: 50, */}
            {/*     }} */}
            {/* /> */}

            <TouchableWithoutFeedback
                style={[gutters.smallPadding]}
                onPress={() => {
                    /**
                     * © Sobyte
                     * TODO: this feature is todo for now
                     * this feature will remove the track from the queue
                     * */
                }}>
                <SobyteIcon
                    IconType="EvilIcons"
                    name={'close'}
                    size={TINY_ICON_SIZE - 2}
                    color={theme.themecolorrevert}
                />
            </TouchableWithoutFeedback>

            <View
                style={[
                    layouts.column,
                    layouts.fill,
                    gutters.regularPaddingHorizontal,
                ]}>
                {/* queue track title */}
                <SobyteTextView
                    style={[fonts.textRegular, fonts.regularFont]}
                    numberOfLines={1}>
                    {formattedTitle}
                </SobyteTextView>

                {/* queue track artists */}
                <SobyteTextView
                    style={[
                        // gutters.tinyPaddingVertical,
                        fonts.textSmall,
                        {
                            color:
                                theme.themecolorrevert + NEXT_TITLE_COLOR_ALPHA,
                        },
                    ]}
                    numberOfLines={1}>
                    {formattedArtists}
                </SobyteTextView>
            </View>

            <TouchableOpacity
                onPressIn={onDrag}
                style={[layouts.center, gutters.smallPaddingHorizontal]}>
                <SobyteIcon
                    IconType="Ionicons"
                    name="ios-reorder-two-outline"
                    size={SMALL_ICON_SIZE}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
