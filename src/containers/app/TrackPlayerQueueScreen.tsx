/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - current queue screen....
 */

import React, {useLayoutEffect} from 'react'
import {ScrollView, TouchableOpacity, View} from 'react-native'
import {useSelector} from 'react-redux'
import {CompositeScreenProps} from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {useTheme} from '@/hooks'
import {SobyteState} from '@/state'
import {
    BottomPaddingComponent,
    SobyteTextView,
    TrackPlayerQueueTrack,
} from '@/components'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY,
} from '@/configs'

interface TrackPlayerQueueScreenProps extends CompositeScreenProps<any, any> {
    route: {
        params: {
            onChangedTrackFromQueue(trackIndex: string): void
        }
    }
}
export default function TrackPlayerQueueScreen({
    route,
    navigation,
}: TrackPlayerQueueScreenProps) {
    const {theme, gutters, fonts, layouts} = useTheme()
    const {onChangedTrackFromQueue} = route.params

    // this data is needed to render the queue after the current track playing
    const {tracks, currentTrackIndex, currentTrack} = useSelector(
        (state: SobyteState) => state.playerdata,
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            onChangedTrackFromQueue: (_trackIndex: number) => {},
        })
    }, [navigation])

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

            <ScrollView showsVerticalScrollIndicator={false}>
                <SobyteTextView
                    style={[
                        fonts.textRegular,
                        gutters.mediumPaddingHorizontal,
                        gutters.regularPaddingTop,
                        gutters.smallPaddingBottom,
                    ]}>
                    Currently Playing...
                </SobyteTextView>

                {/* this component could return error in future, be safe */}
                <TrackPlayerQueueTrack
                    trackData={currentTrack}
                    onChangedTrackFromQueue={() => {}}
                />

                {/* next queue */}
                <SobyteTextView
                    style={[
                        fonts.textRegular,
                        gutters.mediumPaddingHorizontal,
                        gutters.regularPaddingTop,
                        gutters.smallPaddingBottom,
                        gutters.mediumMarginTop,
                    ]}>
                    Next Up -
                </SobyteTextView>

                {tracks.slice(currentTrackIndex + 1).map(trackData => {
                    return (
                        <TrackPlayerQueueTrack
                            key={trackData.musicId}
                            trackData={trackData}
                            onChangedTrackFromQueue={() =>
                                onChangedTrackFromQueue(trackData.musicId)
                            }
                        />
                    )
                })}

                <BottomPaddingComponent />
            </ScrollView>
        </View>
    )
}
