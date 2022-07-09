/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - current queue screen....
 */

import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {NavigationHelpers} from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DraggableFlatList from 'react-native-draggable-flatlist'

import {useTheme} from '@/hooks'
import {
    changeTrackPositionInQueue,
    SobyteState,
    updateCurrentTrackIndex,
} from '@/state'
import {SobyteTextView, TrackPlayerQueueTrack} from '@/components'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
} from '@/configs'

interface TrackPlayerQueueScreenProps {
    navigation: NavigationHelpers<any>
}
export default function TrackPlayerQueueScreen({
    navigation,
}: TrackPlayerQueueScreenProps) {
    const {theme, gutters, fonts, layouts} = useTheme()

    // this data is needed to render the queue after the current track playing
    const {tracks, currentTrackIndex} = useSelector(
        (state: SobyteState) => state.playerdata,
    )
    const dispatch = useDispatch()

    /**
     * this method helps to change the index of track in the queue
     *
     * @param from a number where the user started moving track
     * @param to where the user ended moving the track
     */
    function onChangeTrackPositionInQueue(from: number, to: number) {
        /**
         * I am adding @from and @to before providing them to the @changeTrackPositionInQueue method because
         * when we are rendering the tracks in the queue, we are slicing them before rendering, which makes the
         * mapping to form a new indexing system
         * so we cannot get the exact index of the track which is moved
         *
         * but a solution for that could be to add @currentTrackIndex value to get the index (since we are rendering songs after currentTrackIndex only)
         * and finally we are adding 1 to it because the indexing starts from 0 and if 1 is not added then it could replace the currently playing song's index
         *
         * that's it
         */
        dispatch(
            changeTrackPositionInQueue({
                from: currentTrackIndex + from + 1,
                to: currentTrackIndex + to + 1,
            }),
        )
    }

    /**
     * this method will change/update the track based on the musicID
     * first we will itterate over all the tracks then find the track with exact music id and skip to it
     * and play it
     * @param musicID string denoting music ID
     */
    const onQueueTrackSelected = (musicID: string) => {
        // using the musicID we are finding at which index does the music exists
        // then play it finally.
        tracks.find((track, index) => {
            if (track.musicId === musicID) {
                // found the track to play, just change the index
                dispatch(
                    updateCurrentTrackIndex({
                        index: index,
                    }),
                )
                return true
            }
            return false
        })
    }

    return (
        <View style={[layouts.fill, gutters.statusBarHeightMarginTop]}>
            {/* header of the queue screen */}
            <View
                style={[
                    layouts.row,
                    layouts.alignItemsCenter,
                    gutters.tinyPaddingVertical,
                    gutters.smallPaddingHorizontal,
                    {
                        borderBottomWidth: 1,
                        borderBottomColor: theme.border,
                    },
                ]}>
                {/* header go back icon */}
                <TouchableOpacity
                    activeOpacity={
                        DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY
                    }
                    onPress={() => navigation.goBack()}
                    style={gutters.smallPadding}>
                    <MaterialIcons
                        name="keyboard-backspace"
                        color={theme.themecolorrevert}
                        size={DEFAULT_ICON_SIZE}
                    />
                </TouchableOpacity>

                {/* header title */}
                <SobyteTextView
                    style={[fonts.titleSmall, gutters.mediumPaddingHorizontal]}>
                    Queue
                </SobyteTextView>
            </View>

            <DraggableFlatList
                data={tracks.slice(currentTrackIndex + 1)}
                renderItem={({drag, item}) => {
                    return (
                        <TrackPlayerQueueTrack
                            key={item.musicId}
                            trackData={item}
                            onDrag={drag}
                            onQueueTrackSelected={() =>
                                onQueueTrackSelected(item.musicId)
                            }
                        />
                    )
                }}
                onDragEnd={({from, to}) =>
                    onChangeTrackPositionInQueue(from, to)
                }
                keyExtractor={track => track.musicId}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    gutters.hugePaddingBottom,
                    gutters.regularPaddingTop,
                ]}
            />
        </View>
    )
}
