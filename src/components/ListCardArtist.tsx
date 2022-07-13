/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this main component inside list of artists renderer (imp - horizontal scrollview only)
 */

import React from 'react'
import FastImage from 'react-native-fast-image'

import {useTheme} from '@/hooks'
import {ArtistObject} from '@/schemas'
import {formatTitle, updateArtworkQualityUniversal} from '@/utils'
import {DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH} from '@/configs'

import {SobyteTextView} from './SobyteTextView'
import {TouchableScalable} from './TouchableScalable'
import {View} from 'react-native'

export interface ListCardArtistProps {
    artistData: ArtistObject
}
export const ListCardArtist = ({artistData}: ListCardArtistProps) => {
    const {fonts, layouts, gutters} = useTheme()

    // data to display in the screen like title,artist and image
    const artistTitle = formatTitle(artistData.title)
    /**
     * sometime the artist's account are created by user's only, so in that case the artwork url will not contains
     * the width and height property in the string URL format, so we can detect that in the @updateArtworkQuality method
     * this method returns '' an empty string when the width and height parameter is not available in the artwork
     */
    const artistArtwork = updateArtworkQualityUniversal(artistData.artworks[0])

    /**
     * since there are no artists which doesnot contains 2 types of sizes of artworks
     * all of them instead
     *
     * so if any artist contains only one artwork, that means the artists data has not beed loaded yet
     * and the artistData passed is the current artist from reducer, the currently playing section of the queue
     */
    if (artistData.artworks.length < 1 || !artistArtwork) return null

    return (
        <View style={[layouts.center]}>
            <TouchableScalable
                onPress={() => {}}
                style={[gutters.smallPadding, layouts.center]}>
                <FastImage
                    source={{
                        uri: artistData.artworks[1].url,
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        borderRadius:
                            DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH / 2,
                        width: DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
                        height: DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH,
                    }}
                />

                <SobyteTextView
                    style={[
                        fonts.mediumFont,
                        fonts.textRegular,
                        gutters.tinyPadding,
                    ]}
                    numberOfLines={1}>
                    {artistTitle}
                </SobyteTextView>
            </TouchableScalable>
        </View>
    )
}
