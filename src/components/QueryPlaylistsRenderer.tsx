/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render playlists in explore mainly...
 */

import React, {useEffect, useState} from 'react'

import {useMusic} from '@/hooks'
import {FetchedData, PlaylistObject} from '@/schemas'
import {ListCardRendererPlaylists} from './ListCardRendererPlaylists'

interface QueryPlaylistsRendererProps {
    searchQuery: string
}
export function QueryPlaylistsRenderer({
    searchQuery,
}: QueryPlaylistsRendererProps) {
    const {search} = useMusic()

    // since we are not rendering data to get continuous data, so only the searched content
    const [playlists, setPlaylists] = useState<Array<PlaylistObject>>([])

    /**
     * loads up all the neccessary data required to render the playlist list
     * the search query will be dynamic and will be modified
     */
    useEffect(() => {
        if (searchQuery) {
            search(searchQuery, 'PLAYLIST')
                .then((res: FetchedData<PlaylistObject>) => {
                    setPlaylists(res.content)
                    // console.log(res.content)
                })
                .catch(_ERR => {})
        }
    }, [])

    return (
        <ListCardRendererPlaylists
            playlistsList={playlists}
            onPressPlaylistCard={() => {}}
        />
    )
}
