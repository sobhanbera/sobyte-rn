/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render tracks horizontally in fashion of 3 per column.
 */

import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import Lodash from 'lodash'

import {useMusic} from '@/hooks'
import {FetchedSongObject, SongObject} from '@/schemas'
import {SobyteTextView} from './SobyteTextView'
import {ScrollView} from 'react-native-gesture-handler'

interface TrackChunksRendererProps {
    searchQuery: string
}
export function TrackChunksRenderer({searchQuery}: TrackChunksRendererProps) {
    const {search} = useMusic()

    const [trackChunks, setTrackChunks] = useState<Array<Array<SongObject>>>([[]])

    useEffect(() => {
        if (searchQuery) {
            search(searchQuery, 'SONG', true)
                .then((res: FetchedSongObject) => {
                    // console.log(JSON.stringify(res))
                    setTrackChunks(Lodash.chunk(res.content, 3))
                    // console.log(JSON.stringify(Lodash.chunk(res.content, 3)))
                })
                .catch(_ERR => {})
        }
    }, [])

    return (
        <ScrollView horizontal>
            {trackChunks.map(trackChunk => {
                return (
                    <View>
                        {trackChunk.map(track => {
                            return <SobyteTextView>{track.title}</SobyteTextView>
                        })}
                    </View>
                )
            })}
        </ScrollView>
    )
}
