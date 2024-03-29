/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component is a helper component to render data in the explore screen
 */

import {
    navigateToArtistDetailsScreen,
    navigateToPlaylistDetailsScreen,
} from '@/utils'
import {NavigationHelpers} from '@react-navigation/native'
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
    // to navigate to artist details and playlist screen
    navigation: NavigationHelpers<any>

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
    combinedProps?: Partial<
        QueryTracksRendererProps &
            QueryTrackChunksRendererProps &
            QueryArtistRendererProps &
            QueryPlaylistsRendererProps
    >
}
export function QueryDataRenderer({
    navigation,

    title,
    contentType,
    searchQueries,
    combinedProps,
}: QueryDataRendererProps) {
    // const ActualContent = ContentOptions[contentType]

    return (
        <View>
            {/* a title for the type of content to show */}
            <TitleTextIcon>{title}</TitleTextIcon>

            {/* the actual component that renders the actual data about the query passed */}
            {contentType === 'Tracks' ? (
                <QueryTracksRenderer searchQuery={searchQueries[0]} />
            ) : contentType === 'TrackChunks' ? (
                <QueryTrackChunksRenderer
                    searchQuery={searchQueries[0]}
                    tracksPerColumn={combinedProps?.tracksPerColumn}
                />
            ) : contentType === 'Artists' ? (
                <QueryArtistRenderer
                    searchQueries={searchQueries}
                    onPressArtistCard={artistData =>
                        navigateToArtistDetailsScreen(navigation, {
                            artistData: artistData,
                        })
                    }
                />
            ) : contentType === 'Playlists' ? (
                <QueryPlaylistsRenderer
                    searchQuery={searchQueries[0]}
                    onPressPlaylist={playlistData =>
                        navigateToPlaylistDetailsScreen(navigation, {
                            playlistData: playlistData,
                        })
                    }
                />
            ) : null}

            {/* this below is deprecated and not recommended anymore. since many useless methods are passed in this way which are not needed by all the components */}
            {/* <ActualContent
                searchQuery={searchQueries[0]}
                searchQueries={searchQueries}
                onPressArtistCard={artistData =>
                    navigateToArtistDetailsScreen(navigation, {
                        artistData: artistData,
                    })
                }
                onPressPlaylist={playlistData =>
                    navigateToPlaylistDetailsScreen(navigation, {
                        playlistData: playlistData,
                    })
                }
                {...combinedProps}
            /> */}
        </View>
    )
}
