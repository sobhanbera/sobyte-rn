/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - shimmer component for ListCardPlaylist component
 */

import React from 'react'
import {View} from 'react-native'
import {Skeleton} from '@rneui/themed'

import {useTheme} from '@/hooks'
import {
    DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
    DEFAULT_SUB_TITLE_WIDTH,
    DEFAULT_TITLE_WIDTH,
} from '@/configs'

export interface ShimmerListCardPlaylistProps {}
export const ShimmerListCardPlaylist = ({}: ShimmerListCardPlaylistProps) => {
    const {layouts, gutters} = useTheme()

    return (
        <View style={[layouts.center]}>
            <View style={[gutters.smallPaddingHorizontal]}>
                <Skeleton
                    animation="wave"
                    circle={false}
                    width={DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH}
                    height={DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH}
                    style={[gutters.tinyMarginBottom]}
                />

                <Skeleton
                    animation="wave"
                    circle={false}
                    width={DEFAULT_TITLE_WIDTH / 2}
                    height={18}
                    style={[gutters.tinyMarginTop]}
                />

                <Skeleton
                    animation="wave"
                    circle={false}
                    width={DEFAULT_SUB_TITLE_WIDTH / 2}
                    height={18}
                    style={[gutters.tinyMarginTop]}
                />
            </View>
        </View>
    )
}
