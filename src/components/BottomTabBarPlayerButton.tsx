/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - custom button for just the player stack navigation button in the bottom tab bar navigator....
 */

import React, {useEffect, useState} from 'react'
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs'
import * as Animatable from 'react-native-animatable'
import {IconProps} from 'react-native-vector-icons/Icon'
import LinearGradient from 'react-native-linear-gradient'
import TrackPlayer, {Event, State} from 'react-native-track-player'
import LottieView from 'lottie-react-native'

import {TouchableScalable} from '@/components'
import {useTheme} from '@/hooks'
import {TINY_ICON_SIZE} from '@/configs'

/**
 * @param props all the props related to the bottom tab bar button
 * @returns a button to render on the bottomtabbar
 */
export interface BottomTabBarPlayerButtonProps extends BottomTabBarButtonProps {
    label: string
    activeIconName: string // the actual icon's name
    inactiveIconName: string
    ActiveIconComponentType: React.ComponentClass<IconProps> // type of icon to render, this could be Ionicons, MaterialIcons etc
    InactiveIconComponentType: React.ComponentClass<IconProps>
}
export function BottomTabBarPlayerButton({
    ActiveIconComponentType,
    InactiveIconComponentType,

    activeIconName,
    inactiveIconName,
    accessibilityState,
    onPress,
    label,
}: BottomTabBarPlayerButtonProps) {
    const selected = accessibilityState?.selected

    const {layouts, fonts, gutters, variables, assets} = useTheme()

    /**
     * state to get the data of playing status of the track like, play/pause/buffering etc...
     */
    const [anyTrackIsPlaying, setIsPlaying] = useState<boolean>(false)

    // this events are to show the playing animation in the bottom tab bar
    useEffect(() => {
        const stateChangeEvent = TrackPlayer.addEventListener(
            Event.PlaybackState,
            (stateData: {state: number}) => {
                /**
                 * or we can do an alternative in this way
                 * we are enabling play when buffering or else actually playing,
                 * else we are saying its been paused...
                 *
                 * this same as the TrackConrols.tsx components
                 */
                if (
                    stateData.state === State.Buffering ||
                    stateData.state === State.Playing
                ) {
                    setIsPlaying(true)
                } else {
                    setIsPlaying(false)
                }
            },
        )

        return () => {
            stateChangeEvent.remove()
        }
    }, [])

    return (
        <LinearGradient
            colors={['#00000000', '#00000050']}
            locations={[0, 1]}
            style={layouts.fill}>
            <TouchableScalable
                onPress={onPress}
                containerStyle={layouts.fill}
                buttonStyle={[layouts.center, layouts.fill]}>
                <Animatable.View
                    animation={'bounceIn'}
                    style={[layouts.center]}>
                    {/**
                     * if showAnimatedIcon is true with a icon's location
                     * then render a lottie animation view
                     *
                     * if any track is being playing in the app and the player tab is selected
                     * then render the white animated logo
                     *
                     * now if any track is not being played then render a simple icon as the tab bar button
                     * white simple icon for selected and grey icon when not selected the player's tab
                     */}
                    {anyTrackIsPlaying ? (
                        <LottieView
                            source={assets.animations.rythm}
                            loop
                            autoPlay
                            style={{
                                height: TINY_ICON_SIZE,
                            }}
                            // changing all the keypath's color when the tab is being changed
                            colorFilters={[
                                {
                                    color: selected
                                        ? variables.colors.white
                                        : '#A0A0A0',
                                    keypath: 'bar1',
                                },
                                {
                                    color: selected
                                        ? variables.colors.white
                                        : '#A0A0A0',
                                    keypath: 'bar2',
                                },
                                {
                                    color: selected
                                        ? variables.colors.white
                                        : '#A0A0A0',
                                    keypath: 'bar3',
                                },
                                {
                                    color: selected
                                        ? variables.colors.white
                                        : '#A0A0A0',
                                    keypath: 'bar4',
                                },
                            ]}
                        />
                    ) : selected ? (
                        // else render the simple icon on selected
                        <ActiveIconComponentType
                            name={activeIconName}
                            color={variables.colors.white}
                            size={TINY_ICON_SIZE}
                        />
                    ) : (
                        // else render a inactive icon type
                        <InactiveIconComponentType
                            name={inactiveIconName}
                            color={variables.colors.white + 'A0'}
                            size={TINY_ICON_SIZE}
                        />
                    )}

                    <Animatable.Text
                        animation="pulse"
                        useNativeDriver={true}
                        style={[
                            fonts.regularFont,
                            fonts.textTiny,
                            gutters.tinyPaddingTop,
                            {
                                color: selected
                                    ? variables.colors.white
                                    : variables.colors.white + 'A0',
                            },
                        ]}>
                        {label}
                    </Animatable.Text>
                </Animatable.View>
            </TouchableScalable>
        </LinearGradient>
    )
}
