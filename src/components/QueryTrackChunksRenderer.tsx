/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render tracks horizontally in fashion of TRACKS_PER_COLUMN_IN_CHUNKS per column.
 */

import React, {useCallback, useEffect, useState} from 'react'
import {FlatList, ListRenderItemInfo, View} from 'react-native'
import Lodash from 'lodash'

import {useMusic} from '@/hooks'
import {FetchedSongObject, SongObject} from '@/schemas'
import {ListObjectSong} from './ListObjectSong'
import {
    DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH,
    NothingArray,
    SCREEN_WIDTH,
    TRACKS_PER_COLUMN_IN_CHUNKS,
} from '@/configs'
import {ShimmerListObjectSong} from './ShimmerListObjectSong'

export interface QueryTrackChunksRendererProps {
    searchQuery: string
    tracksPerColumn?: number
}
export function QueryTrackChunksRenderer({
    searchQuery,
    tracksPerColumn = TRACKS_PER_COLUMN_IN_CHUNKS,
}: QueryTrackChunksRendererProps) {
    const {search} = useMusic()

    const [trackChunks, setTrackChunks] = useState<Array<Array<SongObject>>>([])

    /**
     * this method loads up the data for tracks and updates the state
     */
    const loadTracksData = () => {
        if (searchQuery) {
            search(searchQuery, 'SONG', true)
                .then((res: FetchedSongObject) => {
                    setTrackChunks(Lodash.chunk(res.content, tracksPerColumn))
                })
                .catch(_ERR => {})
        }
    }

    /**
     * loads up all the neccessary data required to render the songs/tracks list
     * this method searches and save the data on first render
     *
     * the search query will be dynamic and will be modified
     */
    useEffect(() => {
        loadTracksData()
    }, [searchQuery])

    /**
     * responsible for rendering the chunk of some tracks
     * renders a list of maximum of TRACKS_PER_COLUMN_IN_CHUNKS components which are nested array objects
     */
    const renderTrackChunkItem = useCallback(
        (itemDetails: ListRenderItemInfo<Array<SongObject>>) => {
            const {item} = itemDetails

            return (
                <View style={{width: SCREEN_WIDTH}}>
                    {item.map((track, index) => {
                        return (
                            <ListObjectSong
                                key={`${track.musicId}-${index}`}
                                songData={track}
                                searchQuery={searchQuery}
                                artworkStyle={{
                                    width:
                                        DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH +
                                        10,
                                    height:
                                        DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH +
                                        10,
                                }}
                            />
                        )
                    })}
                </View>
            )
        },
        [],
    )

    /**
     * same as the above method
     * but this method renders shimmer component for the same
     */
    const renderShimmerTrackChunkItem = useCallback(
        (itemDetails: ListRenderItemInfo<Array<{id: string}>>) => {
            const {item} = itemDetails

            return (
                <View style={{width: SCREEN_WIDTH}}>
                    {item.map(shimmerTrack => {
                        return (
                            <ShimmerListObjectSong
                                key={shimmerTrack.id}
                                customArtworkSize={
                                    DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH + 10
                                }
                            />
                        )
                    })}
                </View>
            )
        },
        [],
    )

    /**
     * key extractor for each item of the UI...
     * this is the key extractor for the vertically rendering array
     */
    const keyExtractor = useCallback(
        (_item: Array<SongObject>, index: number) => `${index}`,
        [],
    )

    return trackChunks.length > 0 ? (
        <FlatList
            data={trackChunks}
            renderItem={renderTrackChunkItem}
            keyExtractor={keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            // for snapping purpose
            snapToInterval={SCREEN_WIDTH}
            disableIntervalMomentum
            snapToAlignment="end"
            decelerationRate="fast"
        />
    ) : (
        <FlatList
            data={Lodash.chunk(NothingArray, tracksPerColumn)} // data formatting
            renderItem={renderShimmerTrackChunkItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            // for snapping purpose
            snapToInterval={SCREEN_WIDTH}
            disableIntervalMomentum
            snapToAlignment="end"
            decelerationRate="fast"
        />
    )
}
