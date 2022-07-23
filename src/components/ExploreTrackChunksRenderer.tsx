/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render tracks horizontally in fashion of 3 per column.
 */

import React, {useEffect} from 'react'
import {View} from 'react-native'

import {useMusic} from '@/hooks'
import {FetchedSongObject} from '@/schemas'
import {SobyteTextView} from './SobyteTextView'

interface ExploreTrackChunksRendererProps {
    searchQuery: string
}
export function ExploreTrackChunksRenderer({searchQuery}: ExploreTrackChunksRendererProps) {
    const {search} = useMusic()

    useEffect(() => {
        if (searchQuery) {
            search(searchQuery, 'SONG', true, [0, 12])
                .then((res: FetchedSongObject) => {})
                .catch(_ERR => {})
        }
    }, [])

    return (
        <View>
            <SobyteTextView>asdfasd</SobyteTextView>
        </View>
    )
}
