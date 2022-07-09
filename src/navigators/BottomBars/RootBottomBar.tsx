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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'

import {
    ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK,
    ROOT_BOTTOM_BAR_TRACK_PLAYER_SCREEN_STACK,
    ROOT_BOTTOM_BAR_EXPLORE_SCREEN_STACK,
    ROOT_BOTTOM_BAR_PROFILE_SCREEN_STACK,
    ROOT_BOTTOM_TAB_BAR_NAVIGATOR_ID,
    SOBYTE_PLAYER_QUEUE_SCREEN,
} from '@/configs'
import {useTheme} from '@/hooks'
import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {getCustomTabBarStyles, getDefaultTabBarStyles} from '@/utils'
import {BottomTabBarButton, BottomTabBarPlayerButton} from '@/components'

import {
    TrackPlayerStackNavigator,
    SearchStackNavigator,
    ExploreStackNavigator,
    UserProfileStackNavigator,
} from '../Stacks'

const BottomBar = createBottomTabNavigator()
export function RootBottomBarNavigator() {
    const {theme} = useTheme()

    return (
        <BottomBar.Navigator
            id={ROOT_BOTTOM_TAB_BAR_NAVIGATOR_ID}
            screenOptions={{
                headerShown: false,
                tabBarStyle: getDefaultTabBarStyles(),
                tabBarHideOnKeyboard: true,
                // show animation on hide and show operation of the bottom tab bar navigator
                tabBarVisibilityAnimationConfig: {
                    hide: {
                        animation: 'spring',
                        config: {},
                    },
                    show: {
                        animation: 'spring',
                        config: {},
                    },
                },
            }}
            backBehavior="history"
            initialRouteName={ROOT_BOTTOM_BAR_TRACK_PLAYER_SCREEN_STACK}>
            {/* music player screens */}
            <BottomBar.Screen
                name={ROOT_BOTTOM_BAR_TRACK_PLAYER_SCREEN_STACK}
                component={TrackPlayerStackNavigator}
                options={({route}) => ({
                    tabBarShowLabel: false,
                    tabBarLabel: 'Music',
                    tabBarButton: props => (
                        <BottomTabBarPlayerButton
                            {...props}
                            ActiveIconComponentType={MaterialIcons}
                            InactiveIconComponentType={MaterialIcons}
                            activeIconName="audiotrack"
                            inactiveIconName="audiotrack"
                            label="Music"
                        />
                    ),

                    tabBarStyle: (route => {
                        const routeName =
                            getFocusedRouteNameFromRoute(route) ?? ''

                        // if the screen is not the actual music player screen,
                        // then an another style to the bottom tab bar will be given
                        if (routeName === SOBYTE_PLAYER_QUEUE_SCREEN)
                            return getCustomTabBarStyles(theme.background)

                        return getDefaultTabBarStyles()
                    })(route),
                })}
            />
            {/* explore tabs */}
            <BottomBar.Screen
                name={ROOT_BOTTOM_BAR_EXPLORE_SCREEN_STACK}
                component={ExploreStackNavigator}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: 'Sobyte',
                    tabBarButton: props => (
                        <BottomTabBarButton
                            {...props}
                            ActiveIconComponentType={AntDesignIcons}
                            InactiveIconComponentType={AntDesignIcons}
                            activeIconName="appstore1"
                            inactiveIconName="appstore-o"
                            label="Explore"
                        />
                    ),
                }}
            />
            {/* search sceens */}
            <BottomBar.Screen
                name={ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK}
                component={SearchStackNavigator}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: 'Search',
                    tabBarButton: props => (
                        <BottomTabBarButton
                            {...props}
                            ActiveIconComponentType={IoniconIcon}
                            InactiveIconComponentType={IoniconIcon}
                            activeIconName="ios-search"
                            inactiveIconName="ios-search-outline"
                            label="Search"
                        />
                    ),
                }}
            />
            {/* search sceens */}
            <BottomBar.Screen
                name={ROOT_BOTTOM_BAR_PROFILE_SCREEN_STACK}
                component={UserProfileStackNavigator}
                options={{
                    tabBarShowLabel: false,
                    tabBarLabel: 'Profile',
                    tabBarButton: props => (
                        <BottomTabBarButton
                            {...props}
                            ActiveIconComponentType={IoniconIcon}
                            InactiveIconComponentType={IoniconIcon}
                            activeIconName="ios-person-sharp"
                            inactiveIconName="ios-person-outline"
                            label="You"
                        />
                    ),
                }}
            />
        </BottomBar.Navigator>
    )
}
