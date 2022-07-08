/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - a button wrapper that scales when hovered and
 */

import {DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY} from '@/configs'
import {useTheme} from '@/hooks'
import React, {useEffect} from 'react'
import {
    Animated,
    StyleProp,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native'

export interface TouchableScalableProps extends TouchableOpacityProps {
    buttonStyle?: StyleProp<any> // custom button styles
    children?: React.ReactNode // the actual children to render as a button
    containerStyle?: StyleProp<ViewStyle> // main outer container's style
    scale?: number // the value to scale
    autoAnimate?: boolean
}
export function TouchableScalable(props: TouchableScalableProps) {
    const {layouts} = useTheme()

    const animation = React.useRef(new Animated.Value(0)).current
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, props.scale ?? 0.95],
    })

    /**
     * when the user starts the press, this means hover
     */
    const onHovered = () => {
        if (!props.autoAnimate) {
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
            }).start()
        }
    }
    /**
     * when the user ended the press
     * or in other words the onPress is called
     */
    const onPressCompleted = () => {
        if (!props.autoAnimate) {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
                mass: 2,
            }).start()
        }
    }

    /**
     * this method and the below method are responsible to make a scale animation
     * which updates the value of scale animated value
     */
    const autoAnimateContinue = () => {
        if (props.autoAnimate) {
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
                delay: 0,
            }).start(autoAnimate)
        }
    }

    const autoAnimate = () => {
        if (props.autoAnimate) {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
                delay: 0,
            }).start(autoAnimateContinue)
        }
    }

    /**
     * at the first render this component auto animates this component itself
     * if auto animate prop is true
     */
    useEffect(() => {
        if (props.autoAnimate) {
            autoAnimate()
        }
    }, [])

    return (
        <Animated.View
            style={[
                layouts.hiddenOverflow, // so that the button don't overflow
                props.containerStyle,
                {transform: [{scale}]}, // the animated value
            ]}>
            <TouchableOpacity
                style={props.buttonStyle}
                activeOpacity={DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY}
                onPressIn={onHovered}
                onPressOut={onPressCompleted}
                {...props}>
                {props.children}
            </TouchableOpacity>
        </Animated.View>
    )
}
