/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component renders list of tracks in horizontal fashion
 */

import React from 'react'
import {ScrollView} from 'react-native'

import {SongObject} from '@/schemas'
import {useTheme} from '@/hooks'
import {NothingArray} from '@/configs'

import {ListCardTrack} from './ListCardTrack'
import {ShimmerListCardTrack} from './ShimmerListCardTrack'

export interface ListCardRendererTracksProps {
    tracksList: Array<SongObject>
    searchQuery: string
}
export const ListCardRendererTracks = ({
    tracksList,
    searchQuery,
}: ListCardRendererTracksProps) => {
    const {gutters} = useTheme()

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[gutters.smallPaddingBottom]} // to provide some space between datas
            contentContainerStyle={[gutters.tinyPaddingHorizontal]} // since every child component has some horizontal padding, so to make it even on both side. this is the style for that
        >
            {/* if the track list is empty, then show shimmer */}
            {tracksList.length > 0
                ? tracksList.map((track, index) => {
                      return (
                          <ListCardTrack
                              searchQuery={searchQuery}
                              trackData={track}
                              key={`${track.musicId}-${index}`}
                          />
                      )
                  })
                : NothingArray.map(nothingShimmer => {
                      return <ShimmerListCardTrack key={nothingShimmer.id} />
                  })}
        </ScrollView>
    )
}
