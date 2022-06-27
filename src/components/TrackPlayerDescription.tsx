/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - track's name, title, artists, like button, comment etc....
 */

import {View, Text, StyleSheet} from 'react-native'
import React from 'react'

import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {SongObject} from '@/schemas'
import {
    SCREEN_WIDTH,
    TRACK_ARTWORK_SPACING,
    TRACK_DATA_OVERFLOW_HEIGHT,
} from '@/configs'

type TrackPlayerDescriptionProps = {
    track: SongObject
    index: number
}
export const TrackPlayerDescription = ({
    track,
    index,
}: TrackPlayerDescriptionProps) => {
    const formattedArtist = formatArtistsListFromArray(track.artist)
    const formattedTitle = formatTrackTitle(track.title)

    return (
        <View key={index} style={styles.trackItemContainer}>
            <Text style={[styles.title]} numberOfLines={1}>
                {formattedTitle}
            </Text>
            {track.artist.length > 0 && (
                <Text style={[styles.location]}>{formattedArtist}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: '900',
    },
    location: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
    },
    trackItemContainer: {
        height: TRACK_DATA_OVERFLOW_HEIGHT,
        padding: TRACK_ARTWORK_SPACING * 2,
        width: SCREEN_WIDTH,
    },
})
