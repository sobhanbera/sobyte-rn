/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - pop-menu to change track player's volume
 */

import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {Slider} from '@rneui/themed'
import IoniconIcon from 'react-native-vector-icons/Ionicons'

import {
    Menu,
    MenuOptions,
    // MenuOption, not in use
    MenuTrigger,
    renderers,
    withMenuContext,
} from 'react-native-popup-menu'

import {
    DEFAULT_BORDER_RADIUS,
    DEFAULT_ICON_SIZE,
    DEFAULT_SLIDER_THUMB_SIZE,
    DEFAULT_SLIDER_TRACK_HEIGHT,
    TRACK_ARTWORK_WIDTH_SMALL,
} from '@/configs'
import {useTheme} from '@/hooks'
import {SobyteTextView} from './SobyteTextView'
import TrackPlayer from 'react-native-track-player'

const {SlideInMenu} = renderers

/**
 * there will be no menu options for this menu
 * instead we will use a slider to change the value of volume
 * inside the menu
 */
export interface TrackPlayerVolumeChangerMenuProps {
    // extra data we get from menu component
    ctx: {
        menuActions: {
            closeMenu(): void
        }
    }
}

/**
 * this provides extra data through the props
 * like functions and methods for Menu API
 * NOTE: MenuProvider should be in the root of App
 */
export const TrackPlayerVolumeChangerMenu = withMenuContext(
    ({ctx}: TrackPlayerVolumeChangerMenuProps) => {
        const {theme, gutters, fonts, layouts} = useTheme()

        /**
         * a state varibale to track the volume range
         * this will be helpful to render a particular volume icon
         *
         * like for low volume we are rendering a low volume icon with less wave in it
         * and for high volume we are rendering a high volume icon with more wave in it
         * likewise...
         */
        const [trackVolume, setTrackVolume] = useState<number>(1)

        /**
         * at first render just get the current volume and update the state
         */
        useEffect(() => {
            TrackPlayer.getVolume()
                .then((volume: number) => {
                    setTrackVolume(volume)
                })
                .catch(_ERR => {})
        }, [])

        /**
         * changes the volume for track player
         * @param volume a number between 0 & 1
         */
        const updateTrackVolume = (volume: number) => {
            // checking for valid volume than updating the volume
            if (volume >= 0 && volume <= 1)
                TrackPlayer.setVolume(volume)
                    .then(() => {
                        // also updating in the state
                        setTrackVolume(volume)
                    })
                    .catch(_ERR => {})
        }

        /**
         * when the volume is set
         * we will close this menu
         *
         * this method does the same
         */
        const closeVolumeChangerMenu = () => {
            ctx.menuActions.closeMenu()
        }

        return (
            <Menu renderer={SlideInMenu}>
                <MenuTrigger>
                    {trackVolume <= 0 ? (
                        <IoniconIcon
                            name="ios-volume-mute-outline"
                            size={DEFAULT_ICON_SIZE} // this icon is small in the fonts, so I have made it 2 unit large than other icons in the same parent component @see components/TrackPlayerFooter.tsx
                            color={theme.themecolorrevert + 'DF'}
                        />
                    ) : trackVolume <= 0.3 ? (
                        <IoniconIcon
                            name="ios-volume-low-outline"
                            size={DEFAULT_ICON_SIZE} // this icon is small in the fonts, so I have made it 2 unit large than other icons in the same parent component @see components/TrackPlayerFooter.tsx
                            color={theme.themecolorrevert + 'DF'}
                        />
                    ) : trackVolume <= 0.6 ? (
                        <IoniconIcon
                            name="ios-volume-medium-outline"
                            size={DEFAULT_ICON_SIZE} // this icon is small in the fonts, so I have made it 2 unit large than other icons in the same parent component @see components/TrackPlayerFooter.tsx
                            color={theme.themecolorrevert + 'DF'}
                        />
                    ) : (
                        <IoniconIcon
                            name="ios-volume-high-outline"
                            size={DEFAULT_ICON_SIZE} // this icon is small in the fonts, so I have made it 2 unit large than other icons in the same parent component @see components/TrackPlayerFooter.tsx
                            color={theme.themecolorrevert + 'DF'}
                        />
                    )}
                </MenuTrigger>

                <MenuOptions
                    optionsContainerStyle={{
                        backgroundColor: theme.surfacelight,
                        borderTopEndRadius: DEFAULT_BORDER_RADIUS,
                        borderTopStartRadius: DEFAULT_BORDER_RADIUS,
                    }}>
                    <View></View>
                    {/* text about what to change */}
                    <SobyteTextView
                        style={[
                            gutters.regularPaddingVertical,
                            fonts.textCenter,
                            fonts.boldFont,
                            fonts.textRegular,
                            {
                                borderBottomWidth: 1,
                                borderBottomColor: theme.border,
                            },
                        ]}>
                        Change Volume
                    </SobyteTextView>

                    <View
                        style={[
                            layouts.row,
                            layouts.justifyContentAround,
                            layouts.alignItemsCenter,
                            gutters.regularPaddingVertical,
                        ]}>
                        <SobyteTextView
                            style={[
                                fonts.textSmall,
                                fonts.textCenter,
                                {width: 50}, // without this style the row flexbox will wobble at lot when the volume value changes
                            ]}>
                            {`${(trackVolume * 100).toFixed(0)}%`}
                        </SobyteTextView>

                        <Slider
                            style={{
                                width: TRACK_ARTWORK_WIDTH_SMALL,
                            }}
                            step={0.01}
                            minimumValue={0}
                            maximumValue={1}
                            value={trackVolume}
                            allowTouchTrack
                            minimumTrackTintColor={theme.themecolorrevert}
                            maximumTrackTintColor={`${theme.themecolorrevert}1F`}
                            thumbTintColor={theme.themecolorrevert}
                            thumbTouchSize={{
                                height: DEFAULT_SLIDER_THUMB_SIZE,
                                width: DEFAULT_SLIDER_THUMB_SIZE,
                            }}
                            thumbStyle={{
                                width: DEFAULT_SLIDER_THUMB_SIZE,
                                height: DEFAULT_SLIDER_THUMB_SIZE,
                            }}
                            trackStyle={{
                                height: DEFAULT_SLIDER_TRACK_HEIGHT,
                            }}
                            onSlidingComplete={(_volume: number) =>
                                closeVolumeChangerMenu()
                            }
                            onValueChange={(volume: number) =>
                                updateTrackVolume(volume)
                            }
                        />
                    </View>

                    {/* an extra padding to overcome the screen below space */}
                    <View style={gutters.regularPaddingVertical}></View>
                </MenuOptions>
            </Menu>
        )
    },
)
