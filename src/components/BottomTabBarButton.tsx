/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - custom button to render on the bottom tab bar....
 */

import React from 'react'
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'

import {TouchableScalable} from '@/components'
import {useTheme} from '@/hooks'
import {TINY_ICON_SIZE} from '@/configs'

import {IconTypeOptions, SobyteIcon} from './SobyteIcon'

/**
 * @param props all the props related to the bottom tab bar button
 * @returns a button to render on the bottomtabbar
 */
export interface TabBarButtonProps extends BottomTabBarButtonProps {
    label: string

    activeIconName: string // the actual icon's name
    inactiveIconName: string

    ActiveIconComponentType: IconTypeOptions // type of icon to render, this could be Ionicons, MaterialIcons etc
    InactiveIconComponentType: IconTypeOptions
}
export function BottomTabBarButton(props: TabBarButtonProps) {
    const {
        ActiveIconComponentType,
        InactiveIconComponentType,

        activeIconName,
        inactiveIconName,

        accessibilityState,
        onPress,
        label,
    } = props
    const selected = accessibilityState?.selected

    const {layouts, fonts, gutters, variables} = useTheme()

    return (
        <LinearGradient
            colors={['#00000005', '#00000030', '#00000050', '#0000007F']}
            locations={[0, 0.33, 0.66, 1]}
            style={layouts.fill}>
            <TouchableScalable
                onPress={onPress}
                containerStyle={layouts.fill}
                buttonStyle={[layouts.center, layouts.fill]}>
                <Animatable.View
                    animation={'bounceIn'}
                    style={[layouts.center]}>
                    {selected ? (
                        <SobyteIcon
                            IconType={ActiveIconComponentType}
                            name={activeIconName}
                            color={variables.colors.white}
                            size={TINY_ICON_SIZE}
                        />
                    ) : (
                        <SobyteIcon
                            IconType={InactiveIconComponentType}
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
