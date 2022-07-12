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
}
export const ListRendererSongs = ({songsList}: ListRendererSongsProps) => {
    return (
        <View>
            {songsList.map((song, index) => {
                return (
                    <ListObjectSong
                        songData={song}
                        key={`${song.musicId}${index}`}
                    />
                )
            })}
        </View>
    )
}
