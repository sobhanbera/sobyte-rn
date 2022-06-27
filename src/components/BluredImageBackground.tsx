/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render full screen blurred image in background
 */

import React from 'react'
import {StyleSheet, Animated} from 'react-native'

import {MUSIC_PLAYER_BLUR} from '@/configs'
import {ArtworkObject} from '@/schemas'

export interface BluredImageBackgroundProps {
    artworks: Array<ArtworkObject>
    scrollXAnimated: Animated.Value
    index: number
}
export function BluredImageBackground({
    artworks,
    index,
    scrollXAnimated,
}: BluredImageBackgroundProps) {
    const inputRange = [index - 1, index, index + 1]
    const opacity = scrollXAnimated.interpolate({
        inputRange: inputRange,
        outputRange: [0, 1, 0],
    })

    return (
        <Animated.Image
            style={[
                StyleSheet.absoluteFillObject,
                {
                    opacity: opacity,
                },
            ]}
            source={{
                uri: artworks[1].url,
            }}
            blurRadius={MUSIC_PLAYER_BLUR}
        />
    )
}

export default BluredImageBackground
