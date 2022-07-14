/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component renders list of songs (imp - vertical scrollview)
 */

import React from 'react'
import {View} from 'react-native'

import {SongObject} from '@/schemas'
import {ListObjectSong} from './ListObjectSong'

export interface ListRendererSongsProps {
    songsList: Array<SongObject>
    searchQuery: string // this is needed description to play any song
}
export const ListRendererSongs = ({
    songsList,
    searchQuery,
}: ListRendererSongsProps) => {
    return (
        <View>
            {songsList.map((song, index) => {
                return (
                    <ListObjectSong
                        songData={song}
                        searchQuery={searchQuery}
                        key={`${song.musicId}${index}`}
                    />
                )
            })}
        </View>
    )
}
