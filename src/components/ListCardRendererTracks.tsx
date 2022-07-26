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
    onPressTrackCard(trackData: SongObject): void
}
export const ListCardRendererTracks = ({
    tracksList,
    onPressTrackCard,
}: ListCardRendererTracksProps) => {
    const {gutters} = useTheme()

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[gutters.tinyPaddingHorizontal]} // since every child component has some horizontal padding, so to make it even on both side. this is the style for that
        >
            {/* if the track list is empty, then show shimmer */}
            {tracksList.length > 0
                ? tracksList.map((track, index) => {
                      return (
                          <ListCardTrack
                              trackData={track}
                              onPressTrack={() => onPressTrackCard(track)}
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
