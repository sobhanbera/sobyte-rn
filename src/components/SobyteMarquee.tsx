/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - app specific marquee text view component with custom style
 */

import React from 'react'
import Marquee, {TextTickerProps} from 'react-native-text-ticker'

import {
    CircularRegular,
    MARQUEE_BOUNCE_DELAY,
    MARQUEE_DELAY,
    MARQUEE_REPEAT_SPACER,
    MARQUEE_SCROLL_SPEED,
} from '@/configs'
import {useTheme} from '@/hooks'

export interface SobyteMarqueeProps extends TextTickerProps {
    children: React.ReactChild
}
const SobyteMarquee = (props: SobyteMarqueeProps) => {
    const {theme} = useTheme()

    return (
        <Marquee
            loop
            useNativeDriver
            scroll={false}
            bounce={false} // with bounce it is very awkward..
            scrollSpeed={MARQUEE_SCROLL_SPEED}
            repeatSpacer={MARQUEE_REPEAT_SPACER}
            marqueeDelay={MARQUEE_DELAY}
            bounceDelay={MARQUEE_BOUNCE_DELAY}
            animationType="auto"
            {...props}
            style={[
                {
                    fontFamily: CircularRegular,
                    color: theme.themecolorrevert,
                },
                props.style, // this style should be at last, so that our styles could be overwritten by parent component
            ]}>
            {props.children}
        </Marquee>
    )
}

export {SobyteMarquee}
