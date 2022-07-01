/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - the footer of track player UI, this contains - like button, queue button, share, comment button and more...
 */

import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {useSelector} from 'react-redux'
import IoniconIcon from 'react-native-vector-icons/Ionicons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

import {useTheme} from '@/hooks'
import {
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    TINY_ICON_SIZE,
    TRACK_ARTWORK_WIDTH,
} from '@/configs'
import {TrackPlayerVolumeChangerMenu} from './TrackPlayerVolumeChangerMenu'
import {SobyteState} from '@/state'

export interface TrackPlayerFooterProps {
    /**
     * function will be triggered when a user has pressed on a track from the queue
     * or want to change the track
     * @param trackIndex an index among the tracks list
     */
    onQueueButtonPressed(): void
    /**
     * show a menu which contains all the tracks in the queue
     */
}
export const TrackPlayerFooter = ({
    onQueueButtonPressed,
}: TrackPlayerFooterProps) => {
    const {gutters, layouts, variables} = useTheme()

    // current track data is needed for like, share and download feature
    const currentTrack = useSelector(
        (state: SobyteState) => state.playerdata.currentTrack,
    )

    /**
     * TODO:
     * when like button is pressed, update it by adding a new row
     * in the database
     */
    const onLikeButtonPressed = () => {}

    /**
     * TODO:
     * open/launch share menu of the android to share the link of the track
     * this method does exactly that
     */
    const onShareButtonPressed = () => {}

    /**
     * TODO:
     * download the currently playing track
     * in encrypted way and save it to hidden location
     * so that is could not be accessed to user
     * and if user tries to get the file, the file should get corrupt...
     *
     * that's all...
     */
    const onDownloadButtonPressed = () => {}

    return (
        <View
            style={[
                layouts.row, // to get everything in row and center, to make the header at center parallel to other UI components
                layouts.justifyContentCenter, // center everything
                gutters.smallPaddingVertical, // a tiny padding on top and bottom
            ]}>
            <View
                style={[
                    layouts.row,
                    layouts.justifyContentBetween, // row but space between
                    layouts.alignItemsCenter, // centering vertically
                    gutters.tinyPaddingVertical, // an extra margin on top to make a distance from statusbar
                    {width: TRACK_ARTWORK_WIDTH}, // somewhat larger than track artwork's width
                ]}>
                <View style={[layouts.row]}>
                    {/* like current track button */}
                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={onLikeButtonPressed}
                        style={gutters.regularMarginRight} // since this is the first icon so right margin
                    >
                        <AntDesignIcon
                            name="hearto"
                            size={TINY_ICON_SIZE}
                            color={variables.colors.white}
                        />
                    </TouchableOpacity>

                    {/* share current track button */}
                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={onShareButtonPressed}
                        style={gutters.regularMarginHorizontal}>
                        <IoniconIcon
                            name="ios-share-social-outline"
                            size={TINY_ICON_SIZE}
                            color={variables.colors.white}
                        />
                    </TouchableOpacity>

                    {/* download track button */}
                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={onDownloadButtonPressed}
                        style={gutters.regularMarginHorizontal}>
                        <AntDesignIcon
                            name="download"
                            size={TINY_ICON_SIZE}
                            color={variables.colors.white}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[layouts.row]}>
                    {/* menu to update/change volume of track player */}
                    <TrackPlayerVolumeChangerMenu />

                    {/* show tracks queue button */}
                    <TouchableOpacity
                        activeOpacity={
                            DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                        }
                        onPress={onQueueButtonPressed}
                        style={gutters.largeMarginLeft} // last component so, left margin
                    >
                        <AntDesignIcon
                            name="menufold"
                            size={TINY_ICON_SIZE}
                            color={variables.colors.white}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
