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
import {SongsListObject} from './SongsListObject'

export interface SongsListRendererProps {
    songsList: Array<SongObject>
}
export const SongsListRenderer = ({songsList}: SongsListRendererProps) => {
    return (
        <View>
            {songsList.map((song, index) => {
                return (
                    <SongsListObject
                        songData={song}
                        key={`${song.musicId}${index}`}
                    />
                )
            })}
        </View>
    )
}
