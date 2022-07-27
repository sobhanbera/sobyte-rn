/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - screen where the user can explore different tracks/artists/playlists/albums etc....
 */

import React from 'react'
import {ScrollView, View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

import {
    HeaderExploreScreen,
    BottomPaddingComponent,
    ExploreScreenDefaultDataRenderer,
} from '@/components'
import {useTheme} from '@/hooks'
import {ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK} from '@/configs'

export interface ExploreScreenProps {
    navigation: NavigationHelpers<any>
}
export function ExploreScreen({navigation}: ExploreScreenProps) {
    const {colorscheme, variables} = useTheme()

    /**
     * this function will launch search songs/tracks, artists tab
     */
    function changeNavigationToSearchTab() {
        /**
         * getting the parent navigator which is the bottom tab bar
         * and then navigating to the search stack navigator
         */
        navigation.getParent()?.navigate(ROOT_BOTTOM_BAR_SEARCH_SCREEN_STACK)
    }

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled>
                <LinearGradient
                    colors={[
                        ...colorscheme.slice(5),
                        variables.colors.black,
                        variables.colors.black,
                        variables.colors.black,
                        ...colorscheme.slice(5),
                        variables.colors.black,
                        variables.colors.black,
                        variables.colors.black,
                    ]}
                    useAngle
                    angle={180}>
                    <HeaderExploreScreen
                        onPressSearch={changeNavigationToSearchTab}
                    />

                    {/* entry point to all the explore screen renders */}
                    <ExploreScreenDefaultDataRenderer />

                    <BottomPaddingComponent padding={65} />
                </LinearGradient>
            </ScrollView>
        </View>
    )
}
