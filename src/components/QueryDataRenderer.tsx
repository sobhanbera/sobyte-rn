/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component is a helper component to render data in the explore screen
 */

import React from 'react'
import {View} from 'react-native'

import {
    QueryArtistRenderer,
    QueryArtistRendererProps,
} from './QueryArtistsRenderer'
import {
    QueryPlaylistsRenderer,
    QueryPlaylistsRendererProps,
} from './QueryPlaylistsRenderer'
import {
    QueryTrackChunksRenderer,
    QueryTrackChunksRendererProps,
} from './QueryTrackChunksRenderer'
import {
    QueryTracksRenderer,
    QueryTracksRendererProps,
} from './QueryTracksRenderer'
import {TitleTextIcon} from './TitleTextIcon'

/**
 * mapping of all types of contents available
 * through the application
 *
 * we are currently providing tracks, artists, playlists
 * albums are not provided yet because of some issues on that
 *
 * we are also providing a special type of list - track chunks list
 */
export const ContentOptions = {
    Tracks: QueryTracksRenderer,
    TrackChunks: QueryTrackChunksRenderer,
    Artists: QueryArtistRenderer,
    Playlists: QueryPlaylistsRenderer,
}
export type ContentTypeOptions = keyof typeof ContentOptions

export interface QueryDataRendererProps {
    // the title of the data category
    title: string
    // what type of data to render
    contentType: ContentTypeOptions

    // what are the queries to search for before rendering them
    searchQueries: string[]

    /**
     * these are the combined props needed for all
     * kinds of the data content in the list renderer
     */
    combinedProps?:
        | QueryTracksRendererProps
        | QueryTrackChunksRendererProps
        | QueryArtistRendererProps
        | QueryPlaylistsRendererProps
}
export function QueryDataRenderer({
    title,
    contentType,
    searchQueries,
    combinedProps,
}: QueryDataRendererProps) {
    const ActualContent = ContentOptions[contentType]

    return (
        <View>
            {/* a title for the type of content to show */}
            <TitleTextIcon>{title}</TitleTextIcon>

            {/* the actual component that renders the actual data about the query passed */}
            <ActualContent
                searchQuery={searchQueries[0]}
                searchQueries={searchQueries}
                {...combinedProps}
            />
        </View>
    )
}
