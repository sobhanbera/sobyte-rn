/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - track's name, title, artists, like button, comment etc....
 */

import React from 'react'
import {View} from 'react-native'

import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {SongObject} from '@/schemas'
import {
    SCREEN_WIDTH,
    TRACK_ARTWORK_HORIZONAL_SPACING,
    TRACK_ARTWORK_SPACING,
} from '@/configs'
import {useTheme} from '@/hooks'
import {SobyteMarquee} from './SobyteMarquee'

type TrackPlayerDescriptionProps = {
    track: SongObject
    index: number
}
export const TrackPlayerDescription = ({
    track,
    index,
}: TrackPlayerDescriptionProps) => {
    const {fonts, gutters, theme} = useTheme()

    const formattedArtist = formatArtistsListFromArray(track.artists)
    const formattedTitle = formatTrackTitle(track.title)

    return (
        <View
            key={index}
            style={{
                width: SCREEN_WIDTH, // very imp
                paddingVertical: TRACK_ARTWORK_SPACING,
                paddingHorizontal: TRACK_ARTWORK_HORIZONAL_SPACING,
            }}>
            <SobyteMarquee
                style={[fonts.titleSmall, gutters.extraTinyMarginBottom]}>
                {formattedTitle}
            </SobyteMarquee>

            <SobyteMarquee
                style={[
                    fonts.titleTiny,
                    gutters.extraTinyMarginTop,
                    {color: `${theme.themecolorrevert}C7`},
                ]}>
                {formattedArtist}
            </SobyteMarquee>
        </View>
    )
}
