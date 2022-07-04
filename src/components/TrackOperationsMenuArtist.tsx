/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - artist component for track operation's menu
 */

import React, {useEffect, useState} from 'react'
import {View} from 'react-native'

import {useMusic, useTheme} from '@/hooks'
import {SobyteTextView} from './SobyteTextView'
import FastImage from 'react-native-fast-image'
import {ArtistDetailsObject, SongArtistObject} from '@/schemas'
import {Skeleton} from '@rneui/themed'

export interface TrackOperationsMenuArtistProps {
    artistData: SongArtistObject
}
export const TrackOperationsMenuArtist = ({
    artistData,
}: TrackOperationsMenuArtistProps) => {
    const {gutters, fonts, layouts} = useTheme()
    const {getArtist} = useMusic()

    /**
     * this state var will contains the detail about the artist
     * like name, description, artwork etc...
     */
    const [artistDetails, setArtistDetails] = useState<ArtistDetailsObject>({
        name: '',
        thumbnails: [{height: 0, url: '', width: 0}],
    })
    const [loading, setLoading] = useState<boolean>(true)

    /**
     * loading artist's data before rendering...
     */
    useEffect(() => {
        setLoading(true)
        getArtist(artistData.browseId)
            .then((artistResult: ArtistDetailsObject) => {
                setArtistDetails(artistResult)
                setLoading(false)
            })
            .catch(_ERR => {
                setLoading(false)
                console.log('TrackOperationsMenuArtist', _ERR)
            })
    }, [artistData])

    /**
     * some artist's does not have name, artwork and all.
     * so for them if the data is loaded, but we got nothing to show, then
     * we will render nothing as a component
     */
    if (!loading && !artistDetails?.name) return null

    return (
        <View style={[gutters.tinyMarginVertical]}>
            {loading ? (
                <View style={[layouts.row, layouts.alignItemsCenter]}>
                    <Skeleton
                        animation="wave"
                        circle={true}
                        width={55}
                        height={55}
                        style={[gutters.tinyMarginVertical]}
                    />

                    <Skeleton
                        animation="wave"
                        circle={false}
                        width={180}
                        height={18}
                        style={[
                            gutters.tinyMarginVertical,
                            gutters.mediumMarginHorizontal,
                        ]}
                    />
                </View>
            ) : (
                <View style={[layouts.row, layouts.alignItemsCenter]}>
                    <FastImage
                        source={{
                            uri: artistDetails?.thumbnails[0].url,
                            cache: FastImage.cacheControl.immutable,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={[
                            gutters.tinyMarginVertical,
                            {
                                borderRadius: 55,
                                width: 55,
                                height: 55,
                            },
                        ]}
                    />

                    <SobyteTextView
                        style={[
                            gutters.tinyMarginVertical,
                            gutters.mediumMarginHorizontal,
                            fonts.textRegular,
                        ]}>
                        {artistDetails?.name}
                    </SobyteTextView>
                </View>
            )}
        </View>
    )
}
