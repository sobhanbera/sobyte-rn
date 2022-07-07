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
import {
    Menu,
    MenuOptions,
    // MenuOption, not in use
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu'

import {DEFAULT_BORDER_RADIUS} from '@/configs'
import {useTheme} from '@/hooks'
import {useSelector} from 'react-redux'
import {SobyteState} from '@/state'
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

    return (
        <Menu renderer={SlideInMenu} name={menuName}>
            <MenuTrigger>
                {/* menu trigger is just a invisible component here */}
                {/* we are opening the menu from outside this */}
                <View></View>
            </MenuTrigger>

            <MenuOptions
                optionsContainerStyle={[
                    {
                        backgroundColor: theme.surface,
                        borderTopEndRadius: DEFAULT_BORDER_RADIUS,
                        borderTopStartRadius: DEFAULT_BORDER_RADIUS,
                    },
                ]}>
                {currentTrack.artists.length > 0 ? (
                    <View>
                        <SobyteTextView
                            style={[
                                fonts.titleSmall,
                                gutters.regularPaddingVertical,
                                gutters.mediumPaddingHorizontal,
                                gutters.mediumPadding,
                                {
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.surfaceborder,
                                },
                            ]}>
                            {currentTrack.artists.length > 1
                                ? 'Artists'
                                : 'Artist'}
                        </SobyteTextView>

                        <View
                            style={[
                                gutters.regularPaddingVertical,
                                gutters.mediumPaddingHorizontal,
                            ]}>
                            {currentTrack.artists.map(artist => {
                                return (
                                    <TrackOperationsMenuArtist
                                        artistData={artist}
                                        key={artist.browseId + artist.name}
                                    />
                                )
                            })}
                        </View>
                    </View>
                ) : null}

                <TouchableOpacity>
                    <SobyteTextView
                        style={[
                            layouts.fullWidth,
                            gutters.regularPaddingVertical,
                            fonts.textMedium,
                            {
                                backgroundColor: theme.surfacelight,
                                color: theme.text,
                                textAlign: 'center',
                            },
                        ]}>
                        Cancel
                    </SobyteTextView>
                </TouchableOpacity>
            </MenuOptions>
        </Menu>
    )
}
