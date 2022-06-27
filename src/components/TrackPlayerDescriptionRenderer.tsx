/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - responsible to render the actual list of track player's descriptions
 */

import React from 'react'
import {View, Animated, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'

import {SobyteState} from '@/state'
import {SCREEN_WIDTH, TRACK_DATA_OVERFLOW_HEIGHT} from '@/configs'
import {TrackPlayerDescription} from './TrackPlayerDescription'

interface TrackPlayerDescriptionRendererProps {
    scrollXAnimated: Animated.Value
}
export function TrackPlayerDescriptionRenderer({
    scrollXAnimated,
}: TrackPlayerDescriptionRendererProps) {
    const {tracks} = useSelector((state: SobyteState) => state.playerdata)

    const inputRange = [-1, 0, 1]
    const translateX = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
    })

    return (
        <View style={styles.trackPlayerDescriptionContainer}>
            <Animated.View
                style={{transform: [{translateX}], flexDirection: 'row'}}>
                {tracks.map((track, index) => {
                    return (
                        <TrackPlayerDescription
                            key={index}
                            track={track}
                            index={index}
                        />
                    )
                })}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    trackPlayerDescriptionContainer: {
        height: TRACK_DATA_OVERFLOW_HEIGHT,
        overflow: 'hidden',
        width: SCREEN_WIDTH,
    },
})
