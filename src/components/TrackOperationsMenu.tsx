/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - A menu about the detail of song/track like, title, image, artist name, like, share, download, etc and etc...
 */

import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import IoniconIcon from 'react-native-vector-icons/Ionicons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {
    Menu,
    MenuOptions,
    // MenuOption, not in use
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu'

import {
    ARTWORK_WIDTH_IN_TRACK_MENU,
    DEFAULT_BORDER_RADIUS,
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    NEXT_TITLE_COLOR_ALPHA,
    TINY_ICON_SIZE,
} from '@/configs'
import {useTheme} from '@/hooks'
import FastImage from 'react-native-fast-image'
import {useSelector} from 'react-redux'
import {SobyteState} from '@/state'
import {
    formatArtistsListFromArray,
    formatTrackTitle,
    updateArtworkQuality,
} from '@/utils'
import {SobyteMarquee} from './SobyteMarquee'
import {TrackOperationsMenuArtist} from './TrackOperationsMenuArtist'
import {SobyteTextView} from './SobyteTextView'

const {SlideInMenu} = renderers

export interface TrackOperationsMenuProps {
    menuName: string
}
export const TrackOperationsMenu = ({menuName}: TrackOperationsMenuProps) => {
    const {theme, gutters, fonts, layouts} = useTheme()

    const currentTrack = useSelector(
        (state: SobyteState) => state.playerdata.currentTrack,
    )

    const currentTrackArtwork = updateArtworkQuality(currentTrack.artworks[0])
    const currentTrackTitle = formatTrackTitle(currentTrack.title)
    const currentTrackArtist = formatArtistsListFromArray(currentTrack.artists)

    return (
        <Menu renderer={SlideInMenu} name={menuName}>
            <MenuTrigger>
                {/* menu trigger is just a invisible component here */}
                {/* we are opening the menu from outside this */}
                <View></View>
            </MenuTrigger>

            <MenuOptions
                optionsContainerStyle={[
                    gutters.largePaddingVertical,
                    gutters.mediumPaddingHorizontal,
                    {
                        backgroundColor: theme.surfacelight,
                        borderTopEndRadius: DEFAULT_BORDER_RADIUS,
                        borderTopStartRadius: DEFAULT_BORDER_RADIUS,
                    },
                ]}>
                <View style={[layouts.center, gutters.smallPaddingBottom]}>
                    <FastImage
                        source={{
                            uri: currentTrackArtwork,
                            cache: FastImage.cacheControl.immutable,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                            borderRadius: 10,
                            width: ARTWORK_WIDTH_IN_TRACK_MENU,
                            height: ARTWORK_WIDTH_IN_TRACK_MENU,
                        }}
                    />
                    <SobyteMarquee
                        style={[
                            fonts.textMedium,
                            fonts.boldFont,
                            gutters.smallPaddingVertical,
                        ]}>
                        {currentTrackTitle}
                    </SobyteMarquee>

                    <SobyteMarquee
                        style={[
                            fonts.textSmall,
                            {
                                color: `${theme.themecolorrevert}${NEXT_TITLE_COLOR_ALPHA}`,
                            },
                        ]}>
                        {currentTrackArtist}
                    </SobyteMarquee>
                </View>

                {currentTrack.artists.length > 0 ? (
                    <View>
                        <SobyteTextView
                            style={[
                                fonts.titleTiny,
                                gutters.smallPaddingVertical,
                                gutters.tinyPaddingHorizontal,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.surfaceborder,
                                },
                            ]}>
                            {currentTrack.artists.length > 1
                                ? 'Artists'
                                : 'Artist'}
                        </SobyteTextView>

                        {currentTrack.artists.map(artist => {
                            return (
                                <TrackOperationsMenuArtist
                                    artistData={artist}
                                    key={artist.browseId + artist.name}
                                />
                            )
                        })}
                    </View>
                ) : null}

                <View style={[gutters.smallMarginVertical]}>
                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={() => {}}
                        style={[
                            layouts.row,
                            gutters.tinyPaddingVertical,
                            gutters.smallPaddingHorizontal,
                            gutters.smallMarginVertical,
                        ]}>
                        <AntDesignIcon name="hearto" size={TINY_ICON_SIZE} />

                        <SobyteTextView
                            style={[
                                fonts.textRegular,
                                gutters.regularPaddingHorizontal,
                                gutters.largePaddingLeft,
                            ]}>
                            Add to liked songs
                        </SobyteTextView>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={() => {}}
                        style={[
                            layouts.row,
                            gutters.tinyPaddingVertical,
                            gutters.smallPaddingHorizontal,
                            gutters.smallMarginVertical,
                        ]}>
                        <IoniconIcon
                            name="ios-share-social-outline"
                            size={TINY_ICON_SIZE}
                        />

                        <SobyteTextView
                            style={[
                                fonts.textRegular,
                                gutters.regularPaddingHorizontal,
                                gutters.largePaddingLeft,
                            ]}>
                            Share with someone!
                        </SobyteTextView>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={() => {}}
                        style={[
                            layouts.row,
                            gutters.tinyPaddingVertical,
                            gutters.smallPaddingHorizontal,
                            gutters.smallMarginVertical,
                        ]}>
                        <AntDesignIcon name="download" size={TINY_ICON_SIZE} />

                        <SobyteTextView
                            style={[
                                fonts.textRegular,
                                gutters.regularPaddingHorizontal,
                                gutters.largePaddingLeft,
                            ]}>
                            Download the track
                        </SobyteTextView>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={() => {}}
                        style={[
                            layouts.row,
                            gutters.tinyPaddingVertical,
                            gutters.smallPaddingHorizontal,
                            gutters.smallMarginVertical,
                        ]}>
                        <IoniconIcon
                            name="ios-add-circle-outline"
                            size={TINY_ICON_SIZE}
                        />

                        <SobyteTextView
                            style={[
                                fonts.textRegular,
                                gutters.regularPaddingHorizontal,
                                gutters.largePaddingLeft,
                            ]}>
                            Add to playlist
                        </SobyteTextView>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={() => {}}
                        style={[
                            layouts.row,
                            gutters.tinyPaddingVertical,
                            gutters.smallPaddingHorizontal,
                            gutters.smallMarginVertical,
                        ]}>
                        <IoniconIcon
                            name="list-circle-outline"
                            size={TINY_ICON_SIZE}
                        />

                        <SobyteTextView
                            style={[
                                fonts.textRegular,
                                gutters.regularPaddingHorizontal,
                                gutters.largePaddingLeft,
                            ]}>
                            View Playlist
                        </SobyteTextView>
                    </TouchableOpacity>
                </View>

                {/* an extra padding to overcome the screen below space */}
                {/* <View style={gutters.regularPaddingVertical}></View> */}
            </MenuOptions>
        </Menu>
    )
}
