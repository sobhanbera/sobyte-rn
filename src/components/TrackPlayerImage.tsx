/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - music player track's image renderer
 */

import React from 'react'
import {Animated} from 'react-native'
import FastImage from 'react-native-fast-image'

import {SongObject} from '@/schemas'
import {
    DEFAULT_PLAYER_ARTWORK_QUALITY,
    DEFAULT_PLAYER_ARTWORK_SIZE,
    SCREEN_WIDTH,
    TRACK_ARTWORK_PARENT_VERTICAL_PADDING,
    TRACK_ARTWORK_WIDTH,
} from '@/configs'
import {updateArtworkQuality} from '@/utils'

export interface PlayerTrackImageProps {
    trackData: SongObject
    index: number
    scrollXAnimated: Animated.Value
}
export function PlayerTrackImage({
    trackData,
    index,
    scrollXAnimated,
}: PlayerTrackImageProps) {
    // input range depending on the index of the track
    const inputRange = [index - 2, index - 1, index, index + 1, index + 2]

    /**
     * ok so there are three items that could be
     *
     * the current item will have a opacity of 1 else all will have opacity equals 0
     */
    const opacity = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [0, 0, 1, 0, 0],
        // outputRange: [1 - 1 / NUMBER_OF_VISIBLE_PLAYER_TRACKS, 1, 0],
    })

    /**
     * as the index of the component increase due to animation
     * with respect to the current track, the scale decreases
     */
    const scale = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [0, 0.5, 1, 0.5, 0],
    })

    /**
     * X position of the component works somewhat tricky.
     * the current track will be at 0 with respect to the actual position
     * previous track will be at -100 and next track will be at 100
     *
     * and now previous to previous and next to next will be back to 0 postiion
     *
     * this is how we can show the sliding left/right animation along with not changing the position at all
     * in this way the scroll length will not increase too
     * and we will have a smooth animation without any overlay animation
     */
    const translateX = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [0, SCREEN_WIDTH, 0, -SCREEN_WIDTH, 0],
    })

    // a high quality image which will be rendered as the main image
    const highQualityArtwork = updateArtworkQuality(trackData.artworks[0])

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: -TRACK_ARTWORK_WIDTH / 2,
                opacity,
                transform: [{scale}, {translateX}],
                marginVertical: TRACK_ARTWORK_PARENT_VERTICAL_PADDING,
            }}>
            <FastImage
                source={{
                    uri: highQualityArtwork,
                    cache: FastImage.cacheControl.immutable,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                    borderRadius: 2,
                    width: TRACK_ARTWORK_WIDTH,
                    height: TRACK_ARTWORK_WIDTH,
                }}
            />
        </Animated.View>
    )
}
