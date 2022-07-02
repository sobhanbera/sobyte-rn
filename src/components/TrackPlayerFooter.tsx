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
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'

import {useTheme} from '@/hooks'
import {
    ANDROID_FILE_ACCESSOR,
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
    MUSIC_SHARE_SUBJECT,
    TINY_ICON_SIZE,
    TRACK_ARTWORK_WIDTH,
    TRACK_SHARE_ARTWORK_QUALITY,
    TRACK_SHARE_ARTWORK_SIZE,
} from '@/configs'
import {TrackPlayerVolumeChangerMenu} from './TrackPlayerVolumeChangerMenu'
import {SobyteState} from '@/state'
import {
    generateShareableMusicMessage,
    getShareableImagePath,
    updateArtworkQuality,
} from '@/utils'

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
    const onShareButtonPressed = async () => {
        if (currentTrack.musicId && currentTrack.playlistId) {
            // getting an image to share
            const shareableArtwork = updateArtworkQuality(
                currentTrack.artworks[0],
                TRACK_SHARE_ARTWORK_SIZE,
                TRACK_SHARE_ARTWORK_QUALITY,
            )

            // fetching the image which could be shared with a message
            RNFetchBlob.config({
                fileCache: true, // this is needed for saving the file
                overwrite: true, // if to overwrite the file if exists already...
                path: getShareableImagePath(''), // directory where to save...
            })
                .fetch('GET', shareableArtwork, {
                    'Content-Type': 'image/jpeg',
                })
                .then(async data => {
                    // successfully fetched the image, now generate a message to share
                    const message = generateShareableMusicMessage(currentTrack)
                    /**
                     * checking if the message is valid since the message also provides empty string on invalid musicID and playlistID
                     * i know we are checking for music id and playlist id before this also
                     * but to be in safe side, if we need to remove the above checks, this will be used
                     */
                    if (message) {
                        await Share.open({
                            subject: MUSIC_SHARE_SUBJECT,
                            message: message,
                            url: ANDROID_FILE_ACCESSOR + data.path(),
                        })
                            .then(_res => {
                                // shared process completed successfully...
                            })
                            .catch(_err => {
                                // not shared the message & image
                                // this could be the user who cancled the sharing process
                                // or anything else
                                // but no major error
                            })
                    }
                })
                .catch(_err => {
                    console.log('Cannot fetch the URI')
                })
        }
    }

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
