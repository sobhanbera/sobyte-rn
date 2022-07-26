/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component renders list of playlists in horizontal fashion
 */

import React from 'react'
import {ScrollView} from 'react-native'

import {PlaylistObject} from '@/schemas'
import {useTheme} from '@/hooks'
import {NothingArray} from '@/configs'

import {ListCardPlaylist} from './ListCardPlaylist'
import {ShimmerListCardPlaylist} from './ShimmerListCardPlaylist'

export interface ListCardRendererPlaylistsProps {
    playlistsList: Array<PlaylistObject>
    onPressPlaylistCard(playlistData: PlaylistObject): void
}
export const ListCardRendererPlaylists = ({
    playlistsList,
    onPressPlaylistCard,
}: ListCardRendererPlaylistsProps) => {
    const {gutters} = useTheme()

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[gutters.extraTinyPaddingVertical]}
            contentContainerStyle={[gutters.tinyPaddingHorizontal]} // since every child component has some horizontal padding, so to make it even on both side. this is the style for that
        >
            {/* if the playlist list is empty, then show shimmer */}
            {playlistsList.length > 0
                ? playlistsList.map((playlist, index) => {
                      return (
                          <ListCardPlaylist
                              playlistData={playlist}
                              onPressPlaylist={() =>
                                  onPressPlaylistCard(playlist)
                              }
                              key={`${playlist.browseId}-${index}`}
                          />
                      )
                  })
                : NothingArray.map(nothingShimmer => {
                      return <ShimmerListCardPlaylist key={nothingShimmer.id} />
                  })}
        </ScrollView>
    )
}
