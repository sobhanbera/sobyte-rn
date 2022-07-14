/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - data and objects related modals...
 */

import {ImageSourcePropType} from 'react-native'

/**
 * genre and mood data
 */
export interface GenreData {
    id: string | number
    title: string
    artwork: ImageSourcePropType
    color: string
    searchQuery: string
}
