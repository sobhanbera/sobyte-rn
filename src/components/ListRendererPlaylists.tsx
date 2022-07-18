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
import ErrorBoundary from '@/error/ErrorBoundary'

export interface ListRendererPlaylistsProps {
    playlistList: Array<PlaylistObject>
    onPressPlaylist: () => void
}
export const ListRendererPlaylists = ({
    playlistList,
    onPressPlaylist,
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
                    <ErrorBoundary
                        id={playlist.title}
                        key={`${playlist.browseId}${index}`}>
                        <ListObjectPlaylist
                            onPressPlaylist={onPressPlaylist}
                            playlistData={playlist}
                            // key={`${playlist.browseId}${index}`}
                        />
                    </ErrorBoundary>
                )
            })}
        </View>
    )
}
