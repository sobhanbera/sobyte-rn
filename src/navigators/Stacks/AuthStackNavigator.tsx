/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - authentication screens navigator....
 */

import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {ForgotPass, Landing, OTPScreen, SignIn, SignUp} from '@/containers'
import {
    AUTH_FORGOT_SCREEN,
    AUTH_LANDING_SCREEN,
    AUTH_OTP_SCREEN,
    AUTH_SIGNIN_SCREEN,
    AUTH_SIGNUP_SCREEN,
} from '@/configs'
import {useTheme} from '@/hooks'

const AuthNavigationStack = createNativeStackNavigator()
export function AuthStackNavigator() {
    const {theme} = useTheme()

    return (
        <AuthNavigationStack.Navigator
            screenOptions={{
                headerShown: false,

                animation: 'fade',

                statusBarAnimation: 'slide',
                statusBarStyle: 'auto',

                orientation: 'portrait_up',

                contentStyle: {
                    backgroundColor: theme.background, // default bg color for all screens
                },
            }}>
            {/* this is the landing and the top most first screen */}
            <AuthNavigationStack.Screen
                name={AUTH_LANDING_SCREEN}
                component={Landing}
            />

            {/* register screen, create new account */}
            <AuthNavigationStack.Screen
                name={AUTH_SIGNUP_SCREEN}
                component={SignUp}
            />

            {/* login to existing user */}
            <AuthNavigationStack.Screen
                name={AUTH_SIGNIN_SCREEN}
                component={SignIn}
            />

            {/* forgot or reset password */}
            <AuthNavigationStack.Screen
                name={AUTH_FORGOT_SCREEN}
                component={ForgotPass}
            />

            {/* otp verification screen */}
            <AuthNavigationStack.Screen
                name={AUTH_OTP_SCREEN}
                component={OTPScreen}
            />
        </AuthNavigationStack.Navigator>
    )
}
