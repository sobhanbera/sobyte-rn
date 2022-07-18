/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this main component inside list of playlists renderer (imp - vertical scrollview only)
 */

import React from 'react'
import FastImage from 'react-native-fast-image'

import {useTheme} from '@/hooks'
import {PlaylistObject} from '@/schemas'
import {formatTitle} from '@/utils'
import {DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {View} from 'react-native'

export interface ListObjectPlaylistProps {
    playlistData: PlaylistObject
    onPressPlaylist: () => void
}
export const ListObjectPlaylist = ({
    playlistData,
    onPressPlaylist,
}: ListObjectPlaylistProps) => {
    const {fonts, layouts, gutters} = useTheme()

    // data to display in the screen like title,artist and image
    const playlistTitle = formatTitle(playlistData.title)

    /**
     * since there are no playlists which doesnot contains 2 types of sizes of artworks
     * all of them instead
     *
     * so if any playlist contains only one artwork, that means the playlists data has not beed loaded yet
     * and the playlistData passed is the current playlist from reducer, the currently playing section of the queue
     */
    if (playlistData.artworks.length < 1) return null

    return (
        <View
            style={[
                layouts.center,
                gutters.tinyPaddingVertical,
                {width: '50%'}, // imp for flex-wrap
            ]}>
            <TouchableScalable
                onPress={onPressPlaylist}
                style={[
                    gutters.smallPadding,
                    {width: '100%'}, // imp for flex-wrap
                ]}>
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
                            maxWidth: '100%',
                            lineHeight: 20,
                        },
                    ]}
                    numberOfLines={1}>
                    {playlistTitle}
                </SobyteTextView>

                <SobyteTextView
                    style={[{maxWidth: '100%'}]}
                    numberOfLines={1}
                    subTitle>
                    {`${playlistData.trackCount} Tracks`}
                </SobyteTextView>
            </TouchableScalable>
        </View>
    )
}
