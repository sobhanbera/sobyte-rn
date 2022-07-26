/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component renders shimmer for ListCardArtist component
 */

import React from 'react'
import {View} from 'react-native'

import {useTheme} from '@/hooks'
import {
    DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
    DEFAULT_SUB_TITLE_WIDTH,
} from '@/configs'

import {Skeleton} from '@rneui/themed'

export interface ShimmerListCardArtistProps {}
export const ShimmerListCardArtist = ({}: ShimmerListCardArtistProps) => {
    const {gutters, layouts} = useTheme()

    return (
        <View style={[layouts.center]}>
            <View style={[gutters.smallPaddingHorizontal, layouts.center]}>
                <Skeleton
                    animation="wave"
                    circle={true}
                    width={DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH}
                    height={DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH}
                    style={[
                        gutters.tinyMarginBottom,
                        {
                            borderRadius:
                                DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH / 2,
                        },
                    ]}
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
