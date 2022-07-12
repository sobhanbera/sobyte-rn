/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component renders list of playlists (imp - vertical scrollview)
 */

import React from 'react'
import {View} from 'react-native'

import {PlaylistObject} from '@/schemas'
import {useTheme} from '@/hooks'

import {ListObjectPlaylist} from './ListObjectPlaylist'

export interface ListRendererPlaylistsProps {
    playlistList: Array<PlaylistObject>
}
export const ListRendererPlaylists = ({
    playlistList,
}: ListRendererPlaylistsProps) => {
    const {layouts, gutters} = useTheme()

    return (
        <View
            style={[
                layouts.row,
                gutters.tinyPaddingHorizontal,
                {flexWrap: 'wrap'},
            ]}>
            {playlistList.map((playlist, index) => {
                return (
                    <ListObjectPlaylist
                        playlistData={playlist}
                        key={`${playlist.browseId}${index}`}
                    />
                )
            })}
        </View>
    )
}
