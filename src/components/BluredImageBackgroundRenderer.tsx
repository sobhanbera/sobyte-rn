/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component is responsible to render list of all blurred image in bg
 */

import React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'

import BluredImageBackground from './BluredImageBackground'
import {SobyteState} from '@/state'

export interface BluredImageBackgroundRendererProps {
    scrollXAnimated: Animated.Value
}
export const BluredImageBackgroundRenderer = ({
    scrollXAnimated,
}: BluredImageBackgroundRendererProps) => {
    const {tracks} = useSelector((state: SobyteState) => state.playerdata)
    // return null

    return (
        <View style={StyleSheet.absoluteFill}>
            {tracks.map((track, index) => {
                return (
                    <BluredImageBackground
                        key={index}
                        artworks={track.artworks}
                        index={index}
                        scrollXAnimated={scrollXAnimated}
                    />
                )
            })}
        </View>
    )
}
