/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - component for header with animation
 */

import React from 'react'
import {Animated, ImageBackground} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

import {
    ACTUAL_HEADER_HEIGHT,
    TOTAL_ANIMATED_HEADER_HEIGHT,
    DEVICE_STATUSBAR_HEIGHT,
    NEXT_TITLE_COLOR_ALPHA,
    ANIMATED_HEADER_EXTENDED_HEIGHT,
} from '@/configs'
import {useTheme} from '@/hooks'

import {SobyteAnimatedTextView} from './SobyteAnimatedTextView'
import {TouchableScalable} from './TouchableScalable'
import {SobyteIcon} from './SobyteIcon'

type HeaderAnimatedProps = {
    navigation: NavigationHelpers<any>
    scrollYOffset: Animated.Value

    headerTitle: string // the string title to show on the header
    headerBackgroundImage: string // the image to render on the header
    headerBackgroundColor: string // the header background primary color
}
export function HeaderAnimated({
    navigation,
    scrollYOffset,

    headerTitle,
    headerBackgroundImage,
    headerBackgroundColor,
}: HeaderAnimatedProps) {
    const {gutters, layouts, theme, fonts, variables} = useTheme()

    /**
     * animated interpolating value which controls the actual total height
     * of the full header, on scolling the header's height decreases and vice-versa
     *
     * and on vigrously scolling up the header scale up a bit due to extrapolating values
     */
    const headerHeight = scrollYOffset.interpolate({
        inputRange: [0, ANIMATED_HEADER_EXTENDED_HEIGHT], // animate only for the extended height
        outputRange: [TOTAL_ANIMATED_HEADER_HEIGHT, ACTUAL_HEADER_HEIGHT],
        extrapolateLeft: 'extend',
        extrapolateRight: 'clamp',
    })
    /**
     * this value controls the effect of background color as the scollview scrolls down
     */
    const headerBackground = scrollYOffset.interpolate({
        inputRange: [0, TOTAL_ANIMATED_HEADER_HEIGHT],
        outputRange: [headerBackgroundColor + '00', headerBackgroundColor],
        extrapolate: 'clamp',
    })

    /**
     * these two are the opacity and translateY values of the title of the header respectively
     * the title is not visible at first but after starting scrolling (after the header is at its minimum height)
     * this title will be animated as fade-from-down...
     *
     * and this animation input/output values are mapped such that those are properly synced with the actual large title
     * in other words as soon as the large title goes up due to scrolling, the opacity and the translateY increases its value
     */
    const headerTitleOpacity = scrollYOffset.interpolate({
        inputRange: [
            ANIMATED_HEADER_EXTENDED_HEIGHT + 20,
            ANIMATED_HEADER_EXTENDED_HEIGHT + 40,
        ],
        outputRange: [0, 1],
    })
    const headerTitleTranslateY = scrollYOffset.interpolate({
        inputRange: [
            ANIMATED_HEADER_EXTENDED_HEIGHT,
            ANIMATED_HEADER_EXTENDED_HEIGHT + 30,
        ],
        outputRange: [40, 0],
        extrapolate: 'clamp',
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                height: headerHeight,
            }}>
            <Animated.View
                style={[
                    {
                        width: '100%',
                        position: 'absolute',
                        zIndex: 3,
                        top: 0,

                        paddingTop: DEVICE_STATUSBAR_HEIGHT,
                        height: ACTUAL_HEADER_HEIGHT,
                        backgroundColor: headerBackground,
                    },
                    layouts.row,
                    layouts.alignItemsCenter,
                    gutters.smallPaddingHorizontal,
                ]}>
                <TouchableScalable
                    onPress={() => navigation.goBack()}
                    style={[
                        {
                            backgroundColor:
                                headerBackgroundColor + NEXT_TITLE_COLOR_ALPHA,
                            borderRadius: 50,
                        },
                        layouts.center,
                    ]}>
                    <SobyteIcon
                        IconType="SimpleLineIcons"
                        name="arrow-left"
                        size={variables.metrics.regular}
                        color={theme.themecolorrevert}
                        style={[
                            gutters.smallPadding,
                            {
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            },
                        ]}
                    />
                </TouchableScalable>

                <SobyteAnimatedTextView
                    style={[
                        fonts.textCenter,
                        fonts.titleTiny,
                        gutters.regularMarginHorizontal,
                        {
                            opacity: headerTitleOpacity,
                            transform: [
                                {
                                    translateY: headerTitleTranslateY,
                                },
                            ],
                        },
                    ]}>
                    {headerTitle}
                </SobyteAnimatedTextView>
            </Animated.View>

            <ImageBackground
                source={{
                    uri: headerBackgroundImage,
                    cache: 'default',
                }}
                style={[
                    {
                        height: '100%',
                        width: '100%',
                    },
                ]}
                imageStyle={{
                    backgroundColor: headerBackgroundColor,
                }}>
                <SobyteAnimatedTextView
                    style={[
                        fonts.titleExtraLarge,
                        fonts.textAllCenter,
                        gutters.mediumPaddingHorizontal, // to overcome long artist names
                        {
                            height: '100%',
                            width: '100%',
                            backgroundColor: theme.themecolor + '3F', // a small black colored bg, so that the title is visible even if the image is very bright
                        },
                    ]}>
                    {headerTitle}
                </SobyteAnimatedTextView>
            </ImageBackground>
        </Animated.View>
    )
}
