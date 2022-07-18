/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - navigation and screen related functions
 */

import {NavigationHelpers} from '@react-navigation/native'
import * as SCREEN_NAMES from '@/configs/screens' // getting name of all the screens later

import {
    MoreTrackDetailsScreenRouteParams,
    ArtistDetailsScreenRouteParams,
} from '@/containers/app'

/**
 * this method navigates the screen from one to other in this app
 * this method is global method
 * while all the below might be related to some specific screens only
 *
 * @param navigation the navigation object which is passed to every screen
 * @param screen name of the screen to navigate
 * @param params extra optional params for the next screen
 */
export function navigateToScreen(
    navigation: NavigationHelpers<any>,
    screen: keyof typeof SCREEN_NAMES,
    params: any,
) {
    navigation.navigate(screen, params)
}

/**
 * this method only navigates to the more tracks details screen,
 * NOTE: the screen should be in the same stack, inside where this method is being called
 *
 * @param navigation
 * @param params
 */
export function navigateToMoreTrackDetailsScreen(
    navigation: NavigationHelpers<any>,
    params: MoreTrackDetailsScreenRouteParams,
) {
    navigateToScreen(navigation, 'COMMON_MORE_TRACK_DETAILS_SCREEN', params)
}

/**
 * navigate to the artist's details screen
 * NOTE: the screen should be in the same stack, inside where this method is being called
 *
 * @param navigation
 * @param params
 */
export function navigateToArtistDetailsScreen(
    navigation: NavigationHelpers<any>,
    params: ArtistDetailsScreenRouteParams,
) {
    navigateToScreen(navigation, 'COMMON_ARTIST_DETAILS_SCREEN', params)
}
