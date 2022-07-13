/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this component renders list of artists (imp - vertical scrollview)
 */

import React from 'react'
import {ScrollView} from 'react-native'

import {ArtistObject} from '@/schemas'
import {useTheme} from '@/hooks'

import {ListCardArtist} from './ListCardArtist'

export interface ListCardRendererArtistsProps {
    artistList: Array<ArtistObject>
}
export const ListCardRendererArtists = ({
    artistList,
}: ListCardRendererArtistsProps) => {
    const {gutters} = useTheme()

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[gutters.extraTinyPaddingVertical]}
            contentContainerStyle={[gutters.smallPaddingHorizontal]} // since every child component has some horizontal padding, so to make it even on both side. this is the style for that
        >
            {artistList.map((artist, index) => {
                return (
                    <ListCardArtist
                        artistData={artist}
                        key={`${artist.browseId}${index}`}
                    />
                )
            })}
        </ScrollView>
    )
}
