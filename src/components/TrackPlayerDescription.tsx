/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - track's name, title, artists, like button, comment etc....
 */

import {View, Text} from 'react-native'
import React from 'react'

import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {SongObject} from '@/schemas'
import {SCREEN_WIDTH, TRACK_ARTWORK_SPACING} from '@/configs'
import {useTheme} from '@/hooks'

type TrackPlayerDescriptionProps = {
    track: SongObject
    index: number
}
export const TrackPlayerDescription = ({
    track,
    index,
}: TrackPlayerDescriptionProps) => {
    const {fonts} = useTheme()

    const formattedArtist = formatArtistsListFromArray(track.artist)
    const formattedTitle = formatTrackTitle(track.title)

    return (
        <View
            key={index}
            style={{
                width: SCREEN_WIDTH, // very imp
                padding: TRACK_ARTWORK_SPACING * 2,
            }}>
            <Text style={[fonts.titleSmall]} numberOfLines={1}>
                {formattedTitle}
            </Text>
            {track.artist.length > 0 && (
                <Text style={[fonts.textSmall]}>{formattedArtist}</Text>
            )}
        </View>
    )
}
