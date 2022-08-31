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
    NEXT_TITLE_COLOR_ALPHA,
    SCREEN_WIDTH,
    TRACK_ARTWORK_HORIZONAL_SPACING,
    TRACK_ARTWORK_SPACING,
} from '@/configs'
import {useTheme} from '@/hooks'
import {SobyteMarquee} from './SobyteMarquee'

interface TrackPlayerDescriptionProps {
    track: SongObject
    index: number
    onShowTrackMenu(): void
}
export const TrackPlayerDescription = ({
    track,
    index,
    onShowTrackMenu,
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
                style={[fonts.titleRegular, gutters.extraTinyMarginBottom]}>
                {formattedTitle}
            </SobyteMarquee>

            <SobyteMarquee
                onPress={onShowTrackMenu}
                style={[
                    fonts.titleSmall,
                    gutters.extraTinyMarginTop,
                    {
                        color: `${theme.themecolorrevert}${NEXT_TITLE_COLOR_ALPHA}`,
                    },
                ]}>
                {formattedArtist}
            </SobyteMarquee>
        </View>
    )
}
