/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - loading animation component
 */

import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import {View} from 'react-native'

import {useTheme} from '@/hooks'
import {DEFAULT_LOTTIE_LOGO_ANIMATION_HEIGHT} from '@/configs'

export function LoadingAnimation() {
    const {layouts, gutters, assets} = useTheme()

    return (
        <View style={[layouts.center, gutters.smallPadding]}>
            <AnimatedLottieView
                loop
                autoPlay
                source={assets.animations.dancing_logo}
                style={[
                    {
                        height: DEFAULT_LOTTIE_LOGO_ANIMATION_HEIGHT,
                        alignSelf: 'center',
                        position: 'relative',
                    },
                ]}
            />
        </View>
    )
}
