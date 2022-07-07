/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - exports related to bottom tab bars....
 */

import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import IoniconIcon from 'react-native-vector-icons/Ionicons'

import {ROOT_BOTTOM_BAR_TRACK_PLAYER_SCREEN_STACK} from '@/configs'
import {TrackPlayerStackNavigator} from '../Stacks'

const BottomBar = createBottomTabNavigator()
export function RootBottomBarNavigator() {
    return (
        <BottomBar.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: '#101010',
                tabBarInactiveBackgroundColor: '#101010',
            }}
            initialRouteName={ROOT_BOTTOM_BAR_TRACK_PLAYER_SCREEN_STACK}>
            <BottomBar.Screen
                name={ROOT_BOTTOM_BAR_TRACK_PLAYER_SCREEN_STACK}
                component={TrackPlayerStackNavigator}
                options={{
                    tabBarLabel: 'Player',
                    tabBarIcon: ({color, size}) => {
                        return (
                            <IoniconIcon
                                name="ios-musical-note"
                                size={size}
                                color={color}
                            />
                        )
                    },
                }}
            />
        </BottomBar.Navigator>
    )
}
