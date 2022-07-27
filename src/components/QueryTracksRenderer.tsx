/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render tracks horizontally
 */

import React, {useEffect, useState} from 'react'

import {useMusic} from '@/hooks'
import {FetchedData, SongObject} from '@/schemas'

import {ListCardRendererTracks} from './ListCardRendererTracks'

export interface QueryTracksRendererProps {
    searchQuery: string
}
export function QueryTracksRenderer({searchQuery}: QueryTracksRendererProps) {
    const {search} = useMusic()

    // since we are not rendering data to get continuous data, so only the searched content
    const [track, setTracks] = useState<Array<SongObject>>([])

    /**
     * loads up all the neccessary data required to render the artists list
     * the search query will be dynamic and will be modified
     */
    useEffect(() => {
        if (searchQuery) {
            search(searchQuery, 'SONG', true)
                .then((res: FetchedData<SongObject>) => {
                    setTracks(res.content)
                })
                .catch(_ERR => {})
        }
    }, [])

    return (
        <ListCardRendererTracks tracksList={track} searchQuery={searchQuery} />
    )
}
