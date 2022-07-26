/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - the playlist card component, mainly for explore screen
 */

import React from 'react'
import FastImage from 'react-native-fast-image'

import {useTheme} from '@/hooks'
import {PlaylistObject} from '@/schemas'
import {formatTitle, updateArtworkQualityUniversal} from '@/utils'
import {DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {View} from 'react-native'

export interface ListCardPlaylistProps {
    playlistData: PlaylistObject
    onPressPlaylist: () => void
}
export const ListCardPlaylist = ({
    playlistData,
    onPressPlaylist,
}: ListCardPlaylistProps) => {
    const {fonts, layouts, gutters} = useTheme()

    // data to display in the screen like title and image
    const playlistTitle = formatTitle(playlistData.title)
    const playlistArtwork = updateArtworkQualityUniversal(
        playlistData.artworks[0],
    )

    /**
     * since there are no playlists which doesnot contains 2 types of sizes of artworks
     * all of them instead
     *
     * so if any playlist contains only one artwork, that means the playlists data has not beed loaded yet
     * and the playlistData passed is the current playlist from reducer, the currently playing section of the queue
     *
     * and many playlist artworks are not of same type
     * for them don't render those
     */
    if (playlistData.artworks.length < 1 || !playlistArtwork) return null

    return (
        <View style={[layouts.center, gutters.tinyPaddingVertical]}>
            <TouchableScalable
                onPress={onPressPlaylist}
                style={[gutters.smallPadding]}>
                <FastImage
                    source={{
                        uri: playlistData.artworks[0].url,
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        borderRadius: 2,
                        width: DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
                        height: DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
                    }}
                />

                <SobyteTextView
                    style={[
                        fonts.mediumFont,
                        fonts.textRegular,
                        gutters.tinyPaddingVertical,
                        {
                            maxWidth:
                                DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
                        },
                    ]}
                    numberOfLines={1}>
                    {playlistTitle}
                </SobyteTextView>

                <SobyteTextView
                    style={{
                        maxWidth: DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
                    }}
                    numberOfLines={1}
                    subTitle>
                    {`${playlistData.trackCount} Tracks`}
                </SobyteTextView>
            </TouchableScalable>
        </View>
    )
}
