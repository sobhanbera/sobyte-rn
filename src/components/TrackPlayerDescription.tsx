/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - track's name, title, artists, like button, comment etc....
 */

import React from 'react'
import {View} from 'react-native'
import {withMenuContext} from 'react-native-popup-menu'

import {formatArtistsListFromArray, formatTrackTitle} from '@/utils'
import {SongObject} from '@/schemas'
import {
    NEXT_TITLE_COLOR_ALPHA,
    SCREEN_WIDTH,
    TRACK_ARTWORK_HORIZONAL_SPACING,
    TRACK_ARTWORK_SPACING,
} from '@/configs'
import {useTheme} from '@/hooks'
import {SobyteMarquee} from './SobyteMarquee'
import {TrackDetailsMenu} from './TrackDetailsMenu'

const TRACK_ARTIST_MENU_NAME = 'TRACK_ARTIST_MENU_NAME' // a menu id for the menu of player track's data

interface TrackPlayerDescriptionProps {
    track: SongObject
    index: number
    // extra data we get from menu component
    ctx: {
        menuActions: {
            openMenu: (name: string) => Promise<void>
            closeMenu: () => Promise<void>
            toggleMenu: (name: string) => Promise<void>
            isMenuOpen: () => boolean
        }
    }
}
export const TrackPlayerDescription = withMenuContext(
    ({track, index, ctx}: TrackPlayerDescriptionProps) => {
        const {fonts, gutters, theme} = useTheme()

        const formattedArtist = formatArtistsListFromArray(track.artists)
        const formattedTitle = formatTrackTitle(track.title)

        /**
         * this method is responsible to open the menu with name of variable MENU_NAME
         * this component is a other children component which is responsible
         * to open when this method is called or executed
         */
        const showTrackOptionMenu = () => {
            ctx.menuActions.openMenu(TRACK_ARTIST_MENU_NAME)
        }
        /**
         * function to close the menu
         * this will be provided to the menu, so that it could disable the menu by a cancel button or so
         */
        const closeTrackOptionMenu = () => {
            ctx.menuActions.closeMenu()
        }

        return (
            <View
                key={index}
                style={{
                    width: SCREEN_WIDTH, // very imp
                    paddingVertical: TRACK_ARTWORK_SPACING,
                    paddingHorizontal: TRACK_ARTWORK_HORIZONAL_SPACING,
                }}>
                <SobyteMarquee
                    style={[fonts.titleRegular, gutters.extraTinyMarginBottom]}>
                    {formattedTitle}
                </SobyteMarquee>

                <SobyteMarquee
                    onPress={showTrackOptionMenu}
                    style={[
                        fonts.titleSmall,
                        gutters.extraTinyMarginTop,
                        {
                            color: `${theme.themecolorrevert}${NEXT_TITLE_COLOR_ALPHA}`,
                        },
                    ]}>
                    {formattedArtist}
                </SobyteMarquee>

                <TrackDetailsMenu
                    menuName={TRACK_ARTIST_MENU_NAME}
                    closeMenu={closeTrackOptionMenu}
                />
            </View>
        )
    },
)
