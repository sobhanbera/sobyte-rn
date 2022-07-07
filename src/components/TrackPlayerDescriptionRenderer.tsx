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
import {View, Animated} from 'react-native'
import {useSelector} from 'react-redux'

import {SobyteState} from '@/state'
import {SCREEN_WIDTH} from '@/configs'
import {TrackPlayerDescription} from './TrackPlayerDescription'

interface TrackPlayerDescriptionRendererProps {
    scrollXAnimated: Animated.Value
    onShowTrackMenu(): void
}
export function TrackPlayerDescriptionRenderer({
    scrollXAnimated,
    onShowTrackMenu,
}: TrackPlayerDescriptionRendererProps) {
    const {tracks} = useSelector((state: SobyteState) => state.playerdata)

    const inputRange = [-1, 0, 1]
    const translateX = scrollXAnimated.interpolate({
        inputRange,
        outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
    })

    return (
        <View
            style={{
                overflow: 'hidden',
                width: SCREEN_WIDTH,
            }}>
            <Animated.View
                style={{transform: [{translateX}], flexDirection: 'row'}}>
                {tracks.map((track, index) => {
                    return (
                        <TrackPlayerDescription
                            key={index}
                            track={track}
                            index={index}
                            onShowTrackMenu={onShowTrackMenu}
                        />
                    )
                })}
            </Animated.View>
        </View>
    )
}
